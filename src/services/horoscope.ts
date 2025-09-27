import { Horoscope, ZodiacSign } from '@/types'
import { zodiacSigns } from '@/data/zodiac'
import { horoscopeTexts } from '@/data/horoscope-texts'
import { moonPhaseService } from './moonPhase'
import { format } from 'date-fns'
import { ru } from 'date-fns/locale'

class HoroscopeService {
  generateHoroscope(zodiacId: string, date: Date = new Date()): Horoscope {
    const zodiac = zodiacSigns.find(sign => sign.id === zodiacId)
    if (!zodiac) {
      throw new Error(`Zodiac sign ${zodiacId} not found`)
    }

    const moonPhase = moonPhaseService.calculateMoonPhase(date)
    const texts = horoscopeTexts[zodiacId]
    
    // Генерируем псевдослучайные числа на основе даты и знака зодиака
    const seed = this.generateSeed(zodiacId, date)
    
    const prediction = this.getRandomFromArray(texts.predictions, seed)
    const advice = this.getRandomFromArray(texts.advice, seed + 1)
    const luckyColor = this.getRandomFromArray(texts.colors, seed + 2)
    const luckyNumber = this.generateLuckyNumber(seed)
    
    // Генерируем показатели (1-10)
    const energy = this.generateScore(seed + 3)
    const love = this.generateScore(seed + 4)
    const career = this.generateScore(seed + 5)
    const health = this.generateScore(seed + 6)

    return {
      id: `${zodiacId}-${format(date, 'yyyy-MM-dd')}`,
      zodiacSign: zodiacId,
      date: format(date, 'dd MMMM yyyy', { locale: ru }),
      prediction,
      moonPhase,
      luckyNumber,
      luckyColor,
      advice,
      energy,
      love,
      career,
      health
    }
  }

  private generateSeed(zodiacId: string, date: Date): number {
    const dateStr = format(date, 'yyyy-MM-dd')
    let hash = 0
    const input = zodiacId + dateStr
    
    for (let i = 0; i < input.length; i++) {
      const char = input.charCodeAt(i)
      hash = ((hash << 5) - hash) + char
      hash = hash & hash // Convert to 32bit integer
    }
    
    return Math.abs(hash)
  }

  private getRandomFromArray<T>(array: T[], seed: number): T {
    return array[seed % array.length]
  }

  private generateLuckyNumber(seed: number): number {
    return (seed % 100) + 1
  }

  private generateScore(seed: number): number {
    return (seed % 10) + 1
  }

  getZodiacByDate(birthDate: Date): ZodiacSign | null {
    const month = birthDate.getMonth() + 1
    const day = birthDate.getDate()

    // Определяем знак зодиака по дате рождения
    if ((month === 3 && day >= 21) || (month === 4 && day <= 19)) return zodiacSigns.find(z => z.id === 'aries') || null
    if ((month === 4 && day >= 20) || (month === 5 && day <= 20)) return zodiacSigns.find(z => z.id === 'taurus') || null
    if ((month === 5 && day >= 21) || (month === 6 && day <= 20)) return zodiacSigns.find(z => z.id === 'gemini') || null
    if ((month === 6 && day >= 21) || (month === 7 && day <= 22)) return zodiacSigns.find(z => z.id === 'cancer') || null
    if ((month === 7 && day >= 23) || (month === 8 && day <= 22)) return zodiacSigns.find(z => z.id === 'leo') || null
    if ((month === 8 && day >= 23) || (month === 9 && day <= 22)) return zodiacSigns.find(z => z.id === 'virgo') || null
    if ((month === 9 && day >= 23) || (month === 10 && day <= 22)) return zodiacSigns.find(z => z.id === 'libra') || null
    if ((month === 10 && day >= 23) || (month === 11 && day <= 21)) return zodiacSigns.find(z => z.id === 'scorpio') || null
    if ((month === 11 && day >= 22) || (month === 12 && day <= 21)) return zodiacSigns.find(z => z.id === 'sagittarius') || null
    if ((month === 12 && day >= 22) || (month === 1 && day <= 19)) return zodiacSigns.find(z => z.id === 'capricorn') || null
    if ((month === 1 && day >= 20) || (month === 2 && day <= 18)) return zodiacSigns.find(z => z.id === 'aquarius') || null
    if ((month === 2 && day >= 19) || (month === 3 && day <= 20)) return zodiacSigns.find(z => z.id === 'pisces') || null

    return null
  }
}

export const horoscopeService = new HoroscopeService()