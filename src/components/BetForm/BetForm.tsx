import type { ChangeEvent } from 'react'
import type { FormData, FormErrors } from '@/types/bet'
import { Card } from '@/components/Card/Card'
import { Button } from '@/components/Button/Button'
import { TextField } from '@/components/TextField/TextField'
import { SelectField } from '@/components/SelectField/SelectField'
import { GAME_TYPES } from '@/constants/gameTypes'
import styles from './BetForm.module.css'

type Props = {
  formData: FormData
  errors: FormErrors
  onChange: (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void
  onSubmit: () => void
}

export const BetForm = ({ formData, errors, onChange, onSubmit }: Props) => {
  return (
    <Card title="Нова ставка">
      <div className={styles.formContainer}>
        <TextField
          id="betAmount"
          label="Сума ставки (грн)"
          name="betAmount"
          type="number"
          value={formData.betAmount}
          onChange={onChange}
          error={errors.betAmount}
          placeholder="Наприклад: 500"
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
          name="gameType"
          value={formData.gameType}
          onChange={onChange}
          error={errors.gameType}
        >
          <option value="">Оберіть тип гри...</option>
          {GAME_TYPES.map((g) => (
            <option key={g.value} value={g.value}>
              {g.label}
            </option>
          ))}
        </SelectField>

        <Button id="submit-bet" onClick={onSubmit} style={{ marginTop: '4px' }}>
          Розрахувати та зберегти
        </Button>
      </div>
    </Card>
  )
}
