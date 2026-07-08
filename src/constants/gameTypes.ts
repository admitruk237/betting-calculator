export const GAME_TYPES = [
  { value: 'football', icon: '⚽', label: 'Футбол' },
  { value: 'basketball', icon: '🏀', label: 'Баскетбол' },
  { value: 'tennis', icon: '🎾', label: 'Теніс' },
  { value: 'slots', icon: '🎰', label: 'Слоти' },
  { value: 'poker', icon: '🃏', label: 'Покер' },
  { value: 'roulette', icon: '🎲', label: 'Рулетка' },
] as const

export type GameTypeValue = (typeof GAME_TYPES)[number]['value']

export const formatGameTypeLabel = (gameType: (typeof GAME_TYPES)[number]): string =>
  `${gameType.icon} ${gameType.label}`
