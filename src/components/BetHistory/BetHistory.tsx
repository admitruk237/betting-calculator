import type { BetRecord } from '@/types/bet'
import { BET_HISTORY_TEXTS, type CurrencyValue } from '@/constants'
import { Card, Button, EmptyState } from '@/components/ui'
import { BetHistoryItem } from '@/components/BetHistoryItem/BetHistoryItem'
import { BetChart } from '@/components/BetChart/BetChart'
import { useCurrencyRates } from '@/hooks'
import styles from './BetHistory.module.css'

type Props = {
  history: BetRecord[]
  onClear: () => void
}

export const BetHistory = ({ history, onClear }: Props) => {
  const { data: rates = {} as Partial<Record<CurrencyValue, number>> } =
    useCurrencyRates()
  const clearButton = history.length > 0 && (
    <Button
      id="clear-history"
      variant="destructive"
      onClick={onClear}
    >
      {BET_HISTORY_TEXTS.CLEAR}
    </Button>
  )

  return (
    <Card
      title={BET_HISTORY_TEXTS.CARD_TITLE}
      headerExtra={clearButton}
    >
      {history.length === 0 ? (
        <EmptyState message={BET_HISTORY_TEXTS.EMPTY} />
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
