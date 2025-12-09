import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

function BlowButton({ onBlow, disabled = false, candlesExtinguished = false }) {
  const [isBlowing, setIsBlowing] = useState(false)
  const [showWish, setShowWish] = useState(false)
  const [timeRemaining, setTimeRemaining] = useState(60)
  const [timerActive, setTimerActive] = useState(true)

  // 60-second countdown timer
  useEffect(() => {
    if (!timerActive || candlesExtinguished) return

    const interval = setInterval(() => {
      setTimeRemaining((prev) => {
        if (prev <= 1) {
          setTimerActive(false)
          // Auto-blow candles when timer reaches 0
          handleBlow()
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(interval)
  }, [timerActive, candlesExtinguished])

  const handleBlow = () => {
    if (disabled || isBlowing) return
    
    setIsBlowing(true)
    setTimerActive(false) // Stop the timer
    
    // Trigger the blow animation
    if (onBlow) {
      onBlow()
    }

    // Reset blowing state after animation
    setTimeout(() => {
      setIsBlowing(false)
    }, 1500)
  }

  const handleGiftBoxClick = () => {
    setShowWish(true)
  }

  return (
    <>
      <AnimatePresence>
        {!candlesExtinguished && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.5 }}
            transition={{ duration: 0.5 }}
            style={{
              position: 'fixed',
              bottom: '40px',
              left: '50%',
              transform: 'translateX(-50%)',
              zIndex: 100,
              textAlign: 'center',
              pointerEvents: 'auto'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <motion.p
              style={{
                color: 'white',
                marginBottom: '15px',
                fontSize: '18px',
                textShadow: '0 2px 10px rgba(0,0,0,0.5)',
                fontFamily: 'Georgia, serif',
                fontStyle: 'italic'
              }}
              animate={{ opacity: [0.7, 1, 0.7] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              Make a wish and blow the candles! 🌟
            </motion.p>

            {/* Timer Display */}
            <motion.div
              style={{
                color: 'white',
                fontSize: '16px',
                marginBottom: '10px',
                textShadow: '0 2px 8px rgba(0,0,0,0.5)',
                fontFamily: 'monospace'
              }}
              animate={{ scale: timeRemaining <= 10 ? [1, 1.1, 1] : 1 }}
              transition={{ duration: 0.5, repeat: timeRemaining <= 10 ? Infinity : 0 }}
            >
              ⏱️ {timeRemaining}s
            </motion.div>
            
            <motion.button
              onClick={handleBlow}
              disabled={disabled || isBlowing}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              animate={isBlowing ? {
                scale: [1, 1.1, 0.9, 1],
                rotate: [0, -5, 5, 0]
              } : {}}
              style={{
                background: isBlowing 
                  ? 'linear-gradient(45deg, #95a5a6, #7f8c8d)'
                  : 'linear-gradient(45deg, #ff6b6b, #ff8e53)',
                border: 'none',
                padding: '18px 45px',
                borderRadius: '50px',
                color: 'white',
                fontSize: '20px',
                fontWeight: 'bold',
                cursor: disabled || isBlowing ? 'not-allowed' : 'pointer',
                boxShadow: isBlowing 
                  ? '0 4px 15px rgba(0,0,0,0.3)'
                  : '0 8px 30px rgba(255,107,107,0.4)',
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                transition: 'box-shadow 0.3s ease'
              }}
            >
              {isBlowing ? (
                <>
                  <motion.span
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                  >
                    💨
                  </motion.span>
                  Blowing...
                </>
              ) : (
                <>
                  <span>💨</span>
                  Blow Candles
                </>
              )}
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Gift Box - appears in corner after candles are blown */}
      <AnimatePresence>
        {candlesExtinguished && (
          <motion.div
            initial={{ 
              bottom: '40px',
              left: '50%',
              x: '-50%',
              scale: 1
            }}
            animate={{ 
              bottom: '30px',
              left: 'auto',
              right: '30px',
              x: 0,
              scale: 1
            }}
            transition={{ 
              duration: 1,
              type: 'spring',
              stiffness: 100,
              damping: 15
            }}
            style={{
              position: 'fixed',
              zIndex: 100,
              pointerEvents: 'auto'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <motion.button
              onClick={handleGiftBoxClick}
              whileHover={{ scale: 1.15, rotate: [0, -10, 10, 0] }}
              whileTap={{ scale: 0.9 }}
              animate={{
                y: [0, -10, 0],
                rotate: [0, 5, -5, 0]
              }}
              transition={{
                y: { duration: 2, repeat: Infinity, ease: 'easeInOut' },
                rotate: { duration: 3, repeat: Infinity, ease: 'easeInOut' }
              }}
              style={{
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                border: '3px solid #ffd700',
                borderRadius: '20px',
                padding: '20px',
                fontSize: '50px',
                cursor: 'pointer',
                boxShadow: '0 8px 30px rgba(102, 126, 234, 0.6)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '80px',
                height: '80px',
                position: 'relative',
                overflow: 'hidden'
              }}
            >
              <motion.span
                animate={{
                  scale: [1, 1.2, 1]
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: 'easeInOut'
                }}
              >
                🎁
              </motion.span>
              
              {/* Sparkle effect */}
              <motion.div
                animate={{
                  opacity: [0, 1, 0],
                  scale: [0.5, 1.5, 0.5]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: 'easeInOut'
                }}
                style={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  fontSize: '70px',
                  pointerEvents: 'none'
                }}
              >
                ✨
              </motion.div>
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showWish && (
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            transition={{ 
              duration: 0.8, 
              type: 'spring',
              stiffness: 100
            }}
            style={{
              position: 'fixed',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              zIndex: 200,
              textAlign: 'center',
              pointerEvents: 'auto'
            }}
          >
            <motion.div
              animate={{
                scale: [1, 1.02, 1],
                rotate: [-1, 1, -1]
              }}
              transition={{ duration: 3, repeat: Infinity }}
              style={{
                background: 'linear-gradient(145deg, rgba(42, 42, 74, 0.95), rgba(26, 26, 46, 0.95))',
                borderRadius: '30px',
                padding: '50px',
                boxShadow: '0 25px 60px rgba(0,0,0,0.5)',
                border: '3px solid rgba(255,215,0,0.5)',
                position: 'relative'
              }}
            >
              {/* Close button */}
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  setShowWish(false)
                }}
                style={{
                  position: 'absolute',
                  top: '15px',
                  right: '15px',
                  background: 'linear-gradient(135deg, #ff6b6b 0%, #ee5a52 100%)',
                  border: 'none',
                  borderRadius: '50%',
                  width: '40px',
                  height: '40px',
                  fontSize: '24px',
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
              
              <motion.div
                animate={{ 
                  y: [0, -10, 0],
                  rotate: [0, 5, -5, 0]
                }}
                transition={{ duration: 2, repeat: Infinity }}
                style={{ fontSize: '80px', marginBottom: '20px' }}
              >
                🎉
              </motion.div>
              
              <motion.h1
                style={{
                  fontSize: '42px',
                  background: 'linear-gradient(45deg, #ffd700, #ff69b4, #4ecdc4)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  marginBottom: '20px',
                  fontFamily: 'Georgia, serif'
                }}
                animate={{
                  backgroundPosition: ['0%', '100%', '0%']
                }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                Happy Birthday!
              </motion.h1>
              
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                style={{
                  color: 'rgba(255,255,255,0.9)',
                  fontSize: '22px',
                  fontStyle: 'italic',
                  fontFamily: 'Georgia, serif'
                }}
              >
                May all your wishes come true! ✨
              </motion.p>
              
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
                style={{
                  marginTop: '30px',
                  display: 'flex',
                  justifyContent: 'center',
                  gap: '15px',
                  fontSize: '40px'
                }}
              >
                {['🎂', '🎁', '🎈', '🎊', '💖'].map((emoji, i) => (
                  <motion.span
                    key={i}
                    animate={{
                      y: [0, -15, 0],
                      rotate: [-10, 10, -10]
                    }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      delay: i * 0.2
                    }}
                  >
                    {emoji}
                  </motion.span>
                ))}
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export default BlowButton
