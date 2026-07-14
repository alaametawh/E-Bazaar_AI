import { useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import ProtectingRoute from './components/ProtectingRoute'
import { Toaster } from 'react-hot-toast'
import {toast} from "react-hot-toast";
// pages
import Login from './pages/login'
import Dashboard from './pages/dashboard'
import Home from './pages/Home'
import Product from './pages/Product'
import About from './pages/About'
import Cart from './pages/Cart'
import NotFound from './pages/NotFound'
import Navbar from './components/Navbar/Navbar'
import DashIndex from './pages/DashIndex'
import ProductsManage from './pages/ProductsManage'
import OrdersManage from './pages/OrdersManage'

interface CartItem {
  id: number
  img_url: string
  name: string
  price: number
  quantity: number
}

function App() {

  const [cartItems, setCartItems] = useState<CartItem[]>(localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')!) : []);

  const addToCart = (id: number, name: string, img_url: string, quantity: number, price: number) => {
    setCartItems(prevItems => {
      const itemExists = prevItems.some(item => item.name === name);

      let updatedItems;

      if (itemExists) {
        updatedItems = prevItems.map(item =>
          item.name === name ? { ...item, quantity: item.quantity + quantity } : item
        );
      } else {
        updatedItems = [...prevItems, { id, name, img_url, quantity, price }];
      }
      localStorage.setItem('cartItems', JSON.stringify(updatedItems));
      return updatedItems;
    });
    toast.success(`${name} added to cart!`);
  };

  return (
      <BrowserRouter>
        <Navbar itemsCount={cartItems.length} />
        <Toaster
          position="top-center"
          gutter={10}
          containerStyle={{ top: 70 }}
          toastOptions={{
            success: {
              duration: 3000,
              style: {
                background: "#16a34a",
                color: "#fff",
              },
            },
            error: {
              duration: 5000,
              style: {
                background: "#dc2626",
                color: "#fff",
              },
            },
            style: {
              fontSize: "16px",
              maxWidth: "500px",
              padding: "16px 24px",
              borderRadius: "8px",
            },
          }}
        />
        <div className="bg-bg min-h-dvh w-full flex flex-col pt-18 px-2 md:px-4 lg:px-16">
          <Routes>
            <Route path="/" element={<Home addToCart={addToCart} />} />
            <Route path="/about" element={<About />} />
            <Route path="/cart" element={<Cart cartItems={cartItems} setCartItems={setCartItems} />} />
            <Route path="/product/:id" element={<Product addToCart={addToCart} />} />
            <Route path="/login" element={<Login />} />
            <Route path="/dashboard" element={<ProtectingRoute><Dashboard /></ProtectingRoute>} >
              <Route index element={<DashIndex/>} />
              <Route path='admin' element={<DashIndex/>} />
              <Route path='productsManage' element={<ProductsManage/>} />
              <Route path='ordersManage' element={<OrdersManage/>} />
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </BrowserRouter>
  )
}

export default App
