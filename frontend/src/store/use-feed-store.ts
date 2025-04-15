import {create} from 'zustand';
import {persist} from 'zustand/middleware';
import { FeedProvider } from '../types/feeds-types';
type FeedsStore ={
  read: Record<string, boolean>;
  markAsRead:(guid:string)=>void,
  feeds:FeedProvider[],
  selectedFeed:FeedProvider | null,
  addFeed:(feed:FeedProvider)=>void,
  removeFeed:(feedUrl:string)=>void,
  setSelectedFeed:(feed:FeedProvider)=>void
  toggleFavorite:(guid : string)=>void
  favourites:Record<string,boolean>
  editFeed:(feedTitle:string,previousLink:string)=>void
}

export const useFeedProvdersStore = create<FeedsStore>()(
    persist(
      (set,get) => ({
        read: {},
        markAsRead: (guid) => {
          const updated = { ...get().read, [guid]: true };
          set({ read: updated });
        },
        feeds:[],
        selectedFeed:null,
        addFeed:(feed)=>{
          const currentFeeds = get().feeds
          set({
            feeds:[...currentFeeds,feed],
            selectedFeed:currentFeeds.length === 0 ? feed:get().selectedFeed
          })
        },
        editFeed: (feedTitle: string, previousLink: string) => {
          const updatedFeeds = get().feeds.map((feed) =>
            feed.feedUrl === previousLink ? { ...feed, title: feedTitle } : feed
          );
          set({
            feeds: updatedFeeds,
          });
        },
        removeFeed: (feedUrl: string) => {
          const currentFeeds = get().feeds.filter((feed) => feed.feedUrl !== feedUrl);
          set({
            feeds: currentFeeds,
            selectedFeed:currentFeeds[0] ?? null
          });
        },
        setSelectedFeed:(feed)=>set({
          selectedFeed:feed
        }),
        toggleFavorite:(guid)=>set((state)=>({
          favourites:{
              ...state.favourites,
              [guid]: state.favourites[guid] ? false : true,
          }
        })),
        favourites:{}
      }),
      {
        name: 'feed-providers',
      },
    ),
  )