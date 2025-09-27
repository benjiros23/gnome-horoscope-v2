import React, { useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useAppStore } from './stores/appStore'
import { ZodiacSelector } from './components/ZodiacSelector'
import { HoroscopeCard } from './components/HoroscopeCard'
import { LoadingSpinner } from './components/ui/LoadingSpinner'
import { ErrorMessage } from './components/ui/ErrorMessage'
import { Header } from './components/Header'
import { fadeVariants } from './utils/animations'

function App() {
  const {
    initializeApp,
    selectedZodiac,
    currentHoroscope,
    isLoading,
    error,
    clearError
  } = useAppStore()

  useEffect(() => {
    initializeApp()
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <Header />
      
      <main className="container mx-auto px-4 py-6 max-w-md">
        <AnimatePresence mode="wait">
          {error && (
            <motion.div
              key="error"
              variants={fadeVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="mb-6"
            >
              <ErrorMessage 
                message={error} 
                onDismiss={clearError}
              />
            </motion.div>
          )}
          
          {isLoading && (
            <motion.div
              key="loading"
              variants={fadeVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="flex justify-center items-center py-12"
            >
              <LoadingSpinner size="large" />
            </motion.div>
          )}
          
          {!isLoading && !selectedZodiac && (
            <motion.div
              key="zodiac-selector"
              variants={fadeVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <ZodiacSelector />
            </motion.div>
          )}
          
          {!isLoading && selectedZodiac && currentHoroscope && (
            <motion.div
              key="horoscope"
              variants={fadeVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <HoroscopeCard horoscope={currentHoroscope} />
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  )
}

export default App