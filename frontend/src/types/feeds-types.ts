export type FeedProvider = {
    title:string,
    feedUrl:string,
}
export type FeedItem = {
    title: string;
    link: string;
    isoDate: string;
    content?: string;
    description?: string;
    guid:string
    enclosure?: {
        url: string;
        type: string;
    };
}