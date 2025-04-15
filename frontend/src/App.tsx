import FeedForm from "./components/feed-form";
import FeedsList from "./components/feeds-list";
import LeftColumn from "./components/left-column";
import { Toaster } from "react-hot-toast";

export default function App() {
  return (
    <div className={"flex h-screen dark:bg-gray-900 dark:text-white"}>
      <LeftColumn />
      <main className="flex-1 p-6 overflow-hidden">
        <div className="flex flex-col max-w-2xl mx-auto h-full">
          <FeedForm />
          <FeedsList />
        </div>
      </main>
      <Toaster />
    </div>
  );
}
