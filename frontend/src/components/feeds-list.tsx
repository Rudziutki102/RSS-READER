import { lazy } from "react"
import { useFeedList } from "../hooks/feed-hooks"
import { FeedItem } from "../types/feeds-types"
import { useState } from "react"
import { useDebouncedFilterValue } from "../hooks/filter-hooks"
import { LoaderCircle } from "lucide-react"
import { useFeedProvdersStore } from "../store/use-feed-store"
import { Virtuoso } from 'react-virtuoso'
import Filters from "./filters"
import ArticleItem from "./article-item"
const NewsModal = lazy(() => import('./news-preview-modal'))
const FeedsList = () => {
    const selectedFeed = useFeedProvdersStore(state => state.selectedFeed)
    const { data, isLoading } = useFeedList(selectedFeed)
    const { filteredData, debounced, filterFavorites, toggleFavouritesFilter, filterRead, toggleReadFilter } = useDebouncedFilterValue(data?.items || [])
    const markAsRead = useFeedProvdersStore(state => state.markAsRead)
    const [selectedNews, setSelectedNews] = useState<FeedItem | null>(null)
    return (
        <>
            <h2 className="text-xl font-semibold mb-4">Subscribed Feeds</h2>
            <div className="flex">
                <Filters filterFavorites={filterFavorites} filterRead={filterRead} toggleFavouritesFilter={toggleFavouritesFilter} toggleReadFilter={toggleReadFilter} debounced={debounced} />

            </div>
            <section className="flex-1 overflow-y-auto mt-6">
                <div className="space-y-4 h-full">
                    {isLoading ? (
                        <div className="flex justify-center items-center h-full">
                            <LoaderCircle className="dark:text-white size-24 animate-spin" />
                        </div>
                    ) : null}
                    {filteredData.length === 0 && !isLoading ? (
                        <div className="flex justify-center items-center h-full">
                            <p className="text-gray-500 dark:text-gray-400">No feeds available</p>
                        </div>
                    ) : null}
                    {filteredData.length > 0 ? (
                        <Virtuoso className="h-full" data={filteredData} itemContent={(_, feed) => {
                            return (
                                <ArticleItem feed={feed} onClick={() => {
                                    markAsRead(feed.guid)
                                    setSelectedNews(feed)
                                }
                                } />
                            )
                        }} />
                    ) : null}
                    <NewsModal feed={selectedNews} onClose={() => setSelectedNews(null)} />
                </div>
            </section>
        </>
    )
}

export default FeedsList