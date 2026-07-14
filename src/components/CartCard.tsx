import { Trash2 } from 'lucide-react'

const CartCard = ({ id, name, price, image, quantity, handleRemoveFromCart }: { id: number; name: string; price: number; image: string; quantity: number; handleRemoveFromCart: (id: number, name: string) => void }) => {
    return (
        <div className="flex items-center w-full h-18 bg-accent/10 rounded-lg p-2  md:px-4 border border-accent/30 gap-4">
            <div className="h-full mb-4 shrink-0 overflow-hidden flex items-center justify-center rounded-lg relative my-auto">
                <img src={image} alt={name} className="h-full object-cover object-center origin-center rounded-lg group-hover:scale-105 transition-transform duration-300" />
            </div>
            <h3 className="md:text-lg font-bold text-text truncate whitespace-nowrap font-default">{name}</h3>
            <div className="flex items-center gap-4 ml-auto w-max ">
                <p className="text-xs md:text-sm text-bg font-black p-2 bg-accent/50 rounded-md border border-accent">{quantity}</p>
                <p className="md:text-lg font-header font-bold text-accent">${price.toFixed(2)}</p>
                <Trash2 className="cursor-pointer text-red-500" size={20} onClick={() => handleRemoveFromCart(id, name)} />
            </div>
        </div>
    )
}

export default CartCard