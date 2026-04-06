import styles from './EmptyState.module.css'

interface Props {
  title?: string
  message: string
}

export const EmptyState = ({ title, message }: Props) => {
  return (
    <div className={styles.empty}>
      {title && <h3 className={styles.emptyTitle}>{title}</h3>}
      <p className={styles.message}>{message}</p>
    </div>
  )
}
