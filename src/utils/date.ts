import { format, isToday, isYesterday, isTomorrow } from 'date-fns'
import { ru } from 'date-fns/locale'

export const formatDate = (date: Date, formatString: string = 'dd MMMM yyyy'): string => {
  return format(date, formatString, { locale: ru })
}

export const getRelativeDateLabel = (date: Date): string => {
  if (isToday(date)) return 'Сегодня'
  if (isYesterday(date)) return 'Вчера'
  if (isTomorrow(date)) return 'Завтра'
  
  return formatDate(date, 'dd MMMM')
}

export const getDateForHoroscope = (offset: number = 0): Date => {
  const date = new Date()
  date.setDate(date.getDate() + offset)
  return date
}

export const isSameDay = (date1: Date, date2: Date): boolean => {
  return (
    date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getDate() === date2.getDate()
  )
}