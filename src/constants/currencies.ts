export const CURRENCIES = [
  { value: 'UAH', label: '₴ Гривня', symbol: '₴' },
  { value: 'USD', label: '$ Долар',  symbol: '$' },
  { value: 'EUR', label: '€ Євро',   symbol: '€' },
] as const

export type CurrencyValue = (typeof CURRENCIES)[number]['value']

export const isCurrencyValue = (value: string): value is CurrencyValue =>
  CURRENCIES.some((currency) => currency.value === value)
