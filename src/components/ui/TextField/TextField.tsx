import type { InputHTMLAttributes, WheelEvent } from 'react'
import styles from './TextField.module.css'

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  label: string
  error?: string
}

export const TextField = ({ label, error, id, className = '', onWheel, ...props }: Props) => {
  const handleWheel = (e: WheelEvent<HTMLInputElement>) => {
    if (props.type === 'number') {
      e.currentTarget.blur()
    }
    onWheel?.(e)
  }

  return (
    <div className={styles.container}>
      <label htmlFor={id} className={styles.label}>
        {label}
      </label>
      <input
        id={id}
        className={`${styles.input} ${error ? styles.inputError : ''} ${className}`}
        onWheel={handleWheel}
        {...props}
      />
      {error && <span className={styles.errorText}>{error}</span>}
    </div>
  )
}
