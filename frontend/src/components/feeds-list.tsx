import { lazy } from "react"
import { useFeedList } from "../hooks/feed-hooks"
import { FeedItem } from "../types/feeds-types"
import { format } from "date-fns"
import { motion } from "motion/react"
import { useState } from "react"
import { useDebouncedFilterValue } from "../hooks/filter-hooks"
import { Bookmark, BookmarkCheck, LoaderCircle } from "lucide-react"
import { useFeedProvdersStore } from "../store/use-feed-store"
import { useFavorites } from "../hooks/feed-item-hooks"
import Filters from "./filters"
const NewsModal = lazy(() => import('./news-preview-modal'))
const FeedsList = () => {
    const selectedFeed = useFeedProvdersStore(state => state.selectedFeed)
    const { data, isSuccess, isLoading } = useFeedList(selectedFeed)
    const { filteredData, debounced, filterFavorites, toggleFavouritesFilter, filterRead, toggleReadFilter } = useDebouncedFilterValue(data?.items || [])
    const { favourites, handleFavouriteClick } = useFavorites()
    const markAsRead = useFeedProvdersStore(state => state.markAsRead)
    const [selectedNews, setSelectedNews] = useState<FeedItem | null>(null)
    return (
        <>
            <h2 className="text-xl font-semibold mb-4">Subscribed Feeds</h2>
            <div className="flex">
                <Filters filterFavorites={filterFavorites} filterRead={filterRead} toggleFavouritesFilter={toggleFavouritesFilter} toggleReadFilter={toggleReadFilter} debounced={debounced} />

            </div>
            <section className="flex-1 overflow-y-auto mt-6">
                <div className="space-y-4 ">
                    {isLoading ? (
                        <LoaderCircle className="dark:text-white size-24 animate-spin" />
                    ) : null}
                    {data?.items?.length === 0 || !data ? (
                        <div className="flex justify-center items-center h-full">
                            <p className="text-gray-500 dark:text-gray-400">No feeds available</p>
                        </div>
                    ) : null}
                    {isSuccess && filteredData.map((feed: FeedItem, index: number) => {
                        const isFav = favourites[feed.guid];
                        const Icon = isFav ? BookmarkCheck : Bookmark;
                        return (
                            <motion.div
                                onClick={() => {
                                    markAsRead(feed.guid)
                                    setSelectedNews(feed)
                                }}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.2, delay: index * 0.05 }}
                                key={`${feed.title}-${index}`}
                                className="relative group p-4 border rounded shadow-sm cursor-pointer bg-white dark:bg-gray-800 dark:border-gray-700">
                                <Icon
                                    onClick={(e) => handleFavouriteClick(e, feed.guid)}
                                    className="absolute z-10 top-5 right-5 duration-150 md:opacity-0  md:group-hover:opacity-100" />
                                <p>{format(new Date(feed.isoDate), 'dd/MM/yyyy')}</p>
                                <h3 className="font-semibold text-lg">{feed.title}</h3>
                                <p className="text-md text-gray-600 dark:text-gray-300">{feed.description}</p>
                            </motion.div>
                        )
                    })}
                    <NewsModal feed={selectedNews} onClose={() => setSelectedNews(null)} />
                </div>
            </section>
        </>
    )
}

export default FeedsList