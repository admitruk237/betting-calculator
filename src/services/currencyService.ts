export interface ExchangeRate {
  cc: string
  rate: number
}

export const fetchCurrencyRates = async (): Promise<Record<string, number>> => {
  const response = await fetch(
    'https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?json',
  )

  if (!response.ok) {
    throw new Error('Не вдалося завантажити курси валют')
  }

  const data: ExchangeRate[] = await response.json()

  const usd = data.find((item) => item.cc === 'USD')?.rate
  const eur = data.find((item) => item.cc === 'EUR')?.rate

  if (!usd || !eur) {
    throw new Error('Курси для долара або євро відсутні в банку')
  }

  return {
    USD: 1 / usd,
    EUR: 1 / eur,
    UAH: 1,
  }
}
