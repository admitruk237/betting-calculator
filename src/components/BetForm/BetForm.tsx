import type { ChangeEvent } from 'react'
import type { FormData, FormErrors } from '@/types/bet'
import { Card } from '@/components/Card/Card'
import { Button } from '@/components/Button/Button'
import { TextField } from '@/components/TextField/TextField'
import { SelectField } from '@/components/SelectField/SelectField'
import { GAME_TYPES } from '@/constants/gameTypes'
import { CURRENCIES } from '@/constants/currencies'
import { useCurrencyRates } from '@/hooks/useCurrencyRates'
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
  const { isLoading: isRatesLoading, isError: isRatesError } = useCurrencyRates()
  return (
    <Card title="Нова ставка">
      <div className={styles.formContainer}>
        <TextField
          id="betAmount"
          label="Сума ставки"
          name="betAmount"
          type="number"
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
          onClick={onSubmit}
          style={{ marginTop: '4px' }}
        >
          Розрахувати та зберегти
        </Button>
      </div>
    </Card>
  )
}
