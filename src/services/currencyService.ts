import {
  NBU_EXCHANGE_URL,
  API_ERROR_MESSAGES,
  type CurrencyValue,
} from '@/constants'

interface ExchangeRate {
  cc: string
  rate: number
}

const USD_CODE: CurrencyValue = 'USD'
const EUR_CODE: CurrencyValue = 'EUR'
const UAH_CODE: CurrencyValue = 'UAH'

export const fetchCurrencyRates = async (): Promise<
  Record<CurrencyValue, number>
> => {
  const response = await fetch(NBU_EXCHANGE_URL)

  if (!response.ok) {
    throw new Error(API_ERROR_MESSAGES.RATES_FETCH_FAILED)
  }

  const data: ExchangeRate[] = await response.json()

  const usd = data.find((item) => item.cc === USD_CODE)?.rate
  const eur = data.find((item) => item.cc === EUR_CODE)?.rate

  if (!usd || !eur) {
    throw new Error(API_ERROR_MESSAGES.RATES_UNAVAILABLE)
  }

  return {
    [USD_CODE]: 1 / usd,
    [EUR_CODE]: 1 / eur,
    [UAH_CODE]: 1,
  }
}
