import { useQuery } from '@tanstack/react-query'
import { fetchCurrencyRates } from '@/services/currencyService'

const INITIAL_RATES = {
  UAH: 1,
  USD: 0.024,
  EUR: 0.022,
}

export function useCurrencyRates() {
  return useQuery({
    queryKey: ['currencyRates'],
    queryFn: fetchCurrencyRates,
    retry: 1,
    placeholderData: INITIAL_RATES,
  })
}
