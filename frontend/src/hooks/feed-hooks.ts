import { useQuery } from "@tanstack/react-query"
import { FeedProvider } from "../types/feeds-types"

const fetchList = async(feed:FeedProvider | null) => {
    const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/rss/?url=${feed?.feedUrl}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    })
    if (!response.ok) {
        throw new Error('Network response was not ok')
    }
    return response.json()
}
export const useFeedList = (feed:FeedProvider | null)=>{
    return useQuery({
        queryKey: ['feedList',feed?.feedUrl],queryFn:()=>fetchList(feed),enabled:!!feed})
}