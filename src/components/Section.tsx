import React, { useRef } from 'react'
import ItemCard from './ItemCard'
import { Skeleton } from '@/components/ui/skeleton';

interface item {
    description: string;
    id: number;
    img_url: string;
    name: string;
    price: number;
    sales: number;
    sec_id: string;
    year: number;
}

const Section = ({ secName, secItems, isLoading, Loading, addToCart }: { secName: string; secItems: item[]; isLoading: boolean; Loading: boolean; addToCart: (id: number, name: string, img_url: string, quantity: number, price: number) => void }) => {
    // Create a reference to the scrollable container div
    const scrollRef = useRef<HTMLDivElement>(null);

    // Variables to track dragging state
    let isDown = false;
    let startX: number;
    let scrollLeft: number;

    const handleMouseDown = (e: React.MouseEvent) => {
        if (!scrollRef.current) return;
        isDown = true;
        scrollRef.current.classList.add('cursor-grabbing');
        scrollRef.current.classList.remove('cursor-grab');

        // Get starting X coordinates relative to the container
        startX = e.pageX - scrollRef.current.offsetLeft;
        scrollLeft = scrollRef.current.scrollLeft;
    };

    const handleMouseLeaveOrUp = () => {
        if (!scrollRef.current) return;
        isDown = false;
        scrollRef.current.classList.remove('cursor-grabbing');
        scrollRef.current.classList.add('cursor-grab');
    };

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!isDown || !scrollRef.current) return;
        e.preventDefault(); // Stop text/image selection while dragging

        const x = e.pageX - scrollRef.current.offsetLeft;
        const walk = (x - startX) * 1.5; // Multiplier adjusts scrolling speed
        scrollRef.current.scrollLeft = scrollLeft - walk;
    };

    return (
        <div className="flex flex-col font-default mt-16 gap-4 select-none">
            <p className="text-xl md:text-2xl font-bold text-accent border-l-2 rounded-l-full pl-4">{secName}</p>
            <div className="flex overflow-x-hidden w-full min-h-32 h-max">
                {/* 3. Attach handlers and cursor classes */}
                <div
                    ref={scrollRef}
                    onMouseDown={handleMouseDown}
                    onMouseLeave={handleMouseLeaveOrUp}
                    onMouseUp={handleMouseLeaveOrUp}
                    onMouseMove={handleMouseMove}
                    className="flex gap-4 overflow-x-auto w-full min-h-32 h-max scrollbar-none cursor-grab [box-shadow:inset_0_0_10px_#00000020] rounded-lg p-2 scroll-smooth-none mask-[linear-gradient(to_right,transparent,black_6%,black_96%,transparent)]"
                >
                    {(isLoading || Loading) ? (
                        <div className="flex gap-4">
                            {[...Array(Math.max(4, Math.floor(window.innerWidth / 250)))].map((_, i) => (
                                <Skeleton key={i} className="w-64 h-75" />
                            ))}
                        </div>
                    ) : (secItems.length > 0 ? secItems.map((item) => (
                        <ItemCard key={item.id} item={item} addToCart={addToCart} />
                    )) : (
                        <p className="text-text/70 text-sm sm:text-base tracking-wide grid place-items-center w-full">
                            No items found
                        </p>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Section