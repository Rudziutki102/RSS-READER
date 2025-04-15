import { useFeedProvdersStore } from "../store/use-feed-store";

export const useFavorites = () =>{
    const favourites = useFeedProvdersStore(state => state.favourites);
    const toggleFavourite = useFeedProvdersStore(state => state.toggleFavorite);
    const handleFavouriteClick = (e:React.MouseEvent, guid:string) => {
      e.stopPropagation();
      toggleFavourite(guid);
    };
  
    return { favourites, handleFavouriteClick };
  }
export const useMarkAsRead = () => {
  const markAsRead = useFeedProvdersStore(state => state.markAsRead);

  const handleMarkAsRead = (guid:string) => {
    markAsRead(guid);
  };

  return handleMarkAsRead;
}