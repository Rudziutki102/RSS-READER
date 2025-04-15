import { useCallback, useState } from "react";
import { useFeedProvdersStore } from "../store/use-feed-store";

export const useEditColumn = ()=>{
    const feeds = useFeedProvdersStore(state => state.feeds);
    const setSelectedFeed = useFeedProvdersStore(state => state.setSelectedFeed);
    const removeFeed = useFeedProvdersStore(state => state.removeFeed);
    const editFeed = useFeedProvdersStore(state => state.editFeed);

    const [editMode, setEditMode] = useState(false); 
    const [newTitle, setNewTitle] = useState<string>(''); 
    const [editFeedUrl, setEditFeedUrl] = useState<string>('');

    const handleEditFeed = useCallback((feedUrl: string, currentTitle: string) => {
        setEditFeedUrl(feedUrl);
        setNewTitle(currentTitle);
        setEditMode(true); 
    },[setEditFeedUrl,setNewTitle,setEditMode]);
    const handleSaveEdit = useCallback(() => {
        if (newTitle.trim()) {
            editFeed(newTitle, editFeedUrl); 
            setEditMode(false);
            setNewTitle('');
        }
    },[editFeed,setEditMode,setNewTitle,newTitle,editFeedUrl]);
    return{handleSaveEdit,handleEditFeed,editMode,setEditMode,feeds,setSelectedFeed,removeFeed,newTitle,setNewTitle,editFeedUrl}
}