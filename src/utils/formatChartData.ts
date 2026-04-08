import type { BetRecord } from '@/types/bet'

export type ChartDataItem = {
  name: string
  profit: number
  originalProfit: number
  symbol: string
}

export const formatChartData = (
  history: BetRecord[],
  rates: Record<string, number>
): ChartDataItem[] => {
  return [...history].reverse().map((bet, index) => {
    const rate = rates[bet.currency] || 1

    const normalizedProfit = parseFloat((bet.profit / rate).toFixed(2))

    return {
      name: `#${index + 1}`,
      profit: normalizedProfit,
      originalProfit: bet.profit,
      symbol: bet.currencySymbol,
    }
  })
}

export const getChartColor = (data: ChartDataItem[]): string => {
  if (data.length === 0) return '#8b5cf6'

  const allPositive = data.every((d) => d.profit >= 0)
  const allNegative = data.every((d) => d.profit < 0)

  if (allPositive) return '#00ffa3'
  if (allNegative) return '#ff4d4d'
  return '#8b5cf6'
}
