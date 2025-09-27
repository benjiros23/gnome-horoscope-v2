import React from 'react'
import { motion } from 'framer-motion'
import { useAppStore } from '@/stores/appStore'
import { telegramService } from '@/services/telegram'

export const Header: React.FC = () => {
  const { user } = useAppStore()
  
  return (
    <motion.header 
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white/80 backdrop-blur-sm border-b border-gray-100 sticky top-0 z-50"
    >
      <div className="container mx-auto px-4 py-3 max-w-md">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <motion.div
              className="text-3xl"
              animate={{ rotate: [0, -10, 10, 0] }}
              transition={{ 
                duration: 2,
                repeat: Infinity,
                repeatDelay: 3
              }}
            >
              🧙‍♂️
            </motion.div>
            <div>
              <h1 className="text-xl font-bold text-gradient">
                Астро Гном
              </h1>
              <p className="text-sm text-gray-500">
                Магические предсказания
              </p>
            </div>
          </div>
          
          {user && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex items-center space-x-2"
            >
              {user.photo_url && (
                <img
                  src={user.photo_url}
                  alt={user.first_name}
                  className="w-8 h-8 rounded-full border-2 border-gnome-300"
                />
              )}
              <span className="text-sm font-medium text-gray-700">
                {user.first_name}
              </span>
            </motion.div>
          )}
        </div>
      </div>
    </motion.header>
  )
}