import type { BetRecord } from '../../types/bet'
import styles from './BetHistoryItem.module.css'

interface BetHistoryItemProps {
  bet: BetRecord
}

export function BetHistoryItem({ bet }: BetHistoryItemProps) {
  return (
    <div className={styles.item}>
      <div className={styles.top}>
        <span className={styles.gameLabel}>{bet.gameLabel}</span>
        <span className={styles.date}>{bet.date}</span>
      </div>
      <div className={styles.bottom}>
        <span className={styles.amount}>{bet.amount} ₴ × {bet.coefficient}</span>
        <span className={styles.win}>= {bet.potentialWin.toFixed(2)} ₴</span>
      </div>
      <div className={styles.profit}>
        Прибуток: <strong>+{bet.profit.toFixed(2)} ₴</strong>
      </div>
    </div>
  )
}
