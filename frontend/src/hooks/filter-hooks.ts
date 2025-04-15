import { useCallback, useMemo, useState } from "react"
import {useDebouncedCallback} from 'use-debounce'
import { FeedItem } from "../types/feeds-types";
import { useFeedProvdersStore } from "../store/use-feed-store";

export const useDebouncedFilterValue = (feedList:FeedItem[])=>{
    const [filteredValue,setFilteredValue] = useState<string>('')
    const favourites = useFeedProvdersStore(state => state.favourites);
    const read = useFeedProvdersStore(state => state.read);
    const [filterFavorites,setFilterFavorites] = useState<boolean>(false)
    const [filterRead,setFilterRead] = useState<boolean>(false)
    const filteredData = useMemo(() => {
      if (!feedList) return []
      let sorted = feedList.sort(
          (a, b) => new Date(b.isoDate).getTime() - new Date(a.isoDate).getTime()
      )
      if (filteredValue.trim()) {
        sorted = sorted.filter(item =>
            item.title.toLowerCase().includes(filteredValue.toLowerCase())
        );
    }
    if (filterFavorites) {
        sorted = sorted.filter(item => favourites[item.guid]);
    }
    if (filterRead) {
        sorted = sorted.filter(item => !read[item.guid]);
    }
      return sorted
  }, [feedList, filteredValue,filterRead,filterFavorites,favourites,read])
  
  const toggleFavouritesFilter =useCallback(()=>{
    setFilterFavorites(!filterFavorites)
  },[filterFavorites])

  const toggleReadFilter =useCallback(()=>{
    setFilterRead(!filterRead)
  },[filterRead])

  const debounced = useDebouncedCallback((value) => {
        setFilteredValue(value);
  }, 500);
    return {filteredData,debounced,toggleReadFilter,toggleFavouritesFilter,filterFavorites,filterRead}
}