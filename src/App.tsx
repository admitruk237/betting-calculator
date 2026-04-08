import { useBetCalculator } from '@/hooks/useBetCalculator'
import { BetForm } from '@/components/BetForm/BetForm'
import { BetResult } from '@/components/BetResult/BetResult'
import { BetHistory } from '@/components/BetHistory/BetHistory'
import { Header } from '@/components/Header/Header'
import styles from './App.module.css'

const App = () => {
  const {
    formData,
    errors,
    result,
    history,
    handleChange,
    setFieldValue,
    handleSubmit,
    clearHistory,
  } = useBetCalculator()

  return (
    <div className={styles.app}>
      <Header />

      <main className={styles.main}>
        <h2 className={styles.title}>Розрахунок ставок та аналіз прибутку</h2>
        <div className={styles.topRow}>
          <BetForm
            formData={formData}
            errors={errors}
            onChange={handleChange}
            onFieldChange={setFieldValue}
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
