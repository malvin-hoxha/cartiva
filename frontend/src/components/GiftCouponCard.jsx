import { useEffect, useState } from "react";
import { useCartStore } from "../stores/useCartStore";

const GiftCouponCard = () => {
	const [userInputCode, setUserInputCode] = useState("");
	const { coupon, isCouponApplied, applyCoupon, getMyCoupon, removeCoupon } = useCartStore();

	useEffect(() => {
		getMyCoupon();
	}, [getMyCoupon]);

	useEffect(() => {
		if (coupon) setUserInputCode(coupon.code);
	}, [coupon]);

	const handleApplyCoupon = () => {
		if (!userInputCode) return;
		applyCoupon(userInputCode);
	};

	const handleRemoveCoupon = async () => {
		await removeCoupon();
		setUserInputCode("");
	};

	return (
		<div
			className='space-y-4 rounded-md border border-[#d8d0d1] bg-white p-4 shadow-sm sm:p-6'
		>
			<div className='space-y-4'>
				<div>
					<label htmlFor='voucher' className='mb-2 block text-sm font-medium text-[#222]'>
						Do you have a voucher or gift card?
					</label>
					<input
						type='text'
						id='voucher'
						className='block w-full rounded-md border border-[#d8d0d1] bg-white p-2.5 text-sm text-[#1a1a1a] placeholder-gray-400 focus:border-[#088178] focus:ring-[#088178]'
						placeholder='Enter code here'
						value={userInputCode}
						onChange={(e) => setUserInputCode(e.target.value)}
						required
					/>
				</div>

				<button
					type='button'
					className='flex w-full items-center justify-center rounded-md bg-[#088178] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[#066c65] focus:outline-none focus:ring-2 focus:ring-[#088178]'
					onClick={handleApplyCoupon}
				>
					Apply Code
				</button>
			</div>
			{isCouponApplied && coupon && (
				<div className='mt-4'>
					<h3 className='text-lg font-medium text-[#222]'>Applied Coupon</h3>

					<p className='mt-2 text-sm text-[#465b52]'>
						{coupon.code} - {coupon.discountPercentage}% off
					</p>

					<button
						type='button'
						className='mt-2 flex w-full items-center justify-center rounded-md border border-red-600 bg-white px-5 py-2.5 text-sm font-semibold text-red-600 hover:bg-red-600 hover:text-white focus:outline-none focus:ring-2 focus:ring-red-300'
						onClick={handleRemoveCoupon}
					>
						Remove Coupon
					</button>
				</div>
			)}

			{coupon && (
				<div className='mt-4'>
					<h3 className='text-lg font-medium text-[#222]'>Your Available Coupon:</h3>
					<p className='mt-2 text-sm text-[#465b52]'>
						{coupon.code} - {coupon.discountPercentage}% off
					</p>
				</div>
			)}
		</div>
	);
};
export default GiftCouponCard;
