import { ArrowRight, CheckCircle, HandHeart } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useCartStore } from "../stores/useCartStore";
import axios from "../lib/axios";

const PurchaseSuccessPage = () => {
	const [isProcessing, setIsProcessing] = useState(true);
	const { clearCart } = useCartStore();
	const [error, setError] = useState(null);

	useEffect(() => {
		const handleCheckoutSuccess = async (sessionId) => {
			try {
				await axios.post("/payments/checkout-success", {
					sessionId,
				});
				clearCart();
			} catch (error) {
				console.log(error);
			} finally {
				setIsProcessing(false);
			}
		};

		const sessionId = new URLSearchParams(window.location.search).get("session_id");
		if (sessionId) {
			handleCheckoutSuccess(sessionId);
		} else {
			setIsProcessing(false);
			setError("No session ID found in the URL");
		}
	}, [clearCart]);

	if (isProcessing) return <div className='flex min-h-screen items-center justify-center bg-[#ebe2e3] text-[#465b52]'>Processing...</div>;

	if (error) return <div className='flex min-h-screen items-center justify-center bg-[#ebe2e3] text-[#465b52]'>Error: {error}</div>;

	return (
		<div className='min-h-screen flex items-center justify-center bg-[#ebe2e3] px-4 py-24'>

			<div className='max-w-md w-full border border-[#d8d0d1] bg-white shadow-sm overflow-hidden relative z-10 sm:rounded-md'>
				<div className='p-6 sm:p-8'>
					<div className='flex justify-center'>
						<CheckCircle className='text-[#088178] w-16 h-16 mb-4' />
					</div>
					<h1 className='text-2xl sm:text-3xl font-bold text-center text-[#222] mb-2'>
						Purchase Successful!
					</h1>

					<p className='text-[#465b52] text-center mb-2'>
						Thank you for your order. {"We're"} processing it now.
					</p>
					<p className='text-[#088178] text-center text-sm mb-6'>
						Check your email for order details and updates.
					</p>
					<div className='bg-[#ebe2e3] rounded-md p-4 mb-6'>
						<div className='flex items-center justify-between mb-2'>
							<span className='text-sm text-[#465b52]'>Order number</span>
							<span className='text-sm font-semibold text-[#088178]'>#12345</span>
						</div>
						<div className='flex items-center justify-between'>
							<span className='text-sm text-[#465b52]'>Estimated delivery</span>
							<span className='text-sm font-semibold text-[#088178]'>3-5 business days</span>
						</div>
					</div>

					<div className='space-y-4'>
						<button
							className='w-full bg-[#088178] hover:bg-[#066c65] text-white font-bold py-2 px-4 rounded-md transition duration-300 flex items-center justify-center'
						>
							<HandHeart className='mr-2' size={18} />
							Thanks for trusting us!
						</button>
						<Link
							to={"/"}
							className='w-full border border-[#088178] bg-white hover:bg-[#088178] text-[#088178] hover:text-white font-bold py-2 px-4 rounded-md transition duration-300 flex items-center justify-center'
						>
							Continue Shopping
							<ArrowRight className='ml-2' size={18} />
						</Link>
					</div>
				</div>
			</div>
		</div>
	);
};
export default PurchaseSuccessPage;
