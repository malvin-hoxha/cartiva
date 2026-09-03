import { Link } from "react-router-dom";
import { useCartStore } from "../stores/useCartStore";
import { ShoppingCart } from "lucide-react";
import CartItem from "../components/CartItem";
import PeopleAlsoBought from "../components/PeopleAlsoBought";
import OrderSummary from "../components/OrderSummary";
import GiftCouponCard from "../components/GiftCouponCard.jsx";

const CartPage = () => {
	const { cart } = useCartStore();

	return (
		<div className='min-h-screen bg-[#ebe2e3] py-24 md:py-28'>
			<div className='mx-auto max-w-7xl px-4 2xl:px-0'>
				<div className='mb-8 text-center'>
					<h1 className='text-3xl font-bold text-[#222] sm:text-[46px] sm:leading-13.5'>Shopping Cart</h1>
					<p className='mt-2 text-base text-[#465b52]'>Review your Cartiva pieces before checkout.</p>
				</div>
				<div className='mt-6 sm:mt-8 md:gap-6 lg:flex lg:items-start xl:gap-8'>
					<div
						className='mx-auto w-full flex-none lg:max-w-2xl xl:max-w-4xl'
					>
						{cart.length === 0 ? (
							<EmptyCartUI />
						) : (
							<div className='space-y-6'>
								{cart.map((item) => (
									<CartItem key={item._id} item={item} />
								))}
							</div>
						)}
						{cart.length > 0 && <PeopleAlsoBought />}
					</div>

					{cart.length > 0 && (
						<div
							className='mx-auto mt-6 max-w-4xl flex-1 space-y-6 lg:mt-0 lg:w-full'
						>
							<OrderSummary />
							<GiftCouponCard />
						</div>
					)}
				</div>
			</div>
		</div>
	);
};
export default CartPage;

const EmptyCartUI = () => (
	<div
		className='flex flex-col items-center justify-center space-y-4 border border-[#d8d0d1] bg-white px-6 py-16 shadow-sm sm:rounded-md'
	>
		<ShoppingCart className='h-20 w-20 text-[#088178]' />
		<h3 className='text-2xl font-semibold text-[#222]'>Your cart is empty</h3>
		<p className='text-center text-[#465b52]'>Looks like you {"haven't"} added anything to your cart yet.</p>
		<Link
			className='mt-4 rounded-md bg-[#088178] px-6 py-2.5 font-semibold text-white transition-colors hover:bg-[#066c65]'
			to='/'
		>
			Start Shopping
		</Link>
	</div>
);
