import Divider from "../components/Divider"

const Home = () => {
    return (
        <>
            <div className="flex flex-col items-center justify-center py-8 font-default gap-8 ">
                <p className="[word-spacing:0.4rem] font-bold text-accent/50 flex items-center gap-10 tracking-[0.4vw] text-xs whitespace-nowrap"><span className="text-accent">✦</span>   The Grand Emporium   <span className="text-accent">✦</span></p>
                <h1 className="flex flex-col items-center justify-center text-2xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-text font-header tracking-widest whitespace-nowrap">Treasures of the <span className="text-accent">Ancient Souq</span></h1>
                <Divider />
                <p className="text-text/70 text-[10px] sm:text-sm tracking-wide text-center max-w-2xl">
                    Antiques, collectibles, and vintage treasures await you in our curated collection. Explore the rich history and timeless beauty of the past, all in one place.
                </p>
            </div>
        </>
    )
}

export default Home