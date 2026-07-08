import type { ChangeEvent, FormEvent } from 'react'
import type { FormData, FormErrors } from '@/types/bet'
import { Card, Button, TextField, SelectField } from '@/components/ui'
import {
  GAME_TYPES,
  CURRENCIES,
  formatGameTypeLabel,
  BET_FORM_TEXTS,
} from '@/constants'
import { useCurrencyRates } from '@/hooks'
import styles from './BetForm.module.css'

const GAME_TYPE_OPTIONS = GAME_TYPES.map((gameType) => ({
  value: gameType.value,
  label: formatGameTypeLabel(gameType),
}))

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
    <Card title={BET_FORM_TEXTS.CARD_TITLE}>
      <form
        className={styles.formContainer}
        onSubmit={handleSubmit}
        noValidate
      >
        <TextField
          id="betAmount"
          label={BET_FORM_TEXTS.AMOUNT_LABEL}
          name="betAmount"
          type="number"
          min="0"
          step={0.01}
          value={formData.betAmount}
          onChange={onChange}
          error={errors.betAmount}
          placeholder={BET_FORM_TEXTS.AMOUNT_PLACEHOLDER}
        />
        <SelectField
          id="currency"
          label={
            isRatesLoading
              ? BET_FORM_TEXTS.CURRENCY_LOADING_LABEL
              : BET_FORM_TEXTS.CURRENCY_LABEL
          }
          value={formData.currency}
          onValueChange={(val) => onFieldChange('currency', val)}
          options={CURRENCIES}
          error={isRatesError ? BET_FORM_TEXTS.CURRENCY_ERROR : undefined}
          disabled={isRatesLoading}
        />
        <TextField
          id="coefficient"
          label={BET_FORM_TEXTS.COEFFICIENT_LABEL}
          name="coefficient"
          type="number"
          min="0"
          value={formData.coefficient}
          onChange={onChange}
          error={errors.coefficient}
          placeholder={BET_FORM_TEXTS.COEFFICIENT_PLACEHOLDER}
          step={0.01}
        />
        <SelectField
          id="gameType"
          label={BET_FORM_TEXTS.GAME_TYPE_LABEL}
          value={formData.gameType}
          onValueChange={(val) => onFieldChange('gameType', val)}
          options={GAME_TYPE_OPTIONS}
          placeholder={BET_FORM_TEXTS.GAME_TYPE_PLACEHOLDER}
          error={errors.gameType}
        />
        <Button
          id="submit-bet"
          type="submit"
          className={styles.submitButton}
        >
          {BET_FORM_TEXTS.SUBMIT}
        </Button>
      </form>
    </Card>
  )
}
