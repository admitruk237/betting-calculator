export const APP_TEXTS = {
  TITLE: 'Розрахунок ставок та аналіз прибутку',
} as const

export const HEADER_TEXTS = {
  HEADING: 'Betting Calculator',
} as const

export const BET_FORM_TEXTS = {
  CARD_TITLE: 'Нова ставка',
  AMOUNT_LABEL: 'Сума ставки',
  AMOUNT_PLACEHOLDER: 'Наприклад: 500',
  CURRENCY_LABEL: 'Валюта',
  CURRENCY_LOADING_LABEL: 'Оновлення курсів валют...',
  CURRENCY_ERROR: 'Курси недоступні, використовуйте UAH',
  COEFFICIENT_LABEL: 'Коефіцієнт',
  COEFFICIENT_PLACEHOLDER: 'Наприклад: 2.5',
  GAME_TYPE_LABEL: 'Тип гри',
  GAME_TYPE_PLACEHOLDER: 'Оберіть тип гри...',
  SUBMIT: 'Розрахувати та зберегти',
} as const

export const BET_RESULT_TEXTS = {
  CARD_TITLE: 'Результат',
  EMPTY: 'Введіть дані для розрахунку',
  POTENTIAL_WIN: 'Потенційний виграш',
  NET_PROFIT: 'Чистий прибуток',
} as const

export const BET_HISTORY_TEXTS = {
  CARD_TITLE: 'Останні ставки',
  CLEAR: 'Очистити',
  EMPTY: 'Історія порожня',
  PROFIT_LABEL: 'Прибуток:',
} as const

export const CHART_TEXTS = {
  TITLE: 'Аналітика прибутку',
  BET_LABEL: 'Ставка:',
  COEFFICIENT_LABEL: 'Коефіцієнт:',
  WIN_LABEL: 'Виграш:',
  PROFIT_LABEL: 'Прибуток:',
} as const

export const THEME_TOGGLE_TEXTS = {
  ENABLE_DARK: 'Увімкнути темну тему',
  ENABLE_LIGHT: 'Увімкнути світлу тему',
  DARK_TITLE: 'Темна тема',
  LIGHT_TITLE: 'Світла тема',
} as const

export const VALIDATION_MESSAGES = {
  AMOUNT_REQUIRED: 'Введіть суму ставки',
  AMOUNT_POSITIVE: 'Сума повинна бути більше 0',
  AMOUNT_MAX: 'Максимум 100 000',
  COEFFICIENT_REQUIRED: 'Введіть коефіцієнт',
  COEFFICIENT_MIN: 'Мінімальний коефіцієнт 1.1',
  COEFFICIENT_MAX: 'Максимум 1000',
  GAME_TYPE_REQUIRED: 'Оберіть тип гри',
} as const

export const API_ERROR_MESSAGES = {
  RATES_FETCH_FAILED: 'Не вдалося завантажити курси валют',
  RATES_UNAVAILABLE: 'Курси для долара або євро відсутні в банку',
} as const
