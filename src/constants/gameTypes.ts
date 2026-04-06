export const GAME_TYPES = [
  { value: 'football', label: '⚽ Футбол' },
  { value: 'basketball', label: '🏀 Баскетбол' },
  { value: 'tennis', label: '🎾 Теніс' },
  { value: 'slots', label: '🎰 Слоти' },
  { value: 'poker', label: '🃏 Покер' },
  { value: 'roulette', label: '🎲 Рулетка' },
] as const

export type GameTypeValue = (typeof GAME_TYPES)[number]['value']

export interface GameType {
  value: GameTypeValue
  label: string
}
