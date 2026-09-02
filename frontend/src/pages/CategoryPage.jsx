import React from 'react'

import { useEffect } from "react";
import { useProductStore } from "../stores/useProductStore";
import { useParams } from "react-router-dom";
import ProductCard from "../components/ProductCard";

const CategoryPage = () => {

    const { fetchProductsByCategory, products } = useProductStore();
	const { category } = useParams();

    useEffect(() => {
		fetchProductsByCategory(category);
	}, [fetchProductsByCategory, category]);

    return (
		<div className='min-h-screen bg-white'>
			<div className='relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24'>
				<h1
					className='text-center text-3xl sm:text-[46px] sm:leading-13.5 font-bold text-[#222] mb-3'
				>
					{category.charAt(0).toUpperCase() + category.slice(1)}
				</h1>
				<p className='mb-10 text-center text-base text-[#465b52]'>Fresh styles selected for the {category} collection.</p>

				<div
					className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 justify-items-center'
				>
					{products?.length === 0 && (
						<h2 className='text-2xl font-semibold text-[#465b52] text-center col-span-full'>
							No products found
						</h2>
					)}

					{products?.map((product) => (
						<ProductCard key={product._id} product={product} />
					))}
				</div>
			</div>
		</div>
    );
}

export default CategoryPage
