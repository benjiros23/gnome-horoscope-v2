import React from 'react'
import { motion } from 'framer-motion'

interface ErrorMessageProps {
  message: string
  onDismiss?: () => void
  className?: string
}

export const ErrorMessage: React.FC<ErrorMessageProps> = ({ 
  message, 
  onDismiss,
  className 
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9, y: -10 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9, y: -10 }}
      className={`bg-red-50 border border-red-200 rounded-lg p-4 ${className}`}
    >
      <div className="flex items-start space-x-3">
        <motion.div
          className="text-red-500 text-xl flex-shrink-0 mt-0.5"
          animate={{ rotate: [0, -10, 10, 0] }}
          transition={{ duration: 0.5 }}
        >
          ⚠️
        </motion.div>
        
        <div className="flex-1 min-w-0">
          <p className="text-red-800 text-sm font-medium">
            {message}
          </p>
        </div>
        
        {onDismiss && (
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={onDismiss}
            className="text-red-400 hover:text-red-600 transition-colors flex-shrink-0"
            aria-label="Закрыть"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path 
                fillRule="evenodd" 
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" 
                clipRule="evenodd" 
              />
            </svg>
          </motion.button>
        )}
      </div>
    </motion.div>
  )
}