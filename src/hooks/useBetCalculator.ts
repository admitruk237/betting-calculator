import { useState, useMemo, type ChangeEvent } from 'react'
import {
  GAME_TYPES,
  BET_LIMITS,
  DEFAULT_CURRENCY,
  isCurrencyValue,
  formatGameTypeLabel,
  type GameTypeValue,
  type CurrencyValue,
} from '@/constants'
import type { FormData, FormErrors, BetResult, BetRecord } from '@/types/bet'
import { validate } from '@/utils/validate'
import { formatDate } from '@/utils/formatDate'
import { calculateBetResult } from '@/utils/calculateBetResult'
import { useCurrencyRates } from './useCurrencyRates'
import { useBetHistory } from './useBetHistory'

export function useBetCalculator() {
  const [formData, setFormData] = useState<FormData>({
    betAmount: '',
    coefficient: '',
    gameType: '',
    currency: DEFAULT_CURRENCY,
  })

  const [errors, setErrors] = useState<FormErrors>({})

  const { data: rates = {} as Partial<Record<CurrencyValue, number>> } =
    useCurrencyRates()

  const { history, addRecord, clearHistory } = useBetHistory()

  const result = useMemo<BetResult | null>(() => {
    const amount = parseFloat(formData.betAmount)
    const coeff = parseFloat(formData.coefficient)

    if (
      isNaN(amount) ||
      isNaN(coeff) ||
      amount <= 0 ||
      amount > BET_LIMITS.MAX_AMOUNT ||
      coeff < BET_LIMITS.MIN_COEFFICIENT ||
      coeff > BET_LIMITS.MAX_COEFFICIENT
    ) {
      return null
    }

    return calculateBetResult(amount, coeff, formData.currency)
  }, [formData.betAmount, formData.coefficient, formData.currency])

  const updateStateAndValidate = (
    updates: Partial<FormData>,
    fieldToUpdateError?: keyof FormData,
  ) => {
    const next = { ...formData, ...updates }
    const newErrors = validate(next)

    setFormData(next)
    setErrors((prevErrors) => {
      const nextErrors = { ...prevErrors }
      if (fieldToUpdateError) {
        nextErrors[fieldToUpdateError as keyof FormErrors] =
          newErrors[fieldToUpdateError as keyof FormErrors]
      } else {
        Object.keys(updates).forEach((key) => {
          const k = key as keyof FormErrors
          nextErrors[k] = newErrors[k]
        })
      }
      return nextErrors
    })
  }

  const setFieldValue = (name: keyof FormData, value: string) => {
    if (name === 'currency' && formData.betAmount && isCurrencyValue(value)) {
      const amount = parseFloat(formData.betAmount)
      if (!isNaN(amount)) {
        const oldRate = rates[formData.currency]
        const newRate = rates[value]

        if (oldRate && newRate) {
          const convertedAmount = (amount / oldRate) * newRate
          updateStateAndValidate({
            betAmount: convertedAmount.toFixed(2),
            currency: value,
          })
          return
        }
      }
    }

    updateStateAndValidate({ [name]: value }, name)
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
    const gameTypeConfig = GAME_TYPES.find((g) => g.value === gameType)
    const gameLabel = gameTypeConfig ? formatGameTypeLabel(gameTypeConfig) : gameType

    const { win, profit, currencySymbol } = calculateBetResult(
      amount,
      coeff,
      formData.currency,
    )

    const record: BetRecord = {
      id: Date.now(),
      date: formatDate(new Date()),
      amount,
      coefficient: coeff,
      gameType,
      gameLabel,
      potentialWin: win,
      profit,
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
