import { useState, useEffect } from 'react'
import type { BetRecord } from '@/types/bet'
import { STORAGE_KEYS } from '@/constants'

const MAX_HISTORY = 5

export function useBetHistory() {
  const [history, setHistory] = useState<BetRecord[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.BET_HISTORY)
      return saved ? JSON.parse(saved) : []
    } catch {
      return []
    }
  })

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.BET_HISTORY, JSON.stringify(history))
  }, [history])

  const addRecord = (record: BetRecord) => {
    setHistory((prev) => [record, ...prev].slice(0, MAX_HISTORY))
  }

  const clearHistory = () => setHistory([])

  return { history, addRecord, clearHistory }
}
