import { useBetCalculator } from './hooks/useBetCalculator'
import { BetForm } from './components/BetForm/BetForm'
import { BetResult } from './components/BetResult/BetResult'
import { BetHistory } from './components/BetHistory/BetHistory'
import styles from './App.module.css'

const App = () => {
  const {
    formData,
    errors,
    result,
    history,
    handleChange,
    handleSubmit,
    clearHistory,
  } = useBetCalculator()

  return (
    <div className={styles.app}>
      <header className={styles.header}>
        <div className={styles.headerInner}>
          <span className={styles.logo}>🎰</span>
          <div>
            <h1 className={styles.heading}>Betting Calculator</h1>
            <p className={styles.subheading}>
              Розрахунок ставок та аналіз прибутку
            </p>
          </div>
        </div>
      </header>

      <main className={styles.main}>
        <div className={styles.topRow}>
          <BetForm
            formData={formData}
            errors={errors}
            onChange={handleChange}
            onSubmit={handleSubmit}
          />
          <BetResult
            result={result}
            gameType={formData.gameType}
          />
        </div>
        <BetHistory
          history={history}
          onClear={clearHistory}
        />
      </main>
    </div>
  )
}

export default App
