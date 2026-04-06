import { useState, useEffect, useMemo, type ChangeEvent } from 'react'
import { GAME_TYPES, type GameTypeValue } from '@/constants/gameTypes'
import type { FormData, FormErrors, BetResult, BetRecord } from '@/types/bet'
import { validate } from '@/utils/validate'
import { formatDate } from '@/utils/formatDate'

const HISTORY_KEY = 'betHistory'
const MAX_HISTORY = 5

export function useBetCalculator() {
  const [formData, setFormData] = useState<FormData>({
    betAmount: '',
    coefficient: '',
    gameType: '',
  })

  const [errors, setErrors] = useState<FormErrors>({})

  const [history, setHistory] = useState<BetRecord[]>(() => {
    try {
      const saved = localStorage.getItem(HISTORY_KEY)
      return saved ? JSON.parse(saved) : []
    } catch {
      return []
    }
  })

  useEffect(() => {
    localStorage.setItem(HISTORY_KEY, JSON.stringify(history))
  }, [history])

  const result = useMemo<BetResult | null>(() => {
    const amount = parseFloat(formData.betAmount)
    const coeff = parseFloat(formData.coefficient)
    if (isNaN(amount) || isNaN(coeff) || amount <= 0 || coeff < 1.01)
      return null
    const win = amount * coeff
    return { win, profit: win - amount }
  }, [formData.betAmount, formData.coefficient])

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }))
    }
  }

  const handleSubmit = () => {
    const newErrors = validate(formData)
    setErrors(newErrors)
    if (Object.keys(newErrors).length > 0) return

    const amount = parseFloat(formData.betAmount)
    const coeff = parseFloat(formData.coefficient)
    const win = amount * coeff
    const gameType = formData.gameType as GameTypeValue
    const gameLabel =
      GAME_TYPES.find((g) => g.value === gameType)?.label ?? gameType

    const record: BetRecord = {
      id: Date.now(),
      date: formatDate(new Date()),
      amount,
      coefficient: coeff,
      gameType,
      gameLabel,
      potentialWin: win,
      profit: win - amount,
    }

    setHistory((prev) => [record, ...prev].slice(0, MAX_HISTORY))
  }

  const clearHistory = () => setHistory([])

  return {
    formData,
    errors,
    result,
    history,
    handleChange,
    handleSubmit,
    clearHistory,
  }
}
