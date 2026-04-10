import type { GameTypeValue } from '../constants/gameTypes'
import type { CurrencyValue } from '../constants/currencies'

export type FormData = {
  betAmount: string
  coefficient: string
  gameType: GameTypeValue | ''
  currency: CurrencyValue
}

export type FormErrors = {
  betAmount?: string
  coefficient?: string
  gameType?: string
}

export type BetResult = {
  win: number
  profit: number
  currencySymbol: string
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
  currency: CurrencyValue
  currencySymbol: string
}
