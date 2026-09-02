import { Minus, Plus, Trash } from "lucide-react";
import { useCartStore } from "../stores/useCartStore";

const CartItem = ({ item }) => {
	const { removeFromCart, updateQuantity } = useCartStore();

	return (
		<div className='rounded-md border border-[#d8d0d1] bg-white p-4 shadow-sm md:p-6'>
			<div className='space-y-4 md:flex md:items-center md:justify-between md:gap-6 md:space-y-0'>
				<div className='shrink-0 md:order-1'>
					<img className='h-20 w-20 rounded-md object-cover md:h-32 md:w-32' src={item.image} />
				</div>
				<label className='sr-only'>Choose quantity:</label>

				<div className='flex items-center justify-between md:order-3 md:justify-end'>
					<div className='flex items-center gap-2'>
						<button
							className='inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-md border border-[#d8d0d1] bg-[#ebe2e3] text-[#1a1a1a] hover:border-[#088178] hover:text-[#088178] focus:outline-none focus:ring-2 focus:ring-[#088178]'
							onClick={() => updateQuantity(item._id, item.quantity - 1)}
						>
							<Minus className='h-4 w-4' />
						</button>
						<p className='min-w-6 text-center font-medium text-[#222]'>{item.quantity}</p>
						<button
							className='inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-md border border-[#d8d0d1] bg-[#ebe2e3] text-[#1a1a1a] hover:border-[#088178] hover:text-[#088178] focus:outline-none focus:ring-2 focus:ring-[#088178]'
							onClick={() => updateQuantity(item._id, item.quantity + 1)}
						>
							<Plus className='h-4 w-4' />
						</button>
					</div>

					<div className='text-end md:order-4 md:w-32'>
						<p className='text-base font-bold text-[#088178]'>${item.price}</p>
					</div>
				</div>

				<div className='w-full min-w-0 flex-1 space-y-4 md:order-2 md:max-w-md'>
					<p className='text-base font-semibold text-[#222] hover:text-[#088178] hover:underline'>
						{item.name}
					</p>
					<p className='text-sm text-[#465b52]'>{item.description}</p>

					<div className='flex items-center gap-4'>
						<button
							className='inline-flex items-center text-sm font-medium text-red-600 hover:text-red-700'
							onClick={() => removeFromCart(item._id)}
						>
							<Trash className='h-5 w-5' />
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};
export default CartItem;
