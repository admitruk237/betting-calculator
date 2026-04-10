import { useEffect, useState, type ReactNode } from 'react'
import { ThemeContext } from './ThemeContext'

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [isDark, setIsDark] = useState<boolean>(() => {
    const stored = localStorage.getItem('theme-is-dark')
    if (stored !== null) return stored === 'true'

    return window.matchMedia('(prefers-color-scheme: dark)').matches
  })

  useEffect(() => {
    const themeName = isDark ? 'dark' : 'light'

    document.documentElement.setAttribute('data-theme', themeName)

    localStorage.setItem('theme-is-dark', isDark.toString())
  }, [isDark])

  const toggleTheme = () => setIsDark((prev) => !prev)

  return (
    <ThemeContext.Provider value={{ isDark, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}
