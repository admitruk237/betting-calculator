import { CURRENCIES, FALLBACK_CURRENCY_SYMBOL, type CurrencyValue } from '@/constants'
import type { BetResult } from '@/types/bet'

export const calculateBetResult = (
  amount: number,
  coefficient: number,
  currency: CurrencyValue,
): BetResult => {
  const currencySymbol =
    CURRENCIES.find((c) => c.value === currency)?.symbol ?? FALLBACK_CURRENCY_SYMBOL

  const win = amount * coefficient

  return {
    win,
    profit: win - amount,
    currencySymbol,
  }
}
