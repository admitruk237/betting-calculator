import type { ReactNode } from 'react'
import styles from './Card.module.css'

type Props = {
  children: ReactNode
  title?: string
  className?: string
  headerExtra?: ReactNode
}

export const Card = ({ children, title, className = '', headerExtra }: Props) => {
  return (
    <section className={`${styles.card} ${className}`}>
      {(title || headerExtra) && (
        <div className={styles.header}>
          {title && <h2 className={styles.title}>{title}</h2>}
          {headerExtra && <div className={styles.extra}>{headerExtra}</div>}
        </div>
      )}
      <div className={styles.content}>
        {children}
      </div>
    </section>
  )
}
