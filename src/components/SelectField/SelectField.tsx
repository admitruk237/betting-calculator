import type { SelectHTMLAttributes, ReactNode } from 'react'
import styles from './SelectField.module.css'

interface Props extends SelectHTMLAttributes<HTMLSelectElement> {
  label: string
  error?: string
  children: ReactNode
}

export const SelectField = ({
  label,
  error,
  id,
  children,
  ...props
}: Props) => {
  return (
    <div className={styles.container}>
      <label
        htmlFor={id}
        className={styles.label}
      >
        {label}
      </label>
      <select
        id={id}
        className={`${styles.select} ${error ? styles.selectError : ''}`}
        {...props}
      >
        {children}
      </select>
      {error && <span className={styles.errorText}>{error}</span>}
    </div>
  )
}
