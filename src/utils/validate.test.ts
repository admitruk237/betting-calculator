import { describe, it, expect } from 'vitest'
import { validate } from './validate'
import type { FormData } from '@/types/bet'

describe('Валідація форми вставки', () => {
  it('Повертає помилки для невалідних даних', () => {
    const formData: FormData = {
      betAmount: '',
      coefficient: '',
      gameType: '',
      currency: 'UAH',
    }
    const errors = validate(formData)
    expect(errors).toEqual({
      betAmount: 'Введіть суму ставки',
      coefficient: 'Введіть коефіцієнт',
      gameType: 'Оберіть тип гри',
    })
  })

  it('Повинна бути валідною для правильних даних', () => {
    const validData: FormData = {
      betAmount: '100',
      coefficient: '2',
      gameType: 'football',
      currency: 'UAH',
    }

    const result = validate(validData)

    expect(Object.keys(result).length).toBe(0)
  })
  it('Повинна повертати помилку для суми більше 100000', () => {
    const formData: FormData = {
      betAmount: '100001',
      coefficient: '2',
      gameType: 'football',
      currency: 'UAH',
    }
    const errors = validate(formData)
    expect(errors.betAmount).toBe('Максимум 100 000')
  })
  it('Повинна повертати помилку якщо коефіцієнт менше 1.01', () => {
    const formData: FormData = {
      betAmount: '100',
      coefficient: '1.00',
      gameType: 'football',
      currency: 'UAH',
    }
    const errors = validate(formData)
    expect(errors.coefficient).toBe('Мінімальний коефіцієнт 1.01')
  })
  it('Повинна повертати помилку якщо коефіцієнт більше 1000', () => {
    const formData: FormData = {
      betAmount: '100',
      coefficient: '1001',
      gameType: 'football',
      currency: 'UAH',
    }
    const errors = validate(formData)
    expect(errors.coefficient).toBe('Максимум 1000')
  })
  it('Повинна повертати помилку якщо тип гри не обрано', () => {
    const formData: FormData = {
      betAmount: '100',
      coefficient: '2',
      gameType: '',
      currency: 'UAH',
    }
    const errors = validate(formData)
    expect(errors.gameType).toBe('Оберіть тип гри')
  })
  it('Повинна повертати помилку якщо сума не є числом', () => {
    const formData: FormData = {
      betAmount: 'abc',
      coefficient: '2',
      gameType: 'football',
      currency: 'UAH',
    }
    const errors = validate(formData)
    expect(errors.betAmount).toBe('Введіть суму ставки')
  })
  it('Повинна повертати помилку якщо коефіцієнт не є числом', () => {
    const formData: FormData = {
      betAmount: '100',
      coefficient: 'abc',
      gameType: 'football',
      currency: 'UAH',
    }
    const errors = validate(formData)
    expect(errors.coefficient).toBe('Введіть коефіцієнт')
  })
})
