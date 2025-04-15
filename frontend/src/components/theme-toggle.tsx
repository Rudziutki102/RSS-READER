import { Moon, Sun } from "lucide-react"
import { useDarkMode } from "../hooks/theme-switcher"

const ThemeToggle = () => {
  const { darkMode, setDarkMode } = useDarkMode()
  return (
    <button
      onClick={() => setDarkMode(!darkMode)}
      className="fixed bottom-4 right-4 z-50 p-3 rounded-full shadow-lg bg-white dark:bg-gray-800 text-black dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
      aria-label="Toggle Theme"
    >
      {darkMode ? <Sun size={20} /> : <Moon size={20} />}
    </button>
  )
}

export default ThemeToggle