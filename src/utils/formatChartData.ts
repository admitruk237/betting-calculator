import type { BetRecord } from '@/types/bet'

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

export const formatChartData = (
  history: BetRecord[],
  rates: Record<string, number>,
): ChartDataItem[] => {
  const formattedData: ChartDataItem[] = [...history]
    .reverse()
    .map((bet, index) => {
      const rate = rates[bet.currency] || 1

      const normalizedProfit = parseFloat((bet.profit / rate).toFixed(2))

      const [fullDate, timeStr] = bet.date.split(', ')
      const dateStr = fullDate ? fullDate.substring(0, 5) : ''
      const gameIcon = bet.gameLabel.split(' ')[0]

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

  if (formattedData.length === 1 || formattedData.length === 2) {
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
