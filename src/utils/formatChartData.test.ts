import { describe, it, expect } from 'vitest'
import { formatChartData, getChartColor } from '@/utils/formatChartData'
import type { BetRecord } from '@/types/bet'
import type { ChartDataItem } from '@/utils/formatChartData'

describe('Формування даних для графіку', () => {
  it('Повертає порожній масив для порожньої історії', () => {
    const history: BetRecord[] = []
    const result = formatChartData(history)
    expect(result).toEqual([])
  })
  it('Повертає відсортовані дані в зворотньому порядку', () => {
    const history: BetRecord[] = [
      {
        id: 1,
        date: '2022-01-01',
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
        date: '2022-01-02',
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
        date: '2022-01-03',
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

    const result = formatChartData(history)
    expect(result).toEqual([
      {
        name: '#1',
        profit: 100,
        originalProfit: 100,
        symbol: '₴',
      },
      {
        name: '#2',
        profit: 100,
        originalProfit: 100,
        symbol: '₴',
      },
      {
        name: '#3',
        profit: 100,
        originalProfit: 100,
        symbol: '₴',
      },
    ])
  })
})

describe('Визначення кольору графіка', () => {
  it('Повертає фіолетовий колір для порожнього масиву', () => {
    const data: ChartDataItem[] = []
    const result = getChartColor(data)
    expect(result).toBe('#8b5cf6')
  })
  it('Повертає зелений колір для всіх позитивних значень', () => {
    const data: ChartDataItem[] = [
      {
        name: '#1',
        profit: 100,
        originalProfit: 100,
        symbol: '₴',
      },
      {
        name: '#2',
        profit: 100,
        originalProfit: 100,
        symbol: '₴',
      },
      {
        name: '#3',
        profit: 100,
        originalProfit: 100,
        symbol: '₴',
      },
    ]
    const result = getChartColor(data)
    expect(result).toBe('#00ffa3')
  })
  it('Повертає червоний колір для всіх негативних значень', () => {
    const data: ChartDataItem[] = [
      {
        name: '#1',
        profit: -100,
        originalProfit: -100,
        symbol: '₴',
      },
      {
        name: '#2',
        profit: -100,
        originalProfit: -100,
        symbol: '₴',
      },
      {
        name: '#3',
        profit: -100,
        originalProfit: -100,
        symbol: '₴',
      },
    ]
    const result = getChartColor(data)
    expect(result).toBe('#ff4d4d')
  })
})
