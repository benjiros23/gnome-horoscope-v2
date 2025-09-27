import React from 'react'
import { motion } from 'framer-motion'
import clsx from 'clsx'

interface LoadingSpinnerProps {
  size?: 'small' | 'medium' | 'large'
  className?: string
  text?: string
}

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ 
  size = 'medium', 
  className,
  text = 'Магические расчёты...'
}) => {
  const sizeClasses = {
    small: 'w-4 h-4',
    medium: 'w-8 h-8',
    large: 'w-12 h-12'
  }
  
  const textSizes = {
    small: 'text-xs',
    medium: 'text-sm', 
    large: 'text-base'
  }

  return (
    <div className={clsx('flex flex-col items-center space-y-3', className)}>
      <motion.div
        className={clsx(
          'border-4 border-gray-200 border-t-gnome-500 rounded-full',
          sizeClasses[size]
        )}
        animate={{ rotate: 360 }}
        transition={{ 
          duration: 1,
          repeat: Infinity,
          ease: 'linear'
        }}
      />
      
      {text && (
        <motion.p
          className={clsx('text-gray-600 font-medium', textSizes[size])}
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ 
            duration: 2,
            repeat: Infinity,
            ease: 'easeInOut'
          }}
        >
          {text}
        </motion.p>
      )}
      
      <motion.div
        className="text-2xl"
        animate={{ 
          scale: [1, 1.1, 1],
          rotate: [0, 5, -5, 0] 
        }}
        transition={{ 
          duration: 2,
          repeat: Infinity,
          ease: 'easeInOut'
        }}
      >
        🔮
      </motion.div>
    </div>
  )
}