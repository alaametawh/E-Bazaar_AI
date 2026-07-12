import { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
// import icons
import { ShoppingCart, Menu, X } from 'lucide-react'
// import components
import NavIcon from './NavIcon'
import HamMenu from './Menu'


function Navbar({ itemsCount }: { itemsCount: number }) {
    const navigate = useNavigate()
    const [isMenuOpen, setIsMenuOpen] = useState<boolean | null>(false)
    const currentPath = useLocation().pathname

    return (
        // navbar & HamMenu container
        <nav className="w-full flex flex-col fixed top-0 z-50">
            {/* Navbar */}
            <div className="flex justify-between items-center px-4 sm:px-12 py-4 border-b border-accent/30 bg-bg h-16 w-full font-default ">
                {/* Logo */}
                <Link to="/" className="h-full flex items-center gap-2">
                    <NavIcon />
                    <div className="font-black text-accent whitespace-nowrap">E-Bazaar</div>
                </Link>
                {/* Navigation Links */}
                <nav className="text-text/70 font-bold gap-6 hidden md:flex">
                    <Link to="/" className={`cursor-pointer p-1 border-b ${currentPath === '/' ? 'border-accent text-accent' : 'border-transparent hover:border-accent hover:text-accent'}  transition-all duration-300`}>Home</Link>
                    <Link to="/about" className={`cursor-pointer p-1 border-b ${currentPath === '/about' ? 'border-accent text-accent' : 'border-transparent hover:border-accent hover:text-accent'}  transition-all duration-300`}>About</Link>
                </nav>
                {/* Cart and Menu Icons */}
                <div className="flex items-center gap-8 h-full ">
                    <span className="flex items-center gap-2 text-accent relative w-max p-2 bg-accent/10 rounded-full border border-accent/20 font-black font-default cursor-pointer" onClick={() => navigate('/cart')}>
                        <ShoppingCart className="h-full" /> Cart
                        <p className="bg-accent text-bg rounded-full w-4 h-4 grid place-items-center text-xs font-black font-header absolute -top-1 -right-1 z-10">{itemsCount}</p>
                    </span>
                    {isMenuOpen ? <X onClick={() => setIsMenuOpen(false)} className="h-full text-accent md:hidden cursor-pointer" /> : <Menu onClick={() => setIsMenuOpen(true)} className="h-full text-accent md:hidden cursor-pointer" />}
                </div>
            </div>
            {/* HamMenu */}
            <HamMenu isOpen={isMenuOpen} />
        </nav>

    )
}

export default Navbar
