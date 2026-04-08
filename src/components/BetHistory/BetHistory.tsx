import type { BetRecord } from '@/types/bet'
import { Card } from '@/components/Card/Card'
import { Button } from '@/components/Button/Button'
import { BetHistoryItem } from '@/components/BetHistoryItem/BetHistoryItem'
import { BetChart } from '@/components/BetChart/BetChart'
import { EmptyState } from '@/components/ui/EmptyState/EmptyState'
import { useCurrencyRates } from '@/hooks/useCurrencyRates'
import styles from './BetHistory.module.css'

type Props = {
  history: BetRecord[]
  onClear: () => void
}

export const BetHistory = ({ history, onClear }: Props) => {
  const { data: rates = {} } = useCurrencyRates()
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
    <Card
      title="Останні ставки"
      headerExtra={clearButton}
    >
      {history.length === 0 ? (
        <EmptyState message="Історія порожня" />
      ) : (
        <div className={styles.list}>
          {history.map((bet) => (
            <BetHistoryItem
              key={bet.id}
              bet={bet}
            />
          ))}

          <BetChart
            history={history}
            rates={rates}
          />
        </div>
      )}
    </Card>
  )
}
