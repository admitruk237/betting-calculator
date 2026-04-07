import { useTheme } from '@/context/ThemeContext'
import styles from './ThemeToggle.module.css'

export const ThemeToggle = () => {
  const { isDark, toggleTheme } = useTheme()
  const isLight = !isDark

  return (
    <button
      className={styles.toggle}
      onClick={toggleTheme}
      aria-label={isLight ? 'Увімкнути темну тему' : 'Увімкнути світлу тему'}
      title={isLight ? 'Темна тема' : 'Світла тема'}
    >
      <span
        className={`${styles.thumb} ${isLight ? styles.thumbLight : styles.thumbDark}`}
      >
        {isLight ? '☀️' : '🌙'}
      </span>
    </button>
  )
}
