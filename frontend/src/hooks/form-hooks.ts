import { useCallback, useState } from "react";
import { useFeedProvdersStore } from "../store/use-feed-store";
import { toast } from "react-hot-toast"
export const useForm = () => {
    const [link, setLink] = useState("")
    const addFeed = useFeedProvdersStore(state => state.addFeed)
    const feeds = useFeedProvdersStore(state => state.feeds)
    const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        setLink(e.target.value);
    }, [setLink])
    const submitHandler = useCallback((e: React.ChangeEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (!link) {
            toast.error("Please enter a feed URL")
            return
        }
        if (feeds.some(feed => feed.feedUrl === link)) {
            toast.error("Feed already exists")
            return
        }
        addFeed({ feedUrl: link, title: link })
        setLink("")
    }, [addFeed, link, setLink, feeds])
    return { link, handleChange, submitHandler }
}