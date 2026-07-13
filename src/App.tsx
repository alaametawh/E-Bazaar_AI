import { useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import ProtectingRoute from './components/ProtectingRoute'
import { Toaster } from 'react-hot-toast'

import Login from './pages/login'
import Dashboard from './pages/dashboard'
import Home from './pages/Home'
import Product from './pages/Product'
import About from './pages/About'
import Cart from './pages/Cart'
import NotFound from './pages/NotFound'
import Navbar from './components/Navbar/Navbar'
// placeholder img
import itemImg from "./assets/itemImg.jpeg";
import DashIndex from './pages/DashIndex'
import OrdersManage from './pages/OrdersManage'
import ProductsManage from './pages/ProductsManage'

const Items = [
  {
    id: 1,
    name: "Vintage Pocket Watch",
    description: "A classic timepiece from the early 20th century.",
    price: 150.00,
    imageurl: itemImg,
    sec_id: "antiques",
    sales: 10,
    year: 1920
  },
  {
    id: 2,
    name: "Handcrafted Wooden Jewelry Box",
    description: "An intricately designed box for storing precious jewelry.",
    price: 85.00,
    imageurl: itemImg,
    sec_id: "handcrafted",
    sales: 5,
    year: 1900
  },
  {
    id: 3,
    name: "Antique Globe",
    description: "A beautifully crafted globe from the 19th century.",
    price: 200.00,
    imageurl: itemImg,
    sec_id: "antiques",
    sales: 7,
    year: 1850
  },
  {
    id: 4,
    name: "Vintage Typewriter",
    description: "A fully functional typewriter from the mid-20th century.",
    price: 120.00,
    imageurl: itemImg,
    sec_id: "vintage",
    sales: 3,
    year: 1950
  }, {
    id: 5,
    name: "Retro Vinyl Record Player",
    description: "A stylish record player for enjoying classic vinyl records.",
    price: 180.00,
    imageurl: itemImg,
    sec_id: "retro",
    sales: 6,
    year: 1970
  }, {
    id: 6,
    name: "Classic Leather-bound Journal",
    description: "A timeless journal for writing and sketching.",
    price: 45.00,
    imageurl: itemImg,
    sec_id: "classic",
    sales: 12,
    year: 1900
  }
]

interface CartItem {
  name: string
  img: string
  quantity: number
}

function App() {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 1000 * 60 * 5, // 5 minutes
      },
    },
  });

  const [cartItems, setCartItems] = useState<CartItem[]>(localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')!) : []);

  const addToCart = (name: string, img: string, quantity: number) => {
    setCartItems(prevItems => {
      const itemExists = prevItems.some(item => item.name === name);

      let updatedItems;

      if (itemExists) {
        updatedItems = prevItems.map(item =>
          item.name === name ? { ...item, quantity: item.quantity + quantity } : item
        );
      } else {
        updatedItems = [...prevItems, { name, img, quantity }];
      }

      localStorage.setItem('cartItems', JSON.stringify(updatedItems));

      return updatedItems;
    });
  };

  return (
    <QueryClientProvider client={queryClient}>
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
            <Route path="/" element={<Home Items={Items} />} />
            <Route path="/about" element={<About />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/product/:id" element={<Product items={Items} addToCart={addToCart} />} />
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
    </QueryClientProvider>
  )
}

export default App
