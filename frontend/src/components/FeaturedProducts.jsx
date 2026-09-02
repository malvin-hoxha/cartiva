import { useEffect, useState } from "react";
import { ShoppingCart, ChevronLeft, ChevronRight } from "lucide-react";
import { useCartStore } from "../stores/useCartStore";

const FeaturedProducts = ({ featuredProducts }) => {
	const [currentIndex, setCurrentIndex] = useState(0);
	const [itemsPerPage, setItemsPerPage] = useState(4);

	const { addToCart } = useCartStore();
	const maxIndex = Math.max(featuredProducts.length - itemsPerPage, 0);
	const shouldShowControls = featuredProducts.length > itemsPerPage;

	useEffect(() => {
		const handleResize = () => {
			if (window.innerWidth < 640) setItemsPerPage(1);
			else if (window.innerWidth < 1024) setItemsPerPage(2);
			else if (window.innerWidth < 1280) setItemsPerPage(3);
			else setItemsPerPage(4);
		};

		handleResize();
		window.addEventListener("resize", handleResize);
		return () => window.removeEventListener("resize", handleResize);
	}, []);

	useEffect(() => {
		setCurrentIndex((prevIndex) => Math.min(prevIndex, maxIndex));
	}, [maxIndex]);

	const nextSlide = () => {
		setCurrentIndex((prevIndex) => Math.min(prevIndex + itemsPerPage, maxIndex));
	};

	const prevSlide = () => {
		setCurrentIndex((prevIndex) => Math.max(prevIndex - itemsPerPage, 0));
	};

	const isStartDisabled = currentIndex === 0;
	const isEndDisabled = currentIndex >= maxIndex;

	return (
		<section className='py-12'>
			<div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
				<div className='mb-8 text-center'>
					<h2 className='text-3xl font-bold text-[#222] sm:text-[42px] sm:leading-tight'>Featured</h2>
					<p className='mt-2 text-base text-[#465b52]'>Selected products from our latest collection</p>
				</div>

				<div className='relative'>
					<div className='overflow-hidden'>
						<div
							className='flex transition-transform duration-300 ease-in-out'
							style={{ transform: `translateX(-${currentIndex * (100 / itemsPerPage)}%)` }}
						>
							{featuredProducts?.map((product) => (
								<div
									key={product._id}
									className='flex-shrink-0 px-2'
									style={{ width: `${100 / itemsPerPage}%` }}
								>
									<div className='mx-auto h-full max-w-[270px] overflow-hidden rounded-md border border-[#d8d0d1] bg-white shadow-sm transition-all duration-300 hover:shadow-md'>
										<div className='overflow-hidden bg-gray-100'>
											<img
												src={product.image}
												alt={product.name}
												className='h-64 w-full object-cover object-top transition-transform duration-300 ease-in-out hover:scale-105'
											/>
										</div>
										<div className='p-4'>
											<h3 className='mb-2 text-base font-semibold text-[#222]'>{product.name}</h3>
											<p className='mb-4 font-semibold text-[#088178]'>
												${product.price.toFixed(2)}
											</p>
											<button
												onClick={() => addToCart(product)}
												className='w-full rounded-md bg-[#088178] px-4 py-2.5 font-semibold text-white transition-colors duration-300 hover:bg-[#066c65]
												flex items-center justify-center'
											>
												<ShoppingCart className='w-5 h-5 mr-2' />
												Add to Cart
											</button>
										</div>
									</div>
								</div>
							))}
						</div>
					</div>

					{shouldShowControls && (
						<>
							<button
								type='button'
								onClick={prevSlide}
								disabled={isStartDisabled}
								aria-label='Previous featured products'
								className={`absolute left-0 top-1/2 flex h-10 w-10 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border shadow-sm transition-colors duration-300 ${
									isStartDisabled
										? "cursor-not-allowed border-gray-200 bg-gray-100 text-gray-400"
										: "border-[#088178] bg-white text-[#088178] hover:bg-[#088178] hover:text-white"
								}`}
							>
								<ChevronLeft className='h-5 w-5' />
							</button>

							<button
								type='button'
								onClick={nextSlide}
								disabled={isEndDisabled}
								aria-label='Next featured products'
								className={`absolute right-0 top-1/2 flex h-10 w-10 translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border shadow-sm transition-colors duration-300 ${
									isEndDisabled
										? "cursor-not-allowed border-gray-200 bg-gray-100 text-gray-400"
										: "border-[#088178] bg-white text-[#088178] hover:bg-[#088178] hover:text-white"
								}`}
							>
								<ChevronRight className='h-5 w-5' />
							</button>
						</>
					)}
				</div>
			</div>
		</section>
	);
};
export default FeaturedProducts;
