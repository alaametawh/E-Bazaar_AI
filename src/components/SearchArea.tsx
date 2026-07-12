import { useState } from 'react'
import { Search, X } from 'lucide-react'

interface SearchAreaProps {
    searchQuery: string;
    setSearchQuery: (query: string) => void;
    selectedTag: string | null;
    setSelectedTag: (tag: string | null) => void;
}

const SearchArea = ({ searchQuery, setSearchQuery, selectedTag, setSelectedTag }: SearchAreaProps) => {
    const [tags, setTags] = useState<string[]>(["Antiques", "Collectibles", "Vintage", "Handcrafted", "Rare Finds", "Artisanal", "Retro", "Classic", "Timeless", "Curated"]);
    // handle tag selection
    const handleAddTag = (tag: string) => {
        setSelectedTag(selectedTag === tag ? null : tag);
    }

    return (
        <div className="flex flex-col items-center justify-center py-4 font-default gap-6 text-text">
            {/* Search Input */}
            <div className="flex items-center gap-4 border border-accent/20 rounded-full px-4 py-2 w-full max-w-xl bg-accent/10 focus-within:border-accent transition-colors duration-300">
                <Search className="text-accent" size={18} />
                <input
                    type="text"
                    placeholder="Search for treasures..."
                    className="outline-none border-none flex-1 bg-transparent"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
                {searchQuery && (
                    <X className="text-accent cursor-pointer" size={18} onClick={() => setSearchQuery("")} />
                )}
            </div>

            {/* Tags */}
            <div className="flex flex-wrap items-center gap-2 text-xs sm:text-sm text-text/70">
                <span className="text-accent">Filters:</span>
                {tags.map((tag) => (
                    <button
                        key={tag}
                        className={`${selectedTag === tag ? 'bg-accent/30 font-bold text-accent border border-accent/50' : 'bg-accent/20 hover:bg-accent/30 text-text/70 hover:text-accent'} transition-colors duration-300 py-1 px-3 rounded-full cursor-pointer`}
                        onClick={() => handleAddTag(tag)}
                    >
                        {tag}
                    </button>
                ))}
            </div>
        </div>
    )
}

export default SearchArea;