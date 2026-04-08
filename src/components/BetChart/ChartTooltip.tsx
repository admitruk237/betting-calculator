import type { ChartDataItem } from '@/utils/formatChartData'
import styles from './BetChart.module.css'

type Props = {
  active?: boolean
  payload?: { payload: ChartDataItem }[]
}

export const ChartTooltip = ({ active, payload }: Props) => {
  if (active && payload && payload.length) {
    const data: ChartDataItem = payload[0].payload
    const { betData, gameIcon, dateStr, timeStr } = data

    if (!betData) return null

    return (
      <div className={styles.tooltip}>
        <div className={styles.tooltipHeader}>
          <span>{gameIcon}</span>
          <span>
            {dateStr} {timeStr}
          </span>
        </div>

        <div className={styles.tooltipRow}>
          <span>Ставка:</span>
          <span>
            {betData.currencySymbol}
            {betData.amount}
          </span>
        </div>

        <div className={styles.tooltipRow}>
          <span>Коефіцієнт:</span>
          <span>x{betData.coefficient}</span>
        </div>

        <div className={styles.tooltipRow}>
          <span>Виграш:</span>
          <span>
            {betData.currencySymbol}
            {betData.potentialWin}
          </span>
        </div>

        <div className={`${styles.tooltipRow} ${styles.profitRow}`}>
          <span>Прибуток:</span>
          <span>
            {betData.currencySymbol}
            {betData.profit.toFixed(2)}
          </span>
        </div>
      </div>
    )
  }
  return null
}
