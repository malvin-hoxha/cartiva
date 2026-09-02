import { BarChart, PlusCircle, ShoppingBasket } from "lucide-react";
import { useEffect, useState } from "react";

import AnalyticsTab from "../components/AnalyticsTab";
import CreateProductForm from "../components/CreateProductForm";
import ProductsList from "../components/ProductsList";

const tabs = [
	{ id: "create", label: "Create Product", icon: PlusCircle },
	{ id: "products", label: "Products", icon: ShoppingBasket },
	{ id: "analytics", label: "Analytics", icon: BarChart },
];

const AdminPage = () => {

    const [activeTab, setActiveTab] = useState("create");

    return (
        <div className='min-h-screen relative overflow-hidden bg-[#ebe2e3]'>
			<div className='relative z-10 container mx-auto px-4 py-24'>
				<div className='mb-8 text-center'>
					<h1 className='text-3xl font-bold text-[#222] sm:text-[46px] sm:leading-13.5'>Admin Dashboard</h1>
					<p className='mt-2 text-base text-[#465b52]'>Manage Cartiva products, featured items, and store performance.</p>
				</div>

				<div className='flex flex-wrap justify-center gap-3 mb-8'>
					{tabs.map((tab) => (
						<button
							key={tab.id}
							onClick={() => setActiveTab(tab.id)}
							className={`flex items-center px-4 py-2 rounded-md border font-medium transition-colors duration-200 ${
								activeTab === tab.id
									? "border-[#088178] bg-[#088178] text-white"
									: "border-[#d8d0d1] bg-white text-[#1a1a1a] hover:border-[#088178] hover:text-[#088178]"
							}`}
						>
							<tab.icon className='mr-2 h-5 w-5' />
							{tab.label}
						</button>
					))}
				</div>
				{activeTab === "create" && <CreateProductForm />}
				{activeTab === "products" && <ProductsList />}
				{activeTab === "analytics" && <AnalyticsTab />}
			</div>
		</div>
    )
}

export default AdminPage
