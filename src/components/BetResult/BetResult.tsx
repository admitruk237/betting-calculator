import type { BetResult as BetResultType } from '@/types/bet'
import { GAME_TYPES, type GameTypeValue } from '@/constants'
import { Card, EmptyState } from '@/components/ui'
import styles from './BetResult.module.css'

type Props = {
  result: BetResultType | null
  gameType: GameTypeValue | ''
}

export const BetResult = ({ result, gameType }: Props) => {
  const gameLabel = GAME_TYPES.find((g) => g.value === gameType)?.label

  return (
    <Card title="Результат">
      {!result ? (
        <EmptyState message="Введіть дані для розрахунку" />
      ) : (
        <>
          {gameLabel && <div className={styles.gameLabel}>{gameLabel}</div>}
          <div className={styles.stats}>
            <Card variant="secondary">
              <div className={styles.statInner}>
                <span className={styles.statLabel}>Потенційний виграш</span>
                <span className={`${styles.statValue} ${styles.win}`}>
                  {result.currencySymbol}
                  {result.win.toFixed(2)}
                </span>
              </div>
            </Card>
            <div className={styles.divider} />
            <Card variant="secondary">
              <div className={styles.statInner}>
                <span className={styles.statLabel}>Чистий прибуток</span>
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
