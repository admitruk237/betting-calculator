import type { InputHTMLAttributes } from 'react'
import styles from './TextField.module.css'

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  label: string
  error?: string
}

export const TextField = ({ label, error, id, className = '', ...props }: Props) => {
  return (
    <div className={styles.container}>
      <label htmlFor={id} className={styles.label}>
        {label}
      </label>
      <input
        id={id}
        className={`${styles.input} ${error ? styles.inputError : ''} ${className}`}
        {...props}
      />
      {error && <span className={styles.errorText}>{error}</span>}
    </div>
  )
}
