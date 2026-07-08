import { type ReactNode } from 'react'
import { ThemeContext } from './ThemeContext'
import { useThemeState } from '@/hooks'

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const { isDark, toggleTheme } = useThemeState()

  return (
    <ThemeContext.Provider value={{ isDark, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}
