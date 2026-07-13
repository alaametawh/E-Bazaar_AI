import { Link } from 'react-router-dom'

function NotFound() {
    return (
        <div className="flex flex-col items-center justify-center mt-50">
            <h1 className="text-4xl font-bold">404 - Page Not Found</h1>
            <p className="text-lg">The page you are looking for does not exist.</p>
            <Link className="mt-10 text-accent font-bold rounded-md border border-accent/50 p-2 bg-accent/20 hover:bg-accent/40 transition-colors duration-300" to="/">
                Continue Shopping
            </Link>
        </div>
    )
}

export default NotFound
