import { useQuery } from '@tanstack/react-query'
import { fetchCurrencyRates } from '@/services/currencyService'
import {
  QUERY_KEYS,
  RATES_RETRY_COUNT,
  type CurrencyValue,
} from '@/constants'

const PLACEHOLDER_RATES: Record<CurrencyValue, number> = {
  UAH: 1,
  USD: 0.024,
  EUR: 0.022,
}

export function useCurrencyRates() {
  return useQuery({
    queryKey: [...QUERY_KEYS.CURRENCY_RATES],
    queryFn: fetchCurrencyRates,
    retry: RATES_RETRY_COUNT,
    placeholderData: PLACEHOLDER_RATES,
  })
}
