import { useEffect, useState } from 'react'
import { STORAGE_KEYS, THEME, THEME_TRANSITION_DURATION_MS } from '@/constants'

export const useThemeState = () => {
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

  const toggleTheme = () => {
    const nextIsDark = !isDark

    if (!document.startViewTransition) {
      setIsDark(nextIsDark)
      return
    }

    const originX = isDark ? 0 : window.innerWidth
    const originY = isDark ? window.innerHeight : 0
    const maxRadius = Math.hypot(window.innerWidth, window.innerHeight)

    const transition = document.startViewTransition(() => {
      setIsDark(nextIsDark)
    })

    transition.ready.then(() => {
      document.documentElement.animate(
        {
          clipPath: [
            `circle(0px at ${originX}px ${originY}px)`,
            `circle(${maxRadius}px at ${originX}px ${originY}px)`,
          ],
        },
        {
          duration: THEME_TRANSITION_DURATION_MS,
          easing: 'ease-in-out',
          pseudoElement: '::view-transition-new(root)',
        },
      )
    })
  }

  return { isDark, toggleTheme }
}
