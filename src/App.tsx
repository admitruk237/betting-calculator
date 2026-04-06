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
    handleSubmit,
    clearHistory,
  } = useBetCalculator()

  return (
    <div className={styles.app}>
      <Header />

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
