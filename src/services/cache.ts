interface CacheItem<T> {
  data: T
  timestamp: number
  ttl: number
}

class CacheService {
  private cache = new Map<string, CacheItem<any>>()
  private readonly DEFAULT_TTL = 1000 * 60 * 60 // 1 час

  set<T>(key: string, data: T, ttl: number = this.DEFAULT_TTL): void {
    this.cache.set(key, {
      data,
      timestamp: Date.now(),
      ttl
    })
  }

  get<T>(key: string): T | null {
    const item = this.cache.get(key)
    
    if (!item) {
      return null
    }

    // Проверяем не истёк ли TTL
    if (Date.now() - item.timestamp > item.ttl) {
      this.cache.delete(key)
      return null
    }

    return item.data as T
  }

  has(key: string): boolean {
    return this.get(key) !== null
  }

  delete(key: string): boolean {
    return this.cache.delete(key)
  }

  clear(): void {
    this.cache.clear()
  }

  // Очистка устаревших элементов
  cleanup(): void {
    const now = Date.now()
    
    for (const [key, item] of this.cache.entries()) {
      if (now - item.timestamp > item.ttl) {
        this.cache.delete(key)
      }
    }
  }

  // Статистика кэша
  getStats() {
    const now = Date.now()
    let validItems = 0
    let expiredItems = 0

    for (const item of this.cache.values()) {
      if (now - item.timestamp > item.ttl) {
        expiredItems++
      } else {
        validItems++
      }
    }

    return {
      totalItems: this.cache.size,
      validItems,
      expiredItems
    }
  }
}

export const cacheService = new CacheService()

// Автоматическая очистка каждые 10 минут
setInterval(() => {
  cacheService.cleanup()
}, 1000 * 60 * 10)