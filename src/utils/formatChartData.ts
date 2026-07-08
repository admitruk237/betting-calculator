import type { BetRecord } from '@/types/bet'
import { GAME_TYPES, type CurrencyValue } from '@/constants'

export type ChartDataItem = {
  name: string
  profit: number
  originalProfit: number
  symbol: string
  gameIcon?: string
  dateStr?: string
  timeStr?: string
  betData?: BetRecord
}

const DATE_SHORT_LENGTH = 5
const MIN_CHART_POINTS = 3

export const formatChartData = (
  history: BetRecord[],
  rates: Partial<Record<CurrencyValue, number>>,
): ChartDataItem[] => {
  const formattedData: ChartDataItem[] = [...history]
    .reverse()
    .map((bet, index) => {
      const rate = rates[bet.currency] || 1

      const normalizedProfit = parseFloat((bet.profit / rate).toFixed(2))

      const [fullDate, timeStr] = bet.date.split(', ')
      const dateStr = fullDate ? fullDate.substring(0, DATE_SHORT_LENGTH) : ''
      const gameIcon = GAME_TYPES.find((g) => g.value === bet.gameType)?.icon ?? ''

      return {
        name: `#${index + 1}`,
        profit: normalizedProfit,
        originalProfit: bet.profit,
        symbol: bet.currencySymbol,
        gameIcon,
        dateStr,
        timeStr,
        betData: bet,
      }
    })

  if (formattedData.length > 0 && formattedData.length < MIN_CHART_POINTS) {
    formattedData.unshift({
      name: '',
      profit: 0,
      originalProfit: 0,
      symbol: formattedData[0].symbol,
      gameIcon: '',
      dateStr: '',
      timeStr: '',
    })
  }

  return formattedData
}
