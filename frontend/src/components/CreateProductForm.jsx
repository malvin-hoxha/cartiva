import { useState } from "react";
import { PlusCircle, Upload, Loader } from "lucide-react";
import { useProductStore } from "../stores/useProductStore";

const categories = ["spring", "summer"];

const CreateProductForm = () => {

  const [newProduct, setNewProduct] = useState({
		name: "",
		description: "",
		price: "",
		category: "",
		image: "",
	});

  const { createProduct, loading } = useProductStore();

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			await createProduct(newProduct);
			setNewProduct({ name: "", description: "", price: "", category: "", image: "" });
		} catch {
			console.log("error creating a product");
		}
	};

	const handleImageChange = (e) => {
		const file = e.target.files[0];
		if (file) {
			const reader = new FileReader();

			reader.onloadend = () => {
				setNewProduct({ ...newProduct, image: reader.result });
			};

			reader.readAsDataURL(file); // base64
		}
	};

	return (
		<div
			className='border border-[#d8d0d1] bg-white p-8 mb-8 max-w-xl mx-auto shadow-sm sm:rounded-md'>
			<h2 className='text-2xl font-semibold mb-2 text-[#222]'>Create New Product</h2>
			<p className='mb-6 text-sm text-[#465b52]'>Add a new Cartiva item to the storefront.</p>

			<form onSubmit={handleSubmit} className='space-y-4'>
				<div>
					<label htmlFor='name' className='block text-sm font-medium text-[#222]'>
						Product Name
					</label>
					<input
						type='text'
						id='name'
						name='name'
						value={newProduct.name}
						onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
						className='mt-1 block w-full rounded-md border border-[#d8d0d1] bg-white px-3 py-2 text-[#1a1a1a] shadow-sm focus:border-[#088178] focus:outline-none focus:ring-2 focus:ring-[#088178]'
						required
					/>
				</div>

				<div>
					<label htmlFor='description' className='block text-sm font-medium text-[#222]'>
						Description
					</label>
					<textarea
						id='description'
						name='description'
						value={newProduct.description}
						onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
						rows='3'
						className='mt-1 block w-full rounded-md border border-[#d8d0d1] bg-white px-3 py-2 text-[#1a1a1a] shadow-sm focus:border-[#088178] focus:outline-none focus:ring-2 focus:ring-[#088178]'
						required
					/>
				</div>

				<div>
					<label htmlFor='price' className='block text-sm font-medium text-[#222]'>
						Price
					</label>
					<input
						type='number'
						id='price'
						name='price'
						value={newProduct.price}
						onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
						step='0.01'
						className='mt-1 block w-full rounded-md border border-[#d8d0d1] bg-white px-3 py-2 text-[#1a1a1a] shadow-sm focus:border-[#088178] focus:outline-none focus:ring-2 focus:ring-[#088178]'
						required
					/>
				</div>

				<div>
					<label htmlFor='category' className='block text-sm font-medium text-[#222]'>
						Category
					</label>
					<select
						id='category'
						name='category'
						value={newProduct.category}
						onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
						className='mt-1 block w-full rounded-md border border-[#d8d0d1] bg-white px-3 py-2 text-[#1a1a1a] shadow-sm focus:border-[#088178] focus:outline-none focus:ring-2 focus:ring-[#088178]'
						required
					>
						<option value=''>Select a category</option>
						{categories.map((category) => (
							<option key={category} value={category}>
								{category}
							</option>
						))}
					</select>
				</div>

				<div className='mt-1 flex items-center'>
					<input type='file' id='image' className='sr-only' accept='image/*' onChange={handleImageChange} />
					<label
						htmlFor='image'
						className='cursor-pointer rounded-md border border-[#088178] bg-white px-3 py-2 text-sm font-medium leading-4 text-[#088178] shadow-sm hover:bg-[#088178] hover:text-white focus:outline-none focus:ring-2 focus:ring-[#088178] focus:ring-offset-2'
					>
						<Upload className='h-5 w-5 inline-block mr-2' />
						Upload Image
					</label>
					{newProduct.image && <span className='ml-3 text-sm text-[#465b52]'>Image uploaded </span>}
				</div>

				<button
					type='submit'
					className='w-full flex justify-center rounded-md border border-transparent bg-[#088178] px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-[#066c65] focus:outline-none focus:ring-2 focus:ring-[#088178] focus:ring-offset-2 disabled:opacity-50'
					disabled={loading}
				>
					{loading ? (
						<>
							<Loader className='mr-2 h-5 w-5 animate-spin' aria-hidden='true' />
							Loading...
						</>
					) : (
						<>
							<PlusCircle className='mr-2 h-5 w-5' />
							Create Product
						</>
					)}
				</button>
			</form>
		</div>
	);
}

export default CreateProductForm
