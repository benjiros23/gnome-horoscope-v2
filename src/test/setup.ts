import '@testing-library/jest-dom'

// Mock Telegram WebApp
const mockTelegram = {
  WebApp: {
    initData: '',
    initDataUnsafe: {},
    version: '6.0',
    platform: 'unknown',
    colorScheme: 'light' as const,
    themeParams: {
      bg_color: '#ffffff',
      text_color: '#000000',
      hint_color: '#999999',
      link_color: '#3390ec',
      button_color: '#3390ec',
      button_text_color: '#ffffff',
      secondary_bg_color: '#f1f1f1'
    },
    isExpanded: false,
    viewportHeight: 600,
    viewportStableHeight: 600,
    headerColor: '#ffffff',
    backgroundColor: '#ffffff',
    isClosingConfirmationEnabled: false,
    isVerticalSwipesEnabled: true,
    ready: vi.fn(),
    expand: vi.fn(),
    close: vi.fn(),
    showAlert: vi.fn(),
    showConfirm: vi.fn(),
    showPopup: vi.fn(),
    HapticFeedback: {
      impactOccurred: vi.fn(),
      notificationOccurred: vi.fn(),
      selectionChanged: vi.fn()
    },
    MainButton: {
      text: '',
      color: '#3390ec',
      textColor: '#ffffff',
      isVisible: false,
      isProgressVisible: false,
      isActive: true,
      show: vi.fn(),
      hide: vi.fn(),
      enable: vi.fn(),
      disable: vi.fn(),
      showProgress: vi.fn(),
      hideProgress: vi.fn(),
      setText: vi.fn(),
      onClick: vi.fn(),
      offClick: vi.fn()
    },
    BackButton: {
      isVisible: false,
      show: vi.fn(),
      hide: vi.fn(),
      onClick: vi.fn(),
      offClick: vi.fn()
    }
  }
}

// @ts-expect-error - mocking global
global.window = global.window || {}
// @ts-expect-error - mocking Telegram
window.Telegram = mockTelegram