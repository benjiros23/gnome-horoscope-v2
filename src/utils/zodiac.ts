import { zodiacSigns } from '@/data/zodiac'
import { ZodiacSign } from '@/types'

export const getZodiacById = (id: string): ZodiacSign | undefined => {
  return zodiacSigns.find(sign => sign.id === id)
}

export const getZodiacsByElement = (element: 'fire' | 'earth' | 'air' | 'water'): ZodiacSign[] => {
  return zodiacSigns.filter(sign => sign.element === element)
}

export const getElementColor = (element: 'fire' | 'earth' | 'air' | 'water'): string => {
  const colors = {
    fire: 'text-red-600 bg-red-50',
    earth: 'text-green-600 bg-green-50',
    air: 'text-blue-600 bg-blue-50',
    water: 'text-cyan-600 bg-cyan-50'
  }
  
  return colors[element]
}

export const getElementName = (element: 'fire' | 'earth' | 'air' | 'water'): string => {
  const names = {
    fire: 'Огонь',
    earth: 'Земля',
    air: 'Воздух',
    water: 'Вода'
  }
  
  return names[element]
}

export const getCompatibility = (sign1: string, sign2: string): number => {
  // Упрощённая система совместимости
  const compatibility: Record<string, string[]> = {
    aries: ['leo', 'sagittarius', 'gemini', 'aquarius'],
    taurus: ['virgo', 'capricorn', 'cancer', 'pisces'],
    gemini: ['libra', 'aquarius', 'aries', 'leo'],
    cancer: ['scorpio', 'pisces', 'taurus', 'virgo'],
    leo: ['aries', 'sagittarius', 'gemini', 'libra'],
    virgo: ['taurus', 'capricorn', 'cancer', 'scorpio'],
    libra: ['gemini', 'aquarius', 'leo', 'sagittarius'],
    scorpio: ['cancer', 'pisces', 'virgo', 'capricorn'],
    sagittarius: ['aries', 'leo', 'libra', 'aquarius'],
    capricorn: ['taurus', 'virgo', 'scorpio', 'pisces'],
    aquarius: ['gemini', 'libra', 'aries', 'sagittarius'],
    pisces: ['cancer', 'scorpio', 'taurus', 'capricorn']
  }
  
  const compatible = compatibility[sign1] || []
  
  if (compatible.includes(sign2)) {
    return compatible.indexOf(sign2) < 2 ? 90 : 70
  }
  
  return 50
}