import { describe, it, expect } from 'vitest'
import { formatChartData } from '@/utils/formatChartData'
import type { BetRecord } from '@/types/bet'

describe('Формування даних для графіку', () => {
  it('Повертає порожній масив для порожньої історії', () => {
    const history: BetRecord[] = []
    const result = formatChartData(history, {})
    expect(result).toEqual([])
  })
  it('Повертає відсортовані дані в зворотньому порядку', () => {
    const history: BetRecord[] = [
      {
        id: 1,
        date: '01.01.2022, 12:00',
        amount: 100,
        coefficient: 2,
        gameType: 'football',
        gameLabel: 'Футбол',
        potentialWin: 200,
        profit: 100,
        currency: 'UAH',
        currencySymbol: '₴',
      },
      {
        id: 2,
        date: '02.01.2022, 12:00',
        amount: 100,
        coefficient: 2,
        gameType: 'football',
        gameLabel: 'Футбол',
        potentialWin: 200,
        profit: 100,
        currency: 'UAH',
        currencySymbol: '₴',
      },
      {
        id: 3,
        date: '03.01.2022, 12:00',
        amount: 100,
        coefficient: 2,
        gameType: 'football',
        gameLabel: 'Футбол',
        potentialWin: 200,
        profit: 100,
        currency: 'UAH',
        currencySymbol: '₴',
      },
    ]

    const result = formatChartData(history, {})
    expect(result).toEqual([
      {
        name: '#1',
        profit: 100,
        originalProfit: 100,
        symbol: '₴',
        gameIcon: '⚽',
        dateStr: '03.01',
        timeStr: '12:00',
        betData: history[2],
      },
      {
        name: '#2',
        profit: 100,
        originalProfit: 100,
        symbol: '₴',
        gameIcon: '⚽',
        dateStr: '02.01',
        timeStr: '12:00',
        betData: history[1],
      },
      {
        name: '#3',
        profit: 100,
        originalProfit: 100,
        symbol: '₴',
        gameIcon: '⚽',
        dateStr: '01.01',
        timeStr: '12:00',
        betData: history[0],
      },
    ])
  })
})
