import { Trash, Star } from "lucide-react";
import { useEffect } from "react";
import { useProductStore } from "../stores/useProductStore";

const ProductsList = () => {
	const { deleteProduct, fetchAllProducts, loading, toggleFeaturedProduct, products } = useProductStore();

	useEffect(() => {
		fetchAllProducts();
	}, [fetchAllProducts]);

	return (
		<div
			className='max-w-5xl mx-auto overflow-hidden border border-[#d8d0d1] bg-white shadow-sm sm:rounded-md'
		>
			<table className=' min-w-full divide-y divide-[#d8d0d1]'>
				<thead className='bg-[#ebe2e3]'>
					<tr>
						<th
							scope='col'
							className='px-6 py-3 text-left text-xs font-semibold text-[#465b52] uppercase tracking-wider'
						>
							Product
						</th>
						<th
							scope='col'
							className='px-6 py-3 text-left text-xs font-semibold text-[#465b52] uppercase tracking-wider'
						>
							Price
						</th>
						<th
							scope='col'
							className='px-6 py-3 text-left text-xs font-semibold text-[#465b52] uppercase tracking-wider'
						>
							Category
						</th>

						<th
							scope='col'
							className='px-6 py-3 text-left text-xs font-semibold text-[#465b52] uppercase tracking-wider'
						>
							Featured
						</th>
						<th
							scope='col'
							className='px-6 py-3 text-left text-xs font-semibold text-[#465b52] uppercase tracking-wider'
						>
							Actions
						</th>
					</tr>
				</thead>

				<tbody className='bg-white divide-y divide-[#d8d0d1]'>
					{loading && (
						<tr>
							<td className='px-6 py-4 text-center text-sm text-[#465b52]' colSpan='5'>
								Loading products...
							</td>
						</tr>
					)}

					{!loading && products.length === 0 && (
						<tr>
							<td className='px-6 py-4 text-center text-sm text-[#465b52]' colSpan='5'>
								No products found
							</td>
						</tr>
					)}

					{!loading && products.map((product) => (
						<tr key={product._id} className='hover:bg-[#f8f4f5]'>
							<td className='px-6 py-4 whitespace-nowrap'>
								<div className='flex items-center'>
									<div className='shrink-0 h-10 w-10'>
										<img
											className='h-10 w-10 rounded-md object-cover'
											src={product.image}
											alt={product.name}
										/>
									</div>
									<div className='ml-4'>
										<div className='text-sm font-medium text-[#222]'>{product.name}</div>
									</div>
								</div>
							</td>
							<td className='px-6 py-4 whitespace-nowrap'>
								<div className='text-sm text-[#465b52]'>${product.price.toFixed(2)}</div>
							</td>
							<td className='px-6 py-4 whitespace-nowrap'>
								<div className='text-sm text-[#465b52]'>{product.category}</div>
							</td>
							<td className='px-6 py-4 whitespace-nowrap'>
								<button
									onClick={() => toggleFeaturedProduct(product._id)}
									className={`p-1 rounded-full border transition-colors duration-200 ${
										product.isFeatured ? "border-[#088178] bg-[#e8f6ea] text-[#088178]" : "border-[#d8d0d1] bg-white text-[#465b52]"
									} hover:border-[#088178] hover:text-[#088178]`}
								>
									<Star className='h-5 w-5' />
								</button>
							</td>
							<td className='px-6 py-4 whitespace-nowrap text-sm font-medium'>
								<button
									onClick={() => deleteProduct(product._id)}
									className='text-red-600 hover:text-red-700'
								>
									<Trash className='h-5 w-5' />
								</button>
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
};
export default ProductsList;
