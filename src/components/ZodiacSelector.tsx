import React from 'react'
import { motion } from 'framer-motion'
import { useAppStore } from '@/stores/appStore'
import { zodiacSigns } from '@/data/zodiac'
import { telegramService } from '@/services/telegram'
import { getElementColor } from '@/utils/zodiac'
import { staggerChildren, childVariants } from '@/utils/animations'

export const ZodiacSelector: React.FC = () => {
  const { setSelectedZodiac } = useAppStore()

  const handleZodiacSelect = (zodiacId: string) => {
    telegramService.hapticFeedback('light')
    setSelectedZodiac(zodiacId)
  }

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <motion.div
          className="text-6xl mb-4"
          animate={{ 
            scale: [1, 1.1, 1],
            rotate: [0, 5, -5, 0]
          }}
          transition={{ 
            duration: 3,
            repeat: Infinity,
            ease: 'easeInOut'
          }}
        >
          🧙‍♂️
        </motion.div>
        
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Выберите свой знак зодиака
        </h2>
        
        <p className="text-gray-600 text-sm max-w-sm mx-auto">
          Мудрый гном расскажет вам о том, что приготовили звёзды именно для вас
        </p>
      </motion.div>

      <motion.div
        variants={staggerChildren}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-2 gap-3"
      >
        {zodiacSigns.map((sign) => (
          <motion.button
            key={sign.id}
            variants={childVariants}
            whileHover={{ scale: 1.02, y: -2 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => handleZodiacSelect(sign.id)}
            className="card p-4 hover:shadow-xl transition-all duration-300 group"
          >
            <div className="text-center space-y-2">
              <div className="text-3xl group-hover:scale-110 transition-transform duration-300">
                {sign.emoji}
              </div>
              
              <div>
                <h3 className="font-semibold text-gray-900 text-sm">
                  {sign.name}
                </h3>
                <p className="text-xs text-gray-500">
                  {sign.dates}
                </p>
              </div>
              
              <div className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                getElementColor(sign.element)
              }`}>
                {sign.symbol}
              </div>
            </div>
          </motion.button>
        ))}
      </motion.div>
      
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="text-center text-xs text-gray-400 space-y-2"
      >
        <p>✨ Гороскопы обновляются каждый день</p>
        <p>🌙 С учётом фаз луны и положения звёзд</p>
      </motion.div>
    </div>
  )
}