import { useEffect, useState } from "react";
import { useParams, Navigate } from "react-router-dom";
import { Plus, Minus } from "lucide-react";
import Footer from "@/components/Footer";
import usePcount from "@/hooks/usePcount";


const Product = ({ addToCart }: { addToCart: (id: number, name: string, img: string, quantity: number, price: number) => void }) => {
    // defaul items
    const { data } = usePcount();
    const [items, setItems] = useState(data || []);

    useEffect(() => {
        setItems(data || []);
    }, [data]);

    const { id } = useParams<{ id: string }>();
    const product = items.find((item: any) => String(item.id) === id);
    const [count, setCount] = useState<number>(1);
    const [inPreview, setInPreview] = useState<boolean>(false);

    const incrementCount = () => {
        setCount((prev) => Math.min(prev + 1, 99));
    };

    const decrementCount = () => {
        setCount((prev) => Math.max(1, prev - 1));
    };

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === "Escape") {
                setInPreview(false);
            }
        };

        window.addEventListener("keydown", handleKeyDown);

        return () => {
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, [])


    return (
        product ? (
            <>
                <div className={`${inPreview ? "grid" : "hidden"} cursor-pointer fixed top-0 left-0 z-100 w-dvw h-dvh place-items-center overflow-hidden bg-accent/30 backdrop-blur-md`} onClick={() => setInPreview(false)}>
                    <img src={product.img_url} alt={product.name} className="max-w-screen max-h-screen object-center object-contain rounded-lg" />
                </div>

                <div className="w-full h-full flex-1 flex flex-col justify-center gap-4 p-4">
                    <div className="w-full h-full overflow-hidden grid place-items-center rounded-lg group">
                        <img src={product.img_url} alt={product.name} onClick={() => setInPreview(true)} className="cursor-pointer w-full max-h-[70dvh] object-cover object-center rounded-lg group-hover:scale-105 transition-transform duration-300" />
                    </div>

                    <div className=" w-full flex flex-col p-2">
                        <p className="text-text text-sm font-light min-w-max w-1/3 text-center bg-accent/30 border border-accent p-1 mb-8 rounded-lg">{product.year}</p>
                        <p className="text-accent font-bold text-xl sm:text-2xl md:text-4xl lg:text-4xl font-header mb-4">{product.name}</p>
                        <p className="text-text/70 text-sm font-description md:text-base mb-16">{product.description}</p>
                        <div className="flex items-center justify-between gap-4 text-text/70 font-semibold text-sm md:text-base">
                            <p className="text-text/70">{product.sales} sales</p>
                            <p className="text-accent font-bold font-header text-2xl">${product.price.toFixed(2)}</p>
                        </div>
                        <div className="flex items-center gap-4 mt-4">
                            <div className="flex-1 shrink-0 flex items-center justify-between gap-2 border border-accent/30 rounded-lg px-4 py-2 select-none">
                                <Minus className="cursor-pointer" size={24} onClick={decrementCount} />
                                <span className="text-text/70 text-sm">{count}</span>
                                <Plus className="cursor-pointer" size={24} onClick={incrementCount} />
                            </div>
                            <button className="flex-5 bg-accent text-bg font-semibold py-2 px-4 rounded-lg hover:bg-accent/80 transition-colors duration-300 cursor-pointer" onClick={() => addToCart(product.id, product.name, product.img_url, count, product.price)}>Add to Cart</button>
                        </div>
                    </div>
                </div>
                <Footer />
            </>
        ) : (
            <Navigate to="/404" replace />
        )
    )
}

export default Product 