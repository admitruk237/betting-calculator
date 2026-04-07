import styles from './BetChart.module.css'

type PayloadItem = {
  value: number
  payload: {
    symbol: string
    originalProfit: number
  }
}

type Props = {
  active?: boolean
  payload?: PayloadItem[]
}

export const ChartTooltip = ({ active, payload }: Props) => {
  if (active && payload && payload.length) {
    const { originalProfit, symbol } = payload[0].payload
    const isPositive = originalProfit >= 0

    return (
      <div className={styles.tooltip}>
        <span
          className={
            isPositive ? styles.tooltipPositive : styles.tooltipNegative
          }
        >
          {isPositive ? '+' : ''}
          {symbol}
          {originalProfit.toFixed(2)}
        </span>
        <span className={styles.tooltipLabel}>прибуток</span>
      </div>
    )
  }
  return null
}
