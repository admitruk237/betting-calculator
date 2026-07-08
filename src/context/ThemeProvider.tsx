import { useEffect, useState, type ReactNode } from 'react'
import { ThemeContext } from './ThemeContext'
import { STORAGE_KEYS, THEME } from '@/constants'

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [isDark, setIsDark] = useState<boolean>(() => {
    const stored = localStorage.getItem(STORAGE_KEYS.THEME_IS_DARK)
    if (stored !== null) return stored === 'true'

    return window.matchMedia('(prefers-color-scheme: dark)').matches
  })

  useEffect(() => {
    const themeName = isDark ? THEME.DARK : THEME.LIGHT

    document.documentElement.setAttribute(THEME.ATTRIBUTE, themeName)

    localStorage.setItem(STORAGE_KEYS.THEME_IS_DARK, isDark.toString())
  }, [isDark])

  const toggleTheme = () => setIsDark((prev) => !prev)

  return (
    <ThemeContext.Provider value={{ isDark, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}
