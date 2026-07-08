import type { BetRecord } from '@/types/bet'
import { Card } from '@/components/ui'
import { BET_HISTORY_TEXTS } from '@/constants'
import styles from './BetHistoryItem.module.css'

type Props = {
  bet: BetRecord
}

export function BetHistoryItem({ bet }: Props) {
  return (
    <Card variant="secondary" className={styles.item}>
      <div className={styles.top}>
        <span className={styles.gameLabel}>{bet.gameLabel}</span>
        <span className={styles.date}>{bet.date}</span>
      </div>
      <div className={styles.bottom}>
        <span className={styles.amount}>
          {bet.currencySymbol}
          {bet.amount} × {bet.coefficient}
        </span>
        <span className={styles.win}>
          = {bet.currencySymbol}
          {bet.potentialWin.toFixed(2)}
        </span>
      </div>
      <div className={styles.profit}>
        {BET_HISTORY_TEXTS.PROFIT_LABEL}{' '}
        <strong>
          +{bet.currencySymbol}
          {bet.profit.toFixed(2)}
        </strong>
      </div>
    </Card>
  )
}
