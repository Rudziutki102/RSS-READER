import { useEffect } from "react"
import { useThemeStore } from "../store/use-theme-store"

export const useDarkMode = ()=>{
    const darkMode = useThemeStore(state=>state.darkMode)
    const setDarkMode = useThemeStore(state=>state.setTheme)
    useEffect(() => {
      if(darkMode){
        document.documentElement.classList.add('dark')
      }else{
        document.documentElement.classList.remove('dark')
    }
    }, [darkMode])
    
    return {darkMode,setDarkMode}
}