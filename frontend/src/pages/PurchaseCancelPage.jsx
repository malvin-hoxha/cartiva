import { XCircle, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

const PurchaseCancelPage = () => {
	return (
		<div className='min-h-screen flex items-center justify-center bg-[#ebe2e3] px-4 py-24'>
			<div className='max-w-md w-full border border-[#d8d0d1] bg-white shadow-sm overflow-hidden relative z-10 sm:rounded-md'
			>
				<div className='p-6 sm:p-8'>
					<div className='flex justify-center'>
						<XCircle className='text-red-500 w-16 h-16 mb-4' />
					</div>
					<h1 className='text-2xl sm:text-3xl font-bold text-center text-[#222] mb-2'>Purchase Cancelled</h1>
					<p className='text-[#465b52] text-center mb-6'>
						Your order has been cancelled. No charges have been made.
					</p>
					<div className='bg-[#ebe2e3] rounded-md p-4 mb-6'>
						<p className='text-sm text-[#465b52] text-center'>
							If you encountered any issues during the checkout process, please don&apos;t hesitate to
							contact our support team.
						</p>
					</div>
					<div className='space-y-4'>
						<Link
							to={"/"}
							className='w-full border border-[#088178] bg-white hover:bg-[#088178] text-[#088178] hover:text-white font-bold py-2 px-4 rounded-md transition duration-300 flex items-center justify-center'
						>
							<ArrowLeft className='mr-2' size={18} />
							Return to Shop
						</Link>
					</div>
				</div>
			</div>
		</div>
	);
};

export default PurchaseCancelPage;
