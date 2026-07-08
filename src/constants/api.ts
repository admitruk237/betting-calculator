export const NBU_EXCHANGE_URL = import.meta.env.VITE_NBU_EXCHANGE_URL

export const QUERY_KEYS = {
  CURRENCY_RATES: ['currencyRates'],
} as const

export const RATES_STALE_TIME_MS = 5 * 60 * 1000

export const RATES_RETRY_COUNT = 1
