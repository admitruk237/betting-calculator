import type { ReactNode } from 'react'
import styles from './Card.module.css'

type Props = {
  children: ReactNode
  title?: string
  className?: string
  headerExtra?: ReactNode
  variant?: 'primary' | 'secondary'
}

export const Card = ({
  children,
  title,
  className = '',
  headerExtra,
  variant = 'primary',
}: Props) => {
  const isPrimary = variant === 'primary'

  return (
    <section
      className={`${isPrimary ? styles.card : styles.cardSecondary} ${className}`}
    >
      {(title || headerExtra) && (
        <div className={styles.header}>
          {title && <h2 className={styles.title}>{title}</h2>}
          {headerExtra && <div className={styles.extra}>{headerExtra}</div>}
        </div>
      )}
      <div className={isPrimary ? styles.content : styles.contentSecondary}>
        {children}
      </div>
    </section>
  )
}
