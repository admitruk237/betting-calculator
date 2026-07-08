import styles from './Header.module.css'
import { AnimatedIcon, ThemeToggle } from '@/components/ui'
import { HEADER_TEXTS } from '@/constants'
import casinoChip from '@/assets/icons/casino-chip.json'

export const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles.headerInner}>
        <AnimatedIcon
          src={casinoChip}
          trigger="loop"
          size={36}
        />
        <div className={styles.content}>
          <h1 className={styles.heading}>{HEADER_TEXTS.HEADING}</h1>
        </div>
        <div className={styles.actions}>
          <ThemeToggle />
        </div>
      </div>
    </header>
  )
}
