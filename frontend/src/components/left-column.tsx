import { Menu, X } from "lucide-react"
import { useEditColumn } from "../hooks/edit-column-hooks";
import { useState } from "react";

const LeftColumn = () => {
    const [isOpen, setIsOpen] = useState(false)
    const { feeds, editMode, editFeedUrl, newTitle, handleSaveEdit, setSelectedFeed, setEditMode, setNewTitle, handleEditFeed, removeFeed } = useEditColumn()
    const Icon = isOpen ? X : Menu
    return (
        <>
            <Icon
                onClick={() => setIsOpen(!isOpen)}
                className={`absolute top-4 right-3 z-20 bg-gray-900 text-white p-2 rounded size-12 md:hidden`} />
            <aside className={`absolute md:static h-full md:translate-0 bg-white dark:bg-gray-900 z-10 md:w-1/5 border-r border-gray-300 dark:border-gray-700 p-4 overflow-y-auto w-4/5  ${isOpen ? '-translate-0' : '-translate-x-full'} duration-150 ease-in-out`}>
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-bold">Feeds</h2>
                </div>
                <ul className="space-y-2">
                    {feeds.length > 0 ? feeds.map((provider) => (
                        <li
                            onClick={() => setSelectedFeed(provider)}
                            key={provider.feedUrl}
                            className="break-words whitespace-normal p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer flex justify-between items-center"
                        >
                            {editMode && editFeedUrl === provider.feedUrl ? (
                                <div className="flex space-x-2 items-center">
                                    <input
                                        type="text"
                                        value={newTitle}
                                        onChange={(e) => setNewTitle(e.target.value)}
                                        className="border rounded px-2 py-1 text-black dark:text-white"
                                    />
                                    <button
                                        onClick={handleSaveEdit}
                                        className="bg-blue-500 text-white px-2 py-1 rounded"
                                    >
                                        Save
                                    </button>
                                    <button
                                        onClick={() => setEditMode(false)}
                                        className="text-gray-500"
                                    >
                                        Cancel
                                    </button>
                                </div>
                            ) : (
                                <span className="max-w-3/4">{provider.title}</span>
                            )}
                            <div className="flex items-center space-x-2">
                                <X
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        removeFeed(provider.feedUrl);
                                    }}
                                    className="cursor-pointer text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
                                />
                                {!editMode ? (
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            handleEditFeed(provider.feedUrl, provider.title);
                                        }}
                                        className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
                                    >
                                        Edit
                                    </button>
                                ) : null}

                            </div>
                        </li>
                    )) : null}
                </ul>
            </aside>
        </>
    );
};

export default LeftColumn