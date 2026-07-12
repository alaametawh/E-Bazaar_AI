import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Product from './pages/Product'
import About from './pages/About'
import Cart from './pages/Cart'
import NotFound from './pages/NotFound'
import Navbar from './components/Navbar/Navbar'
// placeholder img
import itemImg from "./assets/itemImg.jpeg";
import { useState } from 'react'

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

function App() {
  const [cartItems, setCartItems] = useState<any[]>(localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')!) : []);

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
    <BrowserRouter>
      <Navbar itemsCount={cartItems.length} />
      <div className="bg-bg min-h-dvh w-full flex flex-col pt-18 px-2 md:px-4 lg:px-16">
        <Routes>
          <Route path="/" element={<Home Items={Items} />} />
          <Route path="/about" element={<About />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/product/:id" element={<Product items={Items} addToCart={addToCart} />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App
