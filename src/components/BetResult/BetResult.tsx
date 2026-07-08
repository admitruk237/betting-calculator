import type { BetResult as BetResultType } from '@/types/bet'
import {
  GAME_TYPES,
  formatGameTypeLabel,
  BET_RESULT_TEXTS,
  type GameTypeValue,
} from '@/constants'
import { Card, EmptyState } from '@/components/ui'
import styles from './BetResult.module.css'

type Props = {
  result: BetResultType | null
  gameType: GameTypeValue | ''
}

export const BetResult = ({ result, gameType }: Props) => {
  const gameTypeConfig = GAME_TYPES.find((g) => g.value === gameType)
  const gameLabel = gameTypeConfig ? formatGameTypeLabel(gameTypeConfig) : undefined

  return (
    <Card title={BET_RESULT_TEXTS.CARD_TITLE}>
      {!result ? (
        <EmptyState message={BET_RESULT_TEXTS.EMPTY} />
      ) : (
        <>
          {gameLabel && <div className={styles.gameLabel}>{gameLabel}</div>}
          <div className={styles.stats}>
            <Card variant="secondary">
              <div className={styles.statInner}>
                <span className={styles.statLabel}>
                  {BET_RESULT_TEXTS.POTENTIAL_WIN}
                </span>
                <span className={`${styles.statValue} ${styles.win}`}>
                  {result.currencySymbol}
                  {result.win.toFixed(2)}
                </span>
              </div>
            </Card>
            <div className={styles.divider} />
            <Card variant="secondary">
              <div className={styles.statInner}>
                <span className={styles.statLabel}>
                  {BET_RESULT_TEXTS.NET_PROFIT}
                </span>
                <span className={`${styles.statValue} ${styles.profit}`}>
                  +{result.currencySymbol}
                  {result.profit.toFixed(2)}
                </span>
              </div>
            </Card>
          </div>
        </>
      )}
    </Card>
  )
}
