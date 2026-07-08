import type { CurrencyValue } from './currencies'

export const BET_LIMITS = {
  MAX_AMOUNT: 100_000,
  MIN_COEFFICIENT: 1.1,
  MAX_COEFFICIENT: 1000,
} as const

export const DEFAULT_CURRENCY: CurrencyValue = 'UAH'

export const FALLBACK_CURRENCY_SYMBOL = '₴'
