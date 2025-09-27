import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { AppState, TelegramUser, Horoscope, Settings } from '@/types'
import { telegramService } from '@/services/telegram'
import { horoscopeService } from '@/services/horoscope'
import { cacheService } from '@/services/cache'

interface AppStore extends AppState {
  // Actions
  initializeApp: () => void
  setUser: (user: TelegramUser | null) => void
  setSelectedZodiac: (zodiac: string | null) => void
  generateHoroscope: (zodiacId?: string) => Promise<void>
  setLoading: (loading: boolean) => void
  setError: (error: string | null) => void
  clearError: () => void
  
  // Settings
  settings: Settings
  updateSettings: (updates: Partial<Settings>) => void
}

export const useAppStore = create<AppStore>()()
  (persist(
    (set, get) => ({
      // Initial state
      user: null,
      selectedZodiac: null,
      currentHoroscope: null,
      isLoading: false,
      error: null,
      
      settings: {
        theme: 'light',
        notifications: true,
        language: 'ru',
        zodiacSign: null
      },

      // Actions
      initializeApp: () => {
        try {
          const user = telegramService.getUser()
          const theme = telegramService.getTheme()
          
          set({ 
            user,
            settings: {
              ...get().settings,
              theme
            }
          })
          
          // Если пользователь уже выбирал знак зодиака, загружаем гороскоп
          const { selectedZodiac } = get()
          if (selectedZodiac) {
            get().generateHoroscope(selectedZodiac)
          }
        } catch (error) {
          console.error('Failed to initialize app:', error)
          set({ error: 'Ошибка инициализации приложения' })
        }
      },

      setUser: (user) => set({ user }),
      
      setSelectedZodiac: (zodiac) => {
        set({ selectedZodiac: zodiac })
        
        // Обновляем настройки
        const { settings, updateSettings } = get()
        updateSettings({ zodiacSign: zodiac })
        
        // Автоматически генерируем гороскоп
        if (zodiac) {
          get().generateHoroscope(zodiac)
        }
      },

      generateHoroscope: async (zodiacId) => {
        const { selectedZodiac } = get()
        const targetZodiac = zodiacId || selectedZodiac
        
        if (!targetZodiac) {
          set({ error: 'Знак зодиака не выбран' })
          return
        }

        set({ isLoading: true, error: null })
        
        try {
          const today = new Date()
          const cacheKey = `horoscope-${targetZodiac}-${today.toDateString()}`
          
          // Проверяем кэш
          let horoscope = cacheService.get<Horoscope>(cacheKey)
          
          if (!horoscope) {
            // Генерируем новый гороскоп
            horoscope = horoscopeService.generateHoroscope(targetZodiac, today)
            
            // Кэшируем на день
            cacheService.set(cacheKey, horoscope, 1000 * 60 * 60 * 24)
          }
          
          set({ 
            currentHoroscope: horoscope,
            selectedZodiac: targetZodiac,
            isLoading: false 
          })
          
          // Haptic feedback
          telegramService.notificationFeedback('success')
        } catch (error) {
          console.error('Failed to generate horoscope:', error)
          set({ 
            error: 'Не удалось сгенерировать гороскоп',
            isLoading: false 
          })
          
          telegramService.notificationFeedback('error')
        }
      },

      setLoading: (isLoading) => set({ isLoading }),
      
      setError: (error) => set({ error }),
      
      clearError: () => set({ error: null }),
      
      updateSettings: (updates) => {
        set(state => ({
          settings: { ...state.settings, ...updates }
        }))
      }
    }),
    {
      name: 'gnome-horoscope-storage',
      partialize: (state) => ({
        selectedZodiac: state.selectedZodiac,
        settings: state.settings
      })
    }
  ))