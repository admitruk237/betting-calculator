import type { BetRecord } from '@/types/bet'
import { Card } from '@/components/Card/Card'
import { Button } from '@/components/Button/Button'
import { BetHistoryItem } from '@/components/BetHistoryItem/BetHistoryItem'
import styles from './BetHistory.module.css'

type Props = {
  history: BetRecord[]
  onClear: () => void
}

export const BetHistory = ({ history, onClear }: Props) => {
  const clearButton = history.length > 0 && (
    <Button
      id="clear-history"
      variant="destructive"
      onClick={onClear}
    >
      Очистити
    </Button>
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
