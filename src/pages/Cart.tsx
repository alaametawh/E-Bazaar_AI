import CartCard from "@/components/CartCard";
import Divider from "@/components/Divider";
import { ShoppingCart } from "lucide-react";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

const Cart = ({ cartItems, setCartItems }: { cartItems: any[]; setCartItems: React.Dispatch<React.SetStateAction<any[]>> }) => {
    const totalPrice = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

    const handleRemoveFromCart = (id: number, name: string) => {
        if(confirm(`Are you sure you want to remove ${name} from the cart?`)){
            setCartItems(prevItems => {
                const updatedItems = prevItems.filter(item => item.id !== id);
                localStorage.setItem('cartItems', JSON.stringify(updatedItems));
                return updatedItems;
            });
            toast.success(`${name} removed from cart!`);
        }
    }
    return (
        <>
            <p className="text-text/70 text-2xl lg:text-4xl mt-2 font-bold font-header">
                Your <span className="font-bold text-accent">Cart</span>
            </p>
            <Divider />
            <div className="py-4 w-full max-h-[60vh] flex-1 flex flex-col items-center gap-2 overflow-y-scroll scrollbar-none">
                {cartItems.length > 0 ? (
                    cartItems.map((item, index) => (
                        <CartCard key={index} id={item.id} name={item.name} price={item.price} image={item.img} quantity={item.quantity} handleRemoveFromCart={handleRemoveFromCart} />
                    ))
                ) : (
                    <div className="text-text/70 text-sm sm:text-base font-default tracking-wide flex items-center justify-center flex-col gap-4 h-[40vh] w-full">
                        <ShoppingCart className="w-10 h-10 text-accent/50 mb-2" />
                        <p>Your cart is empty</p>
                        <Link to="/" className="text-accent font-bold rounded-md border border-accent/50 p-2 bg-accent/20 hover:bg-accent/40 transition-colors duration-300">
                            Continue Shopping
                        </Link>
                    </div>
                )}
            </div>

            <div className="w-full flex flex-col items-center gap-4 py-4 mt-auto">
                <Divider />
                <p className="w-full text-text/70 text-lg font-bold font-header flex justify-between tracking-widewhitespace-nowrap">
                    Total : <span className="text-accent font-bold">${totalPrice.toFixed(2)}</span>
                </p>

                <button className="cursor-pointer w-full bg-accent text-bg font-default font-bold px-4 py-2 rounded-lg hover:bg-accent/80 transition-colors duration-300">
                    Checkout
                </button>
            </div>
        </>
    )
}

export default Cart