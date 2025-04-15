import { Bookmark, BellDot } from "lucide-react";

type FiltersProps = {
    debounced: (value: string) => void;
    toggleFavouritesFilter: () => void;
    toggleReadFilter: () => void
    filterFavorites: boolean
    filterRead: boolean
}
const Filters = ({ debounced, toggleFavouritesFilter, toggleReadFilter, filterFavorites, filterRead }: FiltersProps) => {
    return (
        <>
            <input
                type="text"
                placeholder="Filter for..."
                onChange={e => debounced(e.target.value)}
                className="w-3/4 p-2 border rounded bg-white dark:bg-gray-800 dark:text-white dark:border-gray-600"
            />
            <div className="w-1/4 flex justify-around items-center">
                <div onClick={toggleFavouritesFilter} className={`cursor-pointer border p-1 rounded-full ${filterFavorites && 'bg-blue-600'}`}>
                    <Bookmark className="cursor-pointer" />
                </div>
                <div onClick={toggleReadFilter} className={`cursor-pointer border p-1 rounded-full ${filterRead && 'bg-blue-600'}`}>
                    <BellDot />
                </div>
            </div>
        </>
    )
}

export default Filters