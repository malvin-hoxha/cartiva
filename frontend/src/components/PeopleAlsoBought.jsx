import { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import axios from "../lib/axios";
import LoadingSpinner from "./LoadingSpinner";

const PeopleAlsoBought = () => {
	const [recommendations, setRecommendations] = useState([]);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		const fetchRecommendations = async () => {
			try {
				const res = await axios.get("/products/recommendations");
				setRecommendations(res.data);
			} catch (error) {
			} finally {
				setIsLoading(false);
			}
		};

		fetchRecommendations();
	}, []);

	if (isLoading) return <LoadingSpinner />;

	return (
		<div className='mt-8'>
			<h3 className='text-2xl font-semibold text-[#222]'>People also bought</h3>
			<p className='mt-1 text-sm text-[#465b52]'>A few more Cartiva picks that pair well with your cart.</p>
			<div className='mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3'>
				{recommendations.map((product) => (
					<ProductCard key={product._id} product={product} />
				))}
			</div>
		</div>
	);
};
export default PeopleAlsoBought;
