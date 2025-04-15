import { useForm } from "../hooks/form-hooks"
const FeedForm = () => {
    const { link, handleChange, submitHandler } = useForm()
    return (
        <div>
            <h1 className="text-2xl font-bold mb-6">Subscribe to a new RSS Feed</h1>
            <form className="space-y-4 mb-10" onSubmit={submitHandler}>
                <div>
                    <label className="block text-sm font-medium mb-1" htmlFor="feedUrl">Feed URL</label>
                    <input
                        id="feedUrl"
                        value={link}
                        onChange={handleChange}
                        type="url"
                        className="w-full px-4 py-2 rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="https://example.com/rss.xml"
                    />
                </div>
                <button
                    type="submit"
                    className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                    Add Feed
                </button>
            </form>
        </div>
    )
}

export default FeedForm