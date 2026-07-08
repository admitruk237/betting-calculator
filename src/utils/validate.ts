import type { FormData, FormErrors } from '@/types/bet'
import { BET_LIMITS, VALIDATION_MESSAGES } from '@/constants'

export const validate = (formData: FormData): FormErrors => {
  const errors: FormErrors = {}
  const amount = parseFloat(formData.betAmount)
  const coeff = parseFloat(formData.coefficient)

  if (!formData.betAmount || isNaN(amount)) {
    errors.betAmount = VALIDATION_MESSAGES.AMOUNT_REQUIRED
  } else if (amount <= 0) {
    errors.betAmount = VALIDATION_MESSAGES.AMOUNT_POSITIVE
  } else if (amount > BET_LIMITS.MAX_AMOUNT) {
    errors.betAmount = VALIDATION_MESSAGES.AMOUNT_MAX
  }

  if (!formData.coefficient || isNaN(coeff)) {
    errors.coefficient = VALIDATION_MESSAGES.COEFFICIENT_REQUIRED
  } else if (coeff < BET_LIMITS.MIN_COEFFICIENT) {
    errors.coefficient = VALIDATION_MESSAGES.COEFFICIENT_MIN
  } else if (coeff > BET_LIMITS.MAX_COEFFICIENT) {
    errors.coefficient = VALIDATION_MESSAGES.COEFFICIENT_MAX
  }

  if (!formData.gameType) {
    errors.gameType = VALIDATION_MESSAGES.GAME_TYPE_REQUIRED
  }

  return errors
}
