import type { ButtonHTMLAttributes, ReactNode } from 'react'
import styles from './Button.module.css'

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode
  variant?: 'primary' | 'destructive'
  className?: string
}

export const Button = ({
  children,
  variant = 'primary',
  className = '',
  ...props
}: Props) => {
  const buttonClass = `${styles.button} ${styles[variant]} ${className}`

  return (
    <button className={buttonClass} {...props}>
      {children}
    </button>
  )
}
