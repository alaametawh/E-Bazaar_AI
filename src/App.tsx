import {BrowserRouter, Route, Routes} from 'react-router-dom'
import Home from './pages/Home'
import About from './pages/About'
import Cart from './pages/Cart'
import NotFound from './pages/NotFound'
import Navbar from './components/Navbar/Navbar'

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <div className="p-4 bg-bg min-h-screen w-full">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App
