import {create} from 'zustand';
import {persist} from 'zustand/middleware';
type ThemeStoreState ={
    darkMode:boolean,
    setTheme(value:boolean):void
}

export const useThemeStore = create<ThemeStoreState>()(
    persist(
      (set) => ({
        darkMode:false,
        setTheme:(value)=>set({darkMode:value})
      }),
      {
        name: 'theme-mode',
      },
    ),
  )