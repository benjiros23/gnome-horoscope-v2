export interface ZodiacSign {
  id: string
  name: string
  symbol: string
  element: 'fire' | 'earth' | 'air' | 'water'
  dates: string
  emoji: string
}

export interface MoonPhase {
  name: string
  illumination: number
  phase: number
  emoji: string
  description: string
}

export interface Horoscope {
  id: string
  zodiacSign: string
  date: string
  prediction: string
  moonPhase: MoonPhase
  luckyNumber: number
  luckyColor: string
  advice: string
  energy: number
  love: number
  career: number
  health: number
}

export interface TelegramUser {
  id: number
  first_name: string
  last_name?: string
  username?: string
  language_code?: string
  is_premium?: boolean
  photo_url?: string
}

export interface AppState {
  user: TelegramUser | null
  selectedZodiac: string | null
  currentHoroscope: Horoscope | null
  isLoading: boolean
  error: string | null
}

export type Theme = 'light' | 'dark'

export interface Settings {
  theme: Theme
  notifications: boolean
  language: 'ru' | 'en'
  zodiacSign: string | null
}