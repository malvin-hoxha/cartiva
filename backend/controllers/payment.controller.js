import mongoose from "mongoose";
import Coupon from "../models/coupon.model.js";
import Order from "../models/order.model.js";
import Product from "../models/product.model.js";
import { stripe } from "../lib/stripe.js";

export const createCheckoutSession = async (req, res) => {
    try {
        const {products, couponCode} = req.body;

        if (!Array.isArray(products) || products.length === 0) {
			return res.status(400).json({ error: "Invalid or empty products array" });
		}

        const requestedProducts = products.map((product) => {
            if (!product || typeof product !== "object") {
                return { productId: null, quantity: null };
            }

            const productId = product.productId || product.id || product._id;
            const quantity = product.quantity ?? 1;

            return { productId, quantity };
        });

        if (
            requestedProducts.some(
                ({ productId, quantity }) =>
                    !mongoose.isValidObjectId(productId) || !Number.isInteger(quantity) || quantity < 1
            )
        ) {
            return res.status(400).json({ error: "Invalid product id or quantity" });
        }

        const productIds = requestedProducts.map(({ productId }) => productId.toString());
        const uniqueProductIds = [...new Set(productIds)];
        const dbProducts = await Product.find({ _id: { $in: uniqueProductIds } });
        const dbProductsById = new Map(dbProducts.map((product) => [product._id.toString(), product]));

        if (dbProducts.length !== uniqueProductIds.length) {
            return res.status(404).json({ message: "One or more products not found" });
        }

        let totalAmount = 0;
        const trustedProducts = requestedProducts.map(({ productId, quantity }) => {
            const product = dbProductsById.get(productId.toString());
            const amount = Math.round(product.price * 100); // stripe needs format of cents
            totalAmount += amount * quantity;

            return {
                id: product._id.toString(),
                name: product.name,
                image: product.image,
                quantity,
                price: product.price,
                amount,
            };
        });

        const lineItems = trustedProducts.map((product) => ({
            price_data: {
                currency: "usd",
                product_data: {
                    name: product.name,
                    images: [product.image]
                },
                unit_amount: product.amount
            },
            quantity: product.quantity
        }));

        let coupon = null;
		if (couponCode) {
			coupon = await Coupon.findOne({ code: couponCode, userId: req.user._id, isActive: true });
			if (coupon) {
                if (coupon.expirationDate < new Date()) {
                    coupon.isActive = false;
                    await coupon.save();
                    return res.status(404).json({ message: "Coupon expired" });
                }

				totalAmount -= Math.round((totalAmount * coupon.discountPercentage) / 100);
			}
        }

        const session = await stripe.checkout.sessions.create({
            payment_method_types: ["card"],
			line_items: lineItems,
            mode: "payment",
			success_url: `${process.env.CLIENT_URL}/purchase-success?session_id={CHECKOUT_SESSION_ID}`,
			cancel_url: `${process.env.CLIENT_URL}/purchase-cancel`,
			discounts: coupon ? [{
				coupon: await createStripeCoupon(coupon.discountPercentage),
			},]	: [],
            metadata: {
				userId: req.user._id.toString(),
				couponCode: coupon?.code || "",
				products: JSON.stringify(
					trustedProducts.map((p) => ({
						id: p.id,
						quantity: p.quantity,
						price: p.price,
					}))
				),
            },
        });

		res.status(200).json({ id: session.id, url: session.url, totalAmount: totalAmount / 100 });
        
    } catch (error) {
        console.error("Error processing checkout:", error);
		res.status(500).json({ message: "Error processing checkout", error: error.message });
    }
}

export const checkoutSuccess = async (req, res) => {
    try {
        const { sessionId } = req.body;
		const session = await stripe.checkout.sessions.retrieve(sessionId);

        if (session.payment_status !== "paid") {
            return res.status(400).json({
                success: false,
                message: "Payment has not been completed.",
            });
        }

        const existingOrder = await Order.findOne({ stripeSessionId: sessionId });

        if (existingOrder) {
            return res.status(200).json({
                success: true,
                message: "Payment already processed.",
                orderId: existingOrder._id,
            });
        }

        // create a new Order
		const products = JSON.parse(session.metadata.products);
		const newOrder = new Order({
			user: session.metadata.userId,
			products: products.map((product) => ({
				product: product.id,
				quantity: product.quantity,
				price: product.price,
			})),
			totalAmount: session.amount_total / 100, // convert from cents to dollars,
			stripeSessionId: sessionId,
		});

        try {
            await newOrder.save();
        } catch (error) {
            if (error.code === 11000) {
                const processedOrder = await Order.findOne({ stripeSessionId: sessionId });

                return res.status(200).json({
                    success: true,
                    message: "Payment already processed.",
                    orderId: processedOrder._id,
                });
            }

            throw error;
        }

        if (session.metadata.couponCode) {
			await Coupon.findOneAndUpdate(
				{
					code: session.metadata.couponCode,
					userId: session.metadata.userId,
				},
				{
					isActive: false,
				}
			);
		}

        if (session.amount_total >= 20000) {
            await createNewCoupon(session.metadata.userId);
        }

		res.status(200).json({
			success: true,
			message: "Payment successful, order created, coupon deactivated if used, and reward coupon created if eligible.",
			orderId: newOrder._id,
		});

    } catch (error) {
        console.error("Error processing successful checkout:", error);
		res.status(500).json({ message: "Error processing successful checkout", error: error.message });
    }
}

async function createStripeCoupon(discountPercentage) {
	const coupon = await stripe.coupons.create({
		percent_off: discountPercentage,
		duration: "once",
	});

	return coupon.id;
}

async function createNewCoupon(userId) {
	await Coupon.findOneAndDelete({ userId });

	const newCoupon = new Coupon({
		code: "GIFT" + Math.random().toString(36).substring(2, 8).toUpperCase(),
		discountPercentage: 10,
		expirationDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days from now
		userId: userId,
	});

	await newCoupon.save();

	return newCoupon;
}
