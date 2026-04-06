import type { BetResult as BetResultType } from '../../types/bet'
import { GAME_TYPES } from '../../constants/gameTypes'
import type { GameTypeValue } from '../../constants/gameTypes'
import styles from './BetResult.module.css'

type Props = {
  result: BetResultType | null
  gameType: GameTypeValue | ''
}

export const BetResult = ({ result, gameType }: Props) => {
  const gameLabel = GAME_TYPES.find((g) => g.value === gameType)?.label

  if (!result) {
    return (
      <div className={styles.card}>
        <div className={styles.placeholder}>
          <span className={styles.placeholderIcon}>🎯</span>
          <p>Введіть дані для розрахунку</p>
        </div>
      </div>
    )
  }

  return (
    <div className={`${styles.card} ${styles.active}`}>
      <h2 className={styles.title}>Результат</h2>
      {gameLabel && <div className={styles.gameLabel}>{gameLabel}</div>}
      <div className={styles.stats}>
        <div className={styles.stat}>
          <span className={styles.statLabel}>Потенційний виграш</span>
          <span className={`${styles.statValue} ${styles.win}`}>
            {result.win.toFixed(2)} ₴
          </span>
        </div>
        <div className={styles.divider} />
        <div className={styles.stat}>
          <span className={styles.statLabel}>Чистий прибуток</span>
          <span className={`${styles.statValue} ${styles.profit}`}>
            +{result.profit.toFixed(2)} ₴
          </span>
        </div>
      </div>
    </div>
  )
}
