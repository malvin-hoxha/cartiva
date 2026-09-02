import React from 'react'
import { useState } from "react";
import { Link } from "react-router-dom";
import { LogIn, Mail, Lock, ArrowRight, Loader } from "lucide-react";
import { useUserStore } from "../stores/useUserStore.js";

const LoginPage = () => {

  const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const { login, loading } = useUserStore();

	const handleSubmit = (e) => {
		e.preventDefault();
		login(email, password);
	};

  return (
    <div className='min-h-screen flex flex-col justify-center px-4 py-24 sm:px-6 lg:px-8 bg-[#ebe2e3]'>
      <div className='w-full max-w-md mx-auto border border-[#d8d0d1] bg-white px-5 py-8 shadow-sm sm:rounded-md sm:px-10'>
        <h2 className='text-center text-3xl font-bold text-[#222] pb-2'>Login to your account</h2>
        <p className='mb-6 text-center text-sm text-[#465b52]'>Welcome back to Cartiva.</p>

        <form onSubmit={handleSubmit} className='space-y-6'>
          <div>
							<label htmlFor='email' className='block text-sm font-medium text-[#222]'>
								Email address
							</label>
							<div className='mt-1 relative rounded-md shadow-sm'>
								<div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
									<Mail className='h-5 w-5 text-[#088178]' aria-hidden='true' />
								</div>
								<input
									id='email'
									type='email'
									required
									value={email}
									onChange={(e) => setEmail(e.target.value)}
									className='block w-full rounded-md border border-[#d8d0d1] bg-white px-3 py-2 pl-10 text-[#1a1a1a] shadow-sm placeholder-gray-400 focus:border-[#088178] focus:outline-none focus:ring-2 focus:ring-[#088178] sm:text-sm'
									placeholder='you@example.com'
								/>
							</div>
						</div>

            <div>
							<label htmlFor='password' className='block text-sm font-medium text-[#222]'>
								Password
							</label>
							<div className='mt-1 relative rounded-md shadow-sm'>
								<div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
									<Lock className='h-5 w-5 text-[#088178]' aria-hidden='true' />
								</div>
								<input
									id='password'
									type='password'
									required
									value={password}
									onChange={(e) => setPassword(e.target.value)}
									className='block w-full rounded-md border border-[#d8d0d1] bg-white px-3 py-2 pl-10 text-[#1a1a1a] shadow-sm placeholder-gray-400 focus:border-[#088178] focus:outline-none focus:ring-2 focus:ring-[#088178] sm:text-sm'
									placeholder='••••••••'
								/>
							</div>
						</div>

            <button
							type='submit'
							className='w-full flex justify-center rounded-md border border-transparent bg-[#088178] px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition duration-150 ease-in-out hover:bg-[#066c65] focus:outline-none focus:ring-2 focus:ring-[#088178] focus:ring-offset-2 disabled:opacity-50'
							disabled={loading}
						>
							{loading ? (
								<>
									<Loader className='mr-2 h-5 w-5 animate-spin' aria-hidden='true' />
									Loading...
								</>
							) : (
								<>
									<LogIn className='mr-2 h-5 w-5' aria-hidden='true' />
									Login
								</>
							)}
						</button>
        </form>

        <p className='mt-8 text-center text-sm text-[#465b52]'>
          Not a member?{" "}
          <Link to='/signup' className='font-medium text-[#088178] hover:text-[#066c65]'>
            Sign up now <ArrowRight className='inline h-4 w-4' />
          </Link>
        </p>
      </div>
    </div>
  )
}

export default LoginPage
