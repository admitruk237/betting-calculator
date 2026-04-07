import styles from './Header.module.css'
import { AnimatedIcon } from '@/components/ui/AnimatedIcon/AnimatedIcon'
import { ThemeToggle } from '@/components/ui/ThemeToggle/ThemeToggle'
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
          <h1 className={styles.heading}>Betting Calculator</h1>
        </div>
        <div className={styles.actions}>
          <ThemeToggle />
        </div>
      </div>
    </header>
  )
}
