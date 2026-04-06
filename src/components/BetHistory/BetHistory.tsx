import type { BetRecord } from '../../types/bet'
import { Card } from '../Card/Card'
import { BetHistoryItem } from '../BetHistoryItem/BetHistoryItem'
import styles from './BetHistory.module.css'

type Props = {
  history: BetRecord[]
  onClear: () => void
}

export const BetHistory = ({ history, onClear }: Props) => {
  const clearButton = history.length > 0 && (
    <button
      id="clear-history"
      className={styles.clearButton}
      onClick={onClear}
    >
      Очистити
    </button>
  )

  return (
    <Card title="Останні ставки" headerExtra={clearButton}>
      {history.length === 0 ? (
        <div className={styles.empty}>
          <span className={styles.emptyIcon}>📋</span>
          <p>Історія порожня</p>
        </div>
      ) : (
        <div className={styles.list}>
          {history.map((bet) => (
            <BetHistoryItem
              key={bet.id}
              bet={bet}
            />
          ))}
        </div>
      )}
    </Card>
  )
}
