import { Html } from '@react-three/drei'
import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import { data } from '../data'

function LetterZoom({ isVisible, onClose }) {
  const personName = data.personName
  const birthdayMessage = data.birthdayMessage
  const [isDragging, setIsDragging] = useState(false)
  
  if (!isVisible) return null
  
  return (
    <Html fullscreen>
      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              backgroundColor: 'rgba(0, 0, 0, 0.85)',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              zIndex: 1000,
              padding: '20px'
            }}
          >
            <motion.div
              drag
              dragMomentum={false}
              dragElastic={0.1}
              onDragStart={() => setIsDragging(true)}
              onDragEnd={() => setIsDragging(false)}
              initial={{ scale: 0.8, y: 50 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.8, y: 50 }}
              transition={{ duration: 0.4, ease: 'easeOut' }}
              style={{
                background: 'linear-gradient(135deg, #fffef5 0%, #f5f0e8 100%)',
                padding: '50px 40px',
                borderRadius: '20px',
                minWidth: '500px',
                boxShadow: '0 20px 60px rgba(0, 0, 0, 0.5)',
                position: 'relative',
                fontFamily: '\'Georgia\', serif',
                border: '3px solid #d4af37',
                maxHeight: '80vh',
                overflowY: 'auto',
                cursor: isDragging ? 'grabbing' : 'grab',
                boxSizing: 'border-box'
              }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Drag handle indicator */}
              <div style={{
                position: 'absolute',
                top: '10px',
                left: '50%',
                transform: 'translateX(-50%)',
                width: '50px',
                height: '5px',
                backgroundColor: '#d4af37',
                borderRadius: '10px',
                opacity: 0.5
              }} />
              
              {/* Close button - more visible */}
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  onClose()
                }}
                style={{
                  position: 'absolute',
                  top: '15px',
                  right: '15px',
                  background: 'linear-gradient(135deg, #ff6b6b 0%, #ee5a52 100%)',
                  border: 'none',
                  borderRadius: '50%',
                  width: '45px',
                  height: '45px',
                  fontSize: '28px',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 4px 12px rgba(255, 107, 107, 0.4)',
                  transition: 'all 0.2s',
                  color: '#fff',
                  fontWeight: 'bold',
                  zIndex: 10
                }}
                onMouseEnter={(e) => {
                  e.target.style.transform = 'scale(1.15) rotate(90deg)'
                  e.target.style.boxShadow = '0 6px 16px rgba(255, 107, 107, 0.6)'
                }}
                onMouseLeave={(e) => {
                  e.target.style.transform = 'scale(1) rotate(0deg)'
                  e.target.style.boxShadow = '0 4px 12px rgba(255, 107, 107, 0.4)'
                }}
              >
                ×
              </button>
              
              {/* Letter content */}
              <h1 style={{
                fontSize: '36px',
                marginBottom: '20px',
                background: 'linear-gradient(135deg, #d4af37 0%, #f4e4c1 50%, #d4af37 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                textAlign: 'center',
                fontWeight: 'bold'
              }}>
                Dear {personName} 🎉
              </h1>
              
              <p style={{
                fontSize: '18px',
                lineHeight: '1.8',
                color: '#333',
                marginBottom: '30px',
                textAlign: 'justify'
              }}>
                {birthdayMessage}
              </p>
              
              <p style={{
                fontSize: '24px',
                fontWeight: 'bold',
                color: '#d4af37',
                textAlign: 'center',
                marginTop: '30px'
              }}>
                Happy Birthday! 🎂🎈
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </Html>
  )
}

export default LetterZoom
