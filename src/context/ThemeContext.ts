import { createContext, useContext } from 'react'

export type ThemeContextType = {
  isDark: boolean
  toggleTheme: () => void
}

export const ThemeContext = createContext<ThemeContextType | undefined>(
  undefined,
)

export const useTheme = () => {
  const context = useContext(ThemeContext)

  return context
}
