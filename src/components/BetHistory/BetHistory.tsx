import type { BetRecord } from '../../types/bet'
import { BetHistoryItem } from '../BetHistoryItem/BetHistoryItem'
import styles from './BetHistory.module.css'

type Props = {
  history: BetRecord[]
  onClear: () => void
}

export const BetHistory = ({ history, onClear }: Props) => {
  if (history.length === 0) {
    return (
      <div className={styles.container}>
        <h2 className={styles.title}>Останні ставки</h2>
        <div className={styles.empty}>
          <span className={styles.emptyIcon}>📋</span>
          <p>Історія порожня</p>
        </div>
      </div>
    )
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2 className={styles.title}>Останні ставки</h2>
        <button
          id="clear-history"
          className={styles.clearButton}
          onClick={onClear}
        >
          Очистити
        </button>
      </div>
      <div className={styles.list}>
        {history.map((bet) => (
          <BetHistoryItem
            key={bet.id}
            bet={bet}
          />
        ))}
      </div>
    </div>
  )
}
