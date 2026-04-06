import type { FormData, FormErrors } from '@/types/bet'

export const validate = (formData: FormData): FormErrors => {
  const errors: FormErrors = {}
  const amount = parseFloat(formData.betAmount)
  const coeff = parseFloat(formData.coefficient)

  if (!formData.betAmount || isNaN(amount)) {
    errors.betAmount = 'Введіть суму ставки'
  } else if (amount <= 0) {
    errors.betAmount = 'Сума повинна бути більше 0'
  } else if (amount > 100_000) {
    errors.betAmount = 'Максимум 100 000'
  }

  if (!formData.coefficient || isNaN(coeff)) {
    errors.coefficient = 'Введіть коефіцієнт'
  } else if (coeff < 1.01) {
    errors.coefficient = 'Мінімальний коефіцієнт 1.01'
  } else if (coeff > 1000) {
    errors.coefficient = 'Максимум 1000'
  }

  if (!formData.gameType) {
    errors.gameType = 'Оберіть тип гри'
  }

  return errors
}
