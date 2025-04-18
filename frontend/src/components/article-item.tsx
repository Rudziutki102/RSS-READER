import { format } from "date-fns"
import { Bookmark, BookmarkCheck } from "lucide-react"
import { useFavorites } from '../hooks/feed-item-hooks';
import { FeedItem } from "../types/feeds-types";
import { HTMLAttributes } from "react";
type ArticleItemProps = {
    feed: FeedItem
} & HTMLAttributes<HTMLDivElement>

const ArticleItem = ({ feed, ...rest }: ArticleItemProps) => {
    const { favourites, handleFavouriteClick } = useFavorites()
    const isFav = favourites[feed.guid];
    const Icon = isFav ? BookmarkCheck : Bookmark;
    return (
        <div
            {...rest}
            className="my-4 relative group p-4 border rounded shadow-sm cursor-pointer bg-white dark:bg-gray-800 dark:border-gray-700">
            <Icon
                onClick={(e) => handleFavouriteClick(e, feed.guid)}
                className="absolute z-10 top-5 right-5 duration-150 md:opacity-0  md:group-hover:opacity-100" />
            <p>{format(new Date(feed.isoDate), 'dd/MM/yyyy')}</p>
            <h3 className="font-semibold text-lg">{feed.title}</h3>
            <p className="text-md text-gray-600 dark:text-gray-300">{feed.description}</p>
        </div>)
}

export default ArticleItem