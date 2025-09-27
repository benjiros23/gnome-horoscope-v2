import * as SunCalc from 'suncalc'
import { MoonPhase } from '@/types'

class MoonPhaseService {
  calculateMoonPhase(date: Date = new Date()): MoonPhase {
    const moonIllumination = SunCalc.getMoonIllumination(date)
    const phase = moonIllumination.phase
    const illumination = Math.round(moonIllumination.illumination * 100)

    // Определяем фазу луны
    let name: string
    let emoji: string
    let description: string

    if (phase < 0.05) {
      name = 'Новолуние'
      emoji = '🌑'
      description = 'Время новых начинаний и планов'
    } else if (phase < 0.25) {
      name = 'Растущая луна'
      emoji = '🌒'
      description = 'Энергия роста и развития'
    } else if (phase < 0.3) {
      name = 'Первая четверть'
      emoji = '🌓'
      description = 'Время принятия решений'
    } else if (phase < 0.45) {
      name = 'Прибывающая луна'
      emoji = '🌔'
      description = 'Накопление сил и энергии'
    } else if (phase < 0.55) {
      name = 'Полнолуние'
      emoji = '🌕'
      description = 'Пик энергии и эмоций'
    } else if (phase < 0.7) {
      name = 'Убывающая луна'
      emoji = '🌖'
      description = 'Время освобождения и очищения'
    } else if (phase < 0.75) {
      name = 'Последняя четверть'
      emoji = '🌗'
      description = 'Подведение итогов и анализ'
    } else {
      name = 'Убывающий месяц'
      emoji = '🌘'
      description = 'Завершение циклов и отдых'
    }

    return {
      name,
      emoji,
      description,
      illumination,
      phase: Math.round(phase * 100)
    }
  }

  getMoonPositionAdvice(phase: number): string {
    if (phase < 0.25) {
      return 'Благоприятное время для начала новых дел'
    } else if (phase < 0.5) {
      return 'Развивайте начатые проекты'
    } else if (phase < 0.75) {
      return 'Время завершения дел и анализа результатов'
    } else {
      return 'Освободитесь от ненужного, подготовьтесь к новому циклу'
    }
  }
}

export const moonPhaseService = new MoonPhaseService()