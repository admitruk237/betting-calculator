import type { ChangeEvent, FormEvent } from 'react'
import type { FormData, FormErrors } from '@/types/bet'
import { Card, Button, TextField, SelectField } from '@/components/ui'
import { GAME_TYPES, CURRENCIES } from '@/constants'
import { useCurrencyRates } from '@/hooks'
import styles from './BetForm.module.css'

type Props = {
  formData: FormData
  errors: FormErrors
  onChange: (e: ChangeEvent<HTMLInputElement>) => void
  onFieldChange: (name: keyof FormData, value: string) => void
  onSubmit: () => void
}

export const BetForm = ({
  formData,
  errors,
  onChange,
  onFieldChange,
  onSubmit,
}: Props) => {
  const { isLoading: isRatesLoading, isError: isRatesError } =
    useCurrencyRates()
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    onSubmit()
  }

  return (
    <Card title="Нова ставка">
      <form
        className={styles.formContainer}
        onSubmit={handleSubmit}
      >
        <TextField
          id="betAmount"
          label="Сума ставки"
          name="betAmount"
          type="number"
          min="0"
          step={0.01}
          value={formData.betAmount}
          onChange={onChange}
          error={errors.betAmount}
          placeholder="Наприклад: 500"
        />

        <SelectField
          id="currency"
          label={isRatesLoading ? 'Оновлення курсів валют...' : 'Валюта'}
          value={formData.currency}
          onValueChange={(val) => onFieldChange('currency', val)}
          options={CURRENCIES}
          error={
            isRatesError ? 'Курси недоступні, використовуйте UAH' : undefined
          }
          disabled={isRatesLoading}
        />

        <TextField
          id="coefficient"
          label="Коефіцієнт"
          name="coefficient"
          type="number"
          min="0"
          value={formData.coefficient}
          onChange={onChange}
          error={errors.coefficient}
          placeholder="Наприклад: 2.5"
          step={0.01}
        />

        <SelectField
          id="gameType"
          label="Тип гри"
          value={formData.gameType}
          onValueChange={(val) => onFieldChange('gameType', val)}
          options={GAME_TYPES}
          placeholder="Оберіть тип гри..."
          error={errors.gameType}
        />

        <Button
          id="submit-bet"
          type="submit"
          style={{ marginTop: '4px' }}
        >
          Розрахувати та зберегти
        </Button>
      </form>
    </Card>
  )
}
