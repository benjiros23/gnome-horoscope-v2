import React, { Component, ErrorInfo, ReactNode } from 'react'
import { telegramService } from '@/services/telegram'

interface Props {
  children: ReactNode
  fallback?: ReactNode
}

interface State {
  hasError: boolean
  error?: Error
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Error caught by boundary:', error, errorInfo)
    
    // Отправляем haptic feedback
    telegramService.notificationFeedback('error')
  }

  private handleReload = () => {
    this.setState({ hasError: false, error: undefined })
    window.location.reload()
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback
      }

      return (
        <div className="min-h-screen bg-gradient-to-br from-red-50 to-red-100 flex items-center justify-center p-4">
          <div className="max-w-md w-full">
            <div className="card p-6 text-center">
              <div className="text-6xl mb-4">😵</div>
              <h2 className="text-xl font-bold text-gray-900 mb-2">
                Оопс! Магическая ошибка
              </h2>
              <p className="text-gray-600 mb-6">
                Гном споткнулся о магические руны. Попробуйте перезапустить приложение.
              </p>
              {process.env.NODE_ENV === 'development' && this.state.error && (
                <details className="mb-4 text-left">
                  <summary className="cursor-pointer text-sm text-gray-500 hover:text-gray-700">
                    Технические детали
                  </summary>
                  <pre className="mt-2 text-xs bg-gray-100 p-3 rounded overflow-auto">
                    {this.state.error.message}
                    {this.state.error.stack}
                  </pre>
                </details>
              )}
              <button
                onClick={this.handleReload}
                className="btn btn-primary px-6 py-3"
              >
                🔄 Перезапустить
              </button>
            </div>
          </div>
        </div>
      )
    }

    return this.props.children
  }
}