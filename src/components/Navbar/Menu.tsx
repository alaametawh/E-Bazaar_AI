import { Link, useLocation } from "react-router-dom"

const HamMenu = ({ isOpen }: { isOpen: boolean | null }) => {
    const currentPath = useLocation().pathname

    return (
        <div className={`h-max ${isOpen ? 'flex' : 'hidden'} md:hidden w-full border-b border-accent/30 bg-bg font-default text-text/70 font-bold gap-4 flex-col p-6`}>
            <Link to="/" className={`cursor-pointer ${currentPath === '/' ? 'text-accent' : 'hover:text-accent'}  transition-all duration-300`}>Home</Link>
            <Link to="/about" className={`cursor-pointer ${currentPath === '/about' ? 'text-accent' : 'hover:text-accent'}  transition-all duration-300`}>About</Link>
        </div>
    )
}

export default HamMenu