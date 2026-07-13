import { useState, useEffect } from "react";
import { useDebounce } from "use-debounce";
import Divider from "../components/Divider";
import SearchArea from "../components/SearchArea";
import Section from "../components/Section";
import Footer from "@/components/Footer";

const Home = ( { Items, addToCart }: { Items: any[]; addToCart: (id: number, name: string, img: string, quantity: number, price: number) => void } ) => {
    // rendering arr
    const [renderArr, setRenderArr] = useState<typeof Items>(Items);
    // filtering states
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedTag, setSelectedTag] = useState<string | null>(null);
    //loading state
    const [isLoading, setIsLoading] = useState(false);
    // Debounce the search query & selected tag to avoid excessive filtering on every keystroke (saves calls and improves performance)
    const [debouncedSearchQuery] = useDebounce(searchQuery, 500);
    const [debouncedSelectedTag] = useDebounce(selectedTag, 300);

    useEffect(()=>{
        // set loading state to true whenever searchQuery or selectedTag changes
        setIsLoading(true);
    }, [searchQuery, selectedTag]);

    useEffect(() => {
        // Filter the items based on the search query and selected tag
        const fetchFilteredData = () => {
            const filtered = Items.filter(item => {
                const matchesSearch = item.name.toLowerCase().includes(debouncedSearchQuery.toLowerCase());
                const matchesTag = debouncedSelectedTag ? item.sec_id === debouncedSelectedTag.toLowerCase() : true;
                return matchesSearch && matchesTag;
            });
            // Update the renderArr state with the filtered items
            setRenderArr(filtered);
            setIsLoading(false); // Data has arrived, drop the loading screen
        };

        fetchFilteredData(); // call the function to filter data based on search query and selected tag
    }, [debouncedSearchQuery, debouncedSelectedTag]);

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

            {/* Pass the state control down to the SearchArea */}
            <SearchArea
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                selectedTag={selectedTag}
                setSelectedTag={setSelectedTag}
            />

            <Divider />
            <Section secName="Recommended" secItems={renderArr} isLoading={isLoading} addToCart={addToCart} />
            <Section secName="Products" secItems={renderArr} isLoading={isLoading} addToCart={addToCart} />
            <Footer />
        </>
    )
}

export default Home;