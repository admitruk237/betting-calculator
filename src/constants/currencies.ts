export const CURRENCIES = [
  { value: 'UAH', label: '₴ Гривня', symbol: '₴', rate: 1 },
  { value: 'USD', label: '$ Долар',  symbol: '$', rate: 0.024 },
  { value: 'EUR', label: '€ Євро',   symbol: '€', rate: 0.022 },
] as const

export type CurrencyValue = (typeof CURRENCIES)[number]['value']
