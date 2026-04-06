import styles from './Header.module.css'
import { AnimatedIcon } from '@/components/ui/AnimatedIcon/AnimatedIcon'
import casinoChip from '@/assets/icons/casino-chip.json'

export const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles.headerInner}>
        <AnimatedIcon
          src={casinoChip}
          trigger="loop"
          size={48}
        />
        <div className={styles.content}>
          <h1 className={styles.heading}>Betting Calculator</h1>
          <p className={styles.subheading}>
            Розрахунок ставок та аналіз прибутку
          </p>
        </div>
      </div>
    </header>
  )
}
