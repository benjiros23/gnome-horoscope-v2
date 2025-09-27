import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Horoscope } from '@/types'
import { useAppStore } from '@/stores/appStore'
import { getZodiacById } from '@/utils/zodiac'
import { telegramService } from '@/services/telegram'
import { fadeVariants, scaleVariants } from '@/utils/animations'

interface HoroscopeCardProps {
  horoscope: Horoscope
}

export const HoroscopeCard: React.FC<HoroscopeCardProps> = ({ horoscope }) => {
  const { setSelectedZodiac, generateHoroscope } = useAppStore()
  const [activeTab, setActiveTab] = useState<'main' | 'details'>('main')
  
  const zodiac = getZodiacById(horoscope.zodiacSign)
  
  const handleBack = () => {
    telegramService.hapticFeedback('light')
    setSelectedZodiac(null)
  }
  
  const handleRefresh = () => {
    telegramService.hapticFeedback('medium')
    generateHoroscope()
  }
  
  const handleTabSwitch = (tab: 'main' | 'details') => {
    telegramService.hapticFeedback('light')
    setActiveTab(tab)
  }
  
  if (!zodiac) return null

  const getScoreColor = (score: number) => {
    if (score >= 8) return 'text-green-600 bg-green-100'
    if (score >= 6) return 'text-yellow-600 bg-yellow-100'
    if (score >= 4) return 'text-orange-600 bg-orange-100'
    return 'text-red-600 bg-red-100'
  }
  
  const getScoreStars = (score: number) => {
    return '⭐'.repeat(Math.min(score, 5))
  }

  return (
    <motion.div
      variants={fadeVariants}
      initial="hidden"
      animate="visible"
      className="space-y-4"
    >
      {/* Header */}
      <motion.div 
        className="card p-6"
        variants={scaleVariants}
      >
        <div className="flex items-center justify-between mb-4">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleBack}
            className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
            </svg>
            <span className="text-sm font-medium">Назад</span>
          </motion.button>
          
          <motion.button
            whileHover={{ scale: 1.05, rotate: 180 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleRefresh}
            className="p-2 rounded-full hover:bg-gray-100 transition-colors"
          >
            <svg className="w-5 h-5 text-gray-600" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clipRule="evenodd" />
            </svg>
          </motion.button>
        </div>
        
        <div className="text-center">
          <motion.div
            className="text-4xl mb-3"
            animate={{ rotate: [0, -10, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
          >
            {zodiac.emoji}
          </motion.div>
          
          <h2 className="text-xl font-bold text-gray-900">
            {zodiac.name} {zodiac.symbol}
          </h2>
          
          <p className="text-sm text-gray-600 mt-1">
            {horoscope.date}
          </p>
        </div>
      </motion.div>
      
      {/* Tabs */}
      <div className="flex rounded-lg bg-gray-100 p-1">
        <button
          onClick={() => handleTabSwitch('main')}
          className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
            activeTab === 'main'
              ? 'bg-white text-gray-900 shadow-sm'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          Гороскоп
        </button>
        <button
          onClick={() => handleTabSwitch('details')}
          className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
            activeTab === 'details'
              ? 'bg-white text-gray-900 shadow-sm'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          Детали
        </button>
      </div>
      
      {/* Content */}
      <AnimatePresence mode="wait">
        {activeTab === 'main' && (
          <motion.div
            key="main"
            variants={fadeVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="space-y-4"
          >
            {/* Main Prediction */}
            <motion.div className="card p-6" variants={scaleVariants}>
              <h3 className="font-semibold text-gray-900 mb-3 flex items-center">
                <span className="text-lg mr-2">🔮</span>
                Предсказание дня
              </h3>
              <p className="text-gray-700 leading-relaxed">
                {horoscope.prediction}
              </p>
            </motion.div>
            
            {/* Moon Phase */}
            <motion.div className="card p-6" variants={scaleVariants}>
              <h3 className="font-semibold text-gray-900 mb-3 flex items-center">
                <span className="text-lg mr-2">{horoscope.moonPhase.emoji}</span>
                {horoscope.moonPhase.name}
              </h3>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Освещённость</span>
                  <span className="font-medium">{horoscope.moonPhase.illumination}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <motion.div
                    className="bg-gradient-to-r from-blue-400 to-purple-500 h-2 rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${horoscope.moonPhase.illumination}%` }}
                    transition={{ duration: 1, ease: 'easeOut' }}
                  />
                </div>
                <p className="text-sm text-gray-600 mt-2">
                  {horoscope.moonPhase.description}
                </p>
              </div>
            </motion.div>
            
            {/* Advice */}
            <motion.div className="card p-6" variants={scaleVariants}>
              <h3 className="font-semibold text-gray-900 mb-3 flex items-center">
                <span className="text-lg mr-2">💡</span>
                Совет дня
              </h3>
              <p className="text-gray-700">
                {horoscope.advice}
              </p>
            </motion.div>
          </motion.div>
        )}
        
        {activeTab === 'details' && (
          <motion.div
            key="details"
            variants={fadeVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="space-y-4"
          >
            {/* Scores */}
            <motion.div className="card p-6" variants={scaleVariants}>
              <h3 className="font-semibold text-gray-900 mb-4 flex items-center">
                <span className="text-lg mr-2">📊</span>
                Показатели дня
              </h3>
              
              <div className="grid grid-cols-2 gap-4">
                {[
                  { label: 'Энергия', value: horoscope.energy, icon: '⚡' },
                  { label: 'Любовь', value: horoscope.love, icon: '❤️' },
                  { label: 'Карьера', value: horoscope.career, icon: '💼' },
                  { label: 'Здоровье', value: horoscope.health, icon: '🌱' }
                ].map((item, index) => (
                  <motion.div
                    key={item.label}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className={`p-3 rounded-lg ${getScoreColor(item.value)}`}
                  >
                    <div className="text-center">
                      <div className="text-lg mb-1">{item.icon}</div>
                      <div className="text-xs font-medium mb-1">{item.label}</div>
                      <div className="text-sm font-bold">{item.value}/10</div>
                      <div className="text-xs mt-1">{getScoreStars(item.value)}</div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
            
            {/* Lucky Numbers and Colors */}
            <motion.div className="card p-6" variants={scaleVariants}>
              <h3 className="font-semibold text-gray-900 mb-4 flex items-center">
                <span className="text-lg mr-2">🍀</span>
                Счастливые символы
              </h3>
              
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Число дня</span>
                  <span className="text-2xl font-bold text-gnome-600">
                    {horoscope.luckyNumber}
                  </span>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Цвет дня</span>
                  <span className="px-3 py-1 bg-gray-100 rounded-full text-sm font-medium capitalize">
                    {horoscope.luckyColor}
                  </span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}