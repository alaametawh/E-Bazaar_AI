import {Link, useNavigate} from 'react-router-dom'

function Header() {
    const navigate = useNavigate()

    return (
        <div className="flex justify-between items-center p-4 border-b">
            <div className="logo">Store App</div>
            <div className=" flex gap-4">
                <Link to="/">Home</Link>
                <Link to="/about">About</Link>
            </div>
            <button onClick={() => navigate('/cart')} className=" bg-green-500 text-white font-bold border cursor-pointer p-1.5 px-2.5 flex gap-2 rounded-xl">
                Cart
            </button>
        </div>
    )
}

export default Header
