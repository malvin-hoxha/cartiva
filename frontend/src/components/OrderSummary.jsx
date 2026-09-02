import { useCartStore } from "../stores/useCartStore";
import { Link } from "react-router-dom";
import { MoveRight } from "lucide-react";
import axios from "../lib/axios";

const OrderSummary = () => {
	const { total, subtotal, coupon, isCouponApplied, cart } = useCartStore();

	const savings = subtotal - total;
	const formattedSubtotal = subtotal.toFixed(2);
	const formattedTotal = total.toFixed(2);
	const formattedSavings = savings.toFixed(2);

	const handlePayment = async () => {
		const res = await axios.post("/payments/create-checkout-session", {
			products: cart,
			couponCode: coupon ? coupon.code : null,
		});

		const session = res.data;
		if (session.url) {
			window.location.href = session.url;
		}
	};

	return (
		<div
			className='space-y-4 rounded-md border border-[#d8d0d1] bg-white p-4 shadow-sm sm:p-6'
		>
			<p className='text-xl font-semibold text-[#222]'>Order summary</p>

			<div className='space-y-4'>
				<div className='space-y-2'>
					<dl className='flex items-center justify-between gap-4'>
						<dt className='text-base font-normal text-[#465b52]'>Original price</dt>
						<dd className='text-base font-medium text-[#222]'>${formattedSubtotal}</dd>
					</dl>

					{savings > 0 && (
						<dl className='flex items-center justify-between gap-4'>
							<dt className='text-base font-normal text-[#465b52]'>Savings</dt>
							<dd className='text-base font-medium text-[#088178]'>-${formattedSavings}</dd>
						</dl>
					)}

					{coupon && isCouponApplied && (
						<dl className='flex items-center justify-between gap-4'>
							<dt className='text-base font-normal text-[#465b52]'>Coupon ({coupon.code})</dt>
							<dd className='text-base font-medium text-[#088178]'>-{coupon.discountPercentage}%</dd>
						</dl>
					)}
					<dl className='flex items-center justify-between gap-4 border-t border-[#d8d0d1] pt-2'>
						<dt className='text-base font-bold text-[#222]'>Total</dt>
						<dd className='text-base font-bold text-[#088178]'>${formattedTotal}</dd>
					</dl>
				</div>

				<button
					className='flex w-full items-center justify-center rounded-md bg-[#088178] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[#066c65] focus:outline-none focus:ring-2 focus:ring-[#088178]'
					onClick={handlePayment}
				>
					Proceed to Checkout
				</button>

				<div className='flex items-center justify-center gap-2'>
					<span className='text-sm font-normal text-[#465b52]'>or</span>
					<Link
						to='/'
						className='inline-flex items-center gap-2 text-sm font-medium text-[#088178] underline hover:text-[#066c65] hover:no-underline'
					>
						Continue Shopping
						<MoveRight size={16} />
					</Link>
				</div>
			</div>
		</div>
	);
};
export default OrderSummary;
