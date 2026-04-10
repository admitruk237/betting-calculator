import { useState, useEffect } from 'react'
import type { BetRecord } from '@/types/bet'

const HISTORY_KEY = 'betHistory'
const MAX_HISTORY = 5

export function useBetHistory() {
  const [history, setHistory] = useState<BetRecord[]>(() => {
    try {
      const saved = localStorage.getItem(HISTORY_KEY)
      return saved ? JSON.parse(saved) : []
    } catch {
      return []
    }
  })

  useEffect(() => {
    localStorage.setItem(HISTORY_KEY, JSON.stringify(history))
  }, [history])

  const addRecord = (record: BetRecord) => {
    setHistory((prev) => [record, ...prev].slice(0, MAX_HISTORY))
  }

  const clearHistory = () => setHistory([])

  return { history, addRecord, clearHistory }
}
