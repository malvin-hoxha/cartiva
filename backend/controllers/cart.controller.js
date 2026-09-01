import mongoose from "mongoose";
import Product from "../models/product.model.js";
import User from "../models/user.model.js";

const isSameProduct = (cartProduct, productId) => cartProduct?.toString() === productId;

export const getCartProducts = async (req, res) => {
    try {
        const user = await User.findById(req.user._id).populate("cartItems.product");

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const cartItems = user.cartItems.filter((item) => item.product)
            .map((item) => ({
                ...item.product.toJSON(),
                quantity: item.quantity,
            }));

        res.json(cartItems);
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
}

export const addToCart = async (req, res) => {
    try {
        const { productId } = req.body;

        if (!mongoose.isValidObjectId(productId)) {
            return res.status(400).json({ message: "Invalid product id" });
        }

        const [product, user] = await Promise.all([
            Product.findById(productId),
            User.findById(req.user._id),
        ]);

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }

        const existingItem = user.cartItems.find((item) => isSameProduct(item.product, productId));

        if (existingItem) {
            existingItem.quantity++;
        } else {
            user.cartItems.push({ product: productId, quantity: 1 });
        }

        await user.save();
        res.json(user.cartItems); 
    } catch (error) {
        console.log("Error in addToCart controller", error.message);
        res.status(500).json({ message: "Server error", error: error.message });
    }
}

export const removeAllFromCart = async (req, res) => {
    try {
        const {productId} = req.body;
        const user = await User.findById(req.user._id);

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        if(!productId) {
            user.cartItems = [];
        } else {
            if (!mongoose.isValidObjectId(productId)) {
                return res.status(400).json({ message: "Invalid product id" });
            }

            user.cartItems = user.cartItems.filter(
                (item) => !isSameProduct(item.product, productId)
            );
        }

        await user.save();
        res.json(user.cartItems);
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
}

export const updateQuantity = async (req, res) => {
    try {
        const {id:productId} = req.params;
        const {quantity} = req.body;

        if (!mongoose.isValidObjectId(productId)) {
            return res.status(400).json({ message: "Invalid product id" });
        }

        if (!Number.isInteger(quantity) || quantity < 0) {
            return res.status(400).json({ message: "Invalid quantity" });
        }

        const user = await User.findById(req.user._id);

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const existingItem = user.cartItems.find((item) => isSameProduct(item.product, productId));

        if(existingItem) {
            if (quantity === 0) {
                user.cartItems = user.cartItems.filter(
                    (item) => !isSameProduct(item.product, productId)
                );
                await user.save();
                return res.json(user.cartItems);
            }

            existingItem.quantity = quantity;
			await user.save();
			res.json(user.cartItems);

		} else {
			res.status(404).json({ message: "Product not found" });
		}
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
}
