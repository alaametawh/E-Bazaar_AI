import { Link } from 'react-router-dom'

function NotFound() {
    return (
        <div className="flex flex-col items-center justify-center mt-50">
            <h1 className="text-4xl font-bold">404 - Page Not Found</h1>
            <p className="text-lg">The page you are looking for does not exist.</p>
            <Link className="mt-10 text-blue-500 hover:underline self-center" to="/">Continue Shopping</Link>
        </div>
    )
}

export default NotFound
