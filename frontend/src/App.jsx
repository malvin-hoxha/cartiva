
import React, { useEffect } from 'react'
import { Navigate, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage.jsx"
import LoginPage from "./pages/LoginPage.jsx"
import SignUpPage from "./pages/SignUpPage.jsx"
import Navbar from './components/Navbar.jsx'
import { useUserStore } from './stores/useUserStore.js'
import LoadingSpinner from './components/LoadingSpinner.jsx'
import AdminPage from './pages/AdminPage.jsx'
import CategoryPage from './pages/CategoryPage.jsx'
import CartPage from './pages/CartPage.jsx'
import { useCartStore } from './stores/useCartStore.js'

const App = () => {

  const { user, checkAuth, checkingAuth } = useUserStore();
	const { getCartItems } = useCartStore();
	useEffect(() => {
		checkAuth();
	}, [checkAuth]);

	useEffect(() => {
		if (!user) return;

		getCartItems();
	}, [getCartItems, user]);

	if (checkingAuth) return <LoadingSpinner />;


  return (
      <div className='min-h-screen bg-[#ebe2e3] text-black relative overflow-hidden'>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />}/>
        <Route path='/signup' element={!user ? <SignUpPage /> : <Navigate to='/' />} />
        <Route path='/login' element={!user ? <LoginPage /> : <Navigate to='/' />} />
        <Route
          path='/secret-dashboard'
          element={user?.role === "admin" ? <AdminPage /> : <Navigate to='/login' />}
        />
        <Route path='/category/:category' element={<CategoryPage />} />
        <Route path='/cart' element={user ? <CartPage /> : <Navigate to='/login' />} />
      </Routes>
    </div>
  )
}

export default App