import { useTheme } from '@/context/ThemeContext'
import { THEME_TOGGLE_TEXTS } from '@/constants'
import styles from './ThemeToggle.module.css'

export const ThemeToggle = () => {
  const { isDark, toggleTheme } = useTheme()
  const isLight = !isDark

  return (
    <button
      className={styles.toggle}
      onClick={toggleTheme}
      aria-label={
        isLight ? THEME_TOGGLE_TEXTS.ENABLE_DARK : THEME_TOGGLE_TEXTS.ENABLE_LIGHT
      }
      title={
        isLight ? THEME_TOGGLE_TEXTS.DARK_TITLE : THEME_TOGGLE_TEXTS.LIGHT_TITLE
      }
    >
      <span
        className={`${styles.thumb} ${isLight ? styles.thumbLight : styles.thumbDark}`}
      >
        {isLight ? '☀️' : '🌙'}
      </span>
    </button>
  )
}
