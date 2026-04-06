import type { ChangeEvent } from 'react'
import type { FormData, FormErrors } from '../../types/bet'
import { Card } from '../Card/Card'
import { GAME_TYPES } from '../../constants/gameTypes'
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
        <div className={styles.field}>
          <label htmlFor="betAmount" className={styles.label}>
            Сума ставки (грн)
          </label>
          <input
            id="betAmount"
            className={`${styles.input} ${errors.betAmount ? styles.inputError : ''}`}
            type="number"
            name="betAmount"
            value={formData.betAmount}
            onChange={onChange}
            placeholder="Наприклад: 500"
            min={0}
            max={100000}
          />
          {errors.betAmount && (
            <span className={styles.errorText}>{errors.betAmount}</span>
          )}
        </div>

        <div className={styles.field}>
          <label htmlFor="coefficient" className={styles.label}>
            Коефіцієнт
          </label>
          <input
            id="coefficient"
            className={`${styles.input} ${errors.coefficient ? styles.inputError : ''}`}
            type="number"
            name="coefficient"
            value={formData.coefficient}
            onChange={onChange}
            placeholder="Наприклад: 2.5"
            min={1.01}
            max={1000}
            step={0.01}
          />
          {errors.coefficient && (
            <span className={styles.errorText}>{errors.coefficient}</span>
          )}
        </div>

        <div className={styles.field}>
          <label htmlFor="gameType" className={styles.label}>
            Тип гри
          </label>
          <select
            id="gameType"
            className={`${styles.select} ${errors.gameType ? styles.inputError : ''}`}
            name="gameType"
            value={formData.gameType}
            onChange={onChange}
          >
            <option value="">Оберіть тип гри...</option>
            {GAME_TYPES.map((g) => (
              <option key={g.value} value={g.value}>
                {g.label}
              </option>
            ))}
          </select>
          {errors.gameType && (
            <span className={styles.errorText}>{errors.gameType}</span>
          )}
        </div>

        <button id="submit-bet" className={styles.button} onClick={onSubmit}>
          Розрахувати та зберегти
        </button>
      </div>
    </Card>
  )
}
