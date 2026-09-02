import { useEffect, useState } from "react";
import axios from "../lib/axios";
import { Users, Package, ShoppingCart, DollarSign } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

const AnalyticsTab = () => {
	const [analyticsData, setAnalyticsData] = useState({
		users: 0,
		products: 0,
		totalSales: 0,
		totalRevenue: 0,
	});
	const [isLoading, setIsLoading] = useState(true);
	const [dailySalesData, setDailySalesData] = useState([]);

	useEffect(() => {
		const fetchAnalyticsData = async () => {
			try {
				const response = await axios.get("/analytics");
				setAnalyticsData(response.data.analyticsData);
				setDailySalesData(response.data.dailySalesData);
			} catch (error) {
				console.error("Error fetching analytics data:", error);
			} finally {
				setIsLoading(false);
			}
		};

		fetchAnalyticsData();
	}, []);

	if (isLoading) {
		return <div className='text-center text-[#465b52]'>Loading...</div>;
	}

	return (
		<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
			<div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8'>
				<AnalyticsCard
					title='Total Users'
					value={analyticsData.users.toLocaleString()}
					icon={Users}
					color='text-[#088178]'
				/>
				<AnalyticsCard
					title='Total Products'
					value={analyticsData.products.toLocaleString()}
					icon={Package}
					color='text-[#088178]'
				/>
				<AnalyticsCard
					title='Total Sales'
					value={analyticsData.totalSales.toLocaleString()}
					icon={ShoppingCart}
					color='text-[#088178]'
				/>
				<AnalyticsCard
					title='Total Revenue'
					value={`$${analyticsData.totalRevenue.toLocaleString()}`}
					icon={DollarSign}
					color='text-[#088178]'
				/>
			</div>
			<div
				className='rounded-md border border-[#d8d0d1] bg-white p-6 shadow-sm'
			>
				<ResponsiveContainer width='100%' height={400}>
					<LineChart data={dailySalesData}>
						<CartesianGrid strokeDasharray='3 3' stroke='#d8d0d1' />
						<XAxis dataKey='name' stroke='#465b52' />
						<YAxis yAxisId='left' stroke='#465b52' />
						<YAxis yAxisId='right' orientation='right' stroke='#465b52' />
						<Tooltip />
						<Legend />
						<Line
							yAxisId='left'
							type='monotone'
							dataKey='sales'
							stroke='#10B981'
							activeDot={{ r: 8 }}
							name='Sales'
						/>
						<Line
							yAxisId='right'
							type='monotone'
							dataKey='revenue'
							stroke='#3B82F6'
							activeDot={{ r: 8 }}
							name='Revenue'
						/>
					</LineChart>
				</ResponsiveContainer>
			</div>
		</div>
	);
};
export default AnalyticsTab;

const AnalyticsCard = ({ title, value, icon: Icon, color }) => (
	<div
		className='rounded-md border border-[#d8d0d1] bg-white p-6 shadow-sm overflow-hidden relative'
	>
		<div className='flex justify-between items-center'>
			<div className='z-10'>
				<p className='text-[#465b52] text-sm mb-1 font-semibold'>{title}</p>
				<h3 className='text-[#222] text-3xl font-bold'>{value}</h3>
			</div>
		</div>
		<div className={`absolute -bottom-4 -right-4 opacity-15 ${color}`}>
			<Icon className='h-32 w-32' />
		</div>
	</div>
);
