import type { GameTypeValue } from '../constants/gameTypes'

export type FormData = {
  betAmount: string
  coefficient: string
  gameType: GameTypeValue | ''
}

export type FormErrors = {
  betAmount?: string
  coefficient?: string
  gameType?: string
}

export type BetResult = {
  win: number
  profit: number
}

export type BetRecord = {
  id: number
  date: string
  amount: number
  coefficient: number
  gameType: GameTypeValue
  gameLabel: string
  potentialWin: number
  profit: number
}
