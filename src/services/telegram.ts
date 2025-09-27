import { TelegramWebApp, TelegramUser } from '@/types/telegram'

class TelegramService {
  private tg: TelegramWebApp | null = null

  constructor() {
    if (typeof window !== 'undefined' && window.Telegram?.WebApp) {
      this.tg = window.Telegram.WebApp
      this.init()
    }
  }

  private init() {
    if (!this.tg) return

    this.tg.ready()
    this.tg.expand()
    
    // Apply Telegram theme
    document.documentElement.style.setProperty('--tg-bg-color', this.tg.backgroundColor)
    document.documentElement.style.setProperty('--tg-text-color', this.tg.themeParams.text_color)
    document.documentElement.style.setProperty('--tg-button-color', this.tg.themeParams.button_color)
  }

  getUser(): TelegramUser | null {
    if (!this.tg?.initDataUnsafe.user) return null
    
    return {
      id: this.tg.initDataUnsafe.user.id,
      first_name: this.tg.initDataUnsafe.user.first_name,
      last_name: this.tg.initDataUnsafe.user.last_name,
      username: this.tg.initDataUnsafe.user.username,
      language_code: this.tg.initDataUnsafe.user.language_code,
      is_premium: this.tg.initDataUnsafe.user.is_premium,
      photo_url: this.tg.initDataUnsafe.user.photo_url
    }
  }

  showAlert(message: string, callback?: () => void) {
    this.tg?.showAlert(message, callback)
  }

  showConfirm(message: string, callback?: (confirmed: boolean) => void) {
    this.tg?.showConfirm(message, callback)
  }

  hapticFeedback(type: 'light' | 'medium' | 'heavy' = 'light') {
    this.tg?.HapticFeedback.impactOccurred(type)
  }

  notificationFeedback(type: 'error' | 'success' | 'warning') {
    this.tg?.HapticFeedback.notificationOccurred(type)
  }

  close() {
    this.tg?.close()
  }

  getTheme() {
    return this.tg?.colorScheme || 'light'
  }

  isAvailable(): boolean {
    return !!this.tg
  }

  getMainButton() {
    return this.tg?.MainButton
  }

  getBackButton() {
    return this.tg?.BackButton
  }
}

export const telegramService = new TelegramService()