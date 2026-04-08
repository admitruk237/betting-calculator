import { useState, useMemo, type ChangeEvent } from 'react'
import { GAME_TYPES, CURRENCIES, type GameTypeValue } from '@/constants'
import type { FormData, FormErrors, BetResult, BetRecord } from '@/types/bet'
import { validate } from '@/utils/validate'
import { formatDate } from '@/utils/formatDate'
import { useCurrencyRates, useBetHistory } from '@/hooks'

export function useBetCalculator() {
  const [formData, setFormData] = useState<FormData>({
    betAmount: '',
    coefficient: '',
    gameType: '',
    currency: 'UAH',
  })

  const [errors, setErrors] = useState<FormErrors>({})

  const { data: rates = {} } = useCurrencyRates()

  const { history, addRecord, clearHistory } = useBetHistory()

  const result = useMemo<BetResult | null>(() => {
    const amount = parseFloat(formData.betAmount)
    const coeff = parseFloat(formData.coefficient)

    if (
      isNaN(amount) ||
      isNaN(coeff) ||
      amount <= 0 ||
      amount > 100_000 ||
      coeff < 1.01 ||
      coeff > 1000
    ) {
      return null
    }

    const currencySymbol =
      CURRENCIES.find((c) => c.value === formData.currency)?.symbol ?? '₴'

    const calculatedWin = amount * coeff

    return {
      win: calculatedWin,
      profit: calculatedWin - amount,
      currencySymbol,
    }
  }, [formData.betAmount, formData.coefficient, formData.currency])

  const setFieldValue = (name: keyof FormData, value: string) => {
    if (name === 'currency' && formData.betAmount) {
      const amount = parseFloat(formData.betAmount)
      if (!isNaN(amount)) {
        const oldRate = rates[formData.currency]
        const newRate = rates[value]

        if (oldRate && newRate) {
          const convertedAmount = (amount / oldRate) * newRate
          setFormData((prev) => ({
            ...prev,
            betAmount: convertedAmount.toFixed(2),
            currency: value as (typeof CURRENCIES)[number]['value'],
          }))
          return
        }
      }
    }

    setFormData((prev) => ({ ...prev, [name]: value }))
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }))
    }
  }

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target
    setFieldValue(name as keyof FormData, value)
  }

  const handleSubmit = () => {
    const newErrors = validate(formData)
    setErrors(newErrors)
    if (Object.keys(newErrors).length > 0) return

    const amount = parseFloat(formData.betAmount)
    const coeff = parseFloat(formData.coefficient)
    const gameType = formData.gameType as GameTypeValue
    const gameLabel =
      GAME_TYPES.find((g) => g.value === gameType)?.label ?? gameType

    const currencySymbol =
      CURRENCIES.find((c) => c.value === formData.currency)?.symbol ?? '₴'
    const win = amount * coeff

    const record: BetRecord = {
      id: Date.now(),
      date: formatDate(new Date()),
      amount,
      coefficient: coeff,
      gameType,
      gameLabel,
      potentialWin: win,
      profit: win - amount,
      currency: formData.currency,
      currencySymbol,
    }

    addRecord(record)
  }

  return {
    formData,
    errors,
    result,
    history,
    handleChange,
    setFieldValue,
    handleSubmit,
    clearHistory,
  }
}
