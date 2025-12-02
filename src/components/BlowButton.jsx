import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

function BlowButton({ onBlow, disabled = false, candlesExtinguished = false }) {
  const [isBlowing, setIsBlowing] = useState(false)
  const [showWish, setShowWish] = useState(false)

  const handleBlow = () => {
    if (disabled || isBlowing) return
    
    setIsBlowing(true)
    
    // Trigger the blow animation
    if (onBlow) {
      onBlow()
    }

    // Show wish message after candles are extinguished
    setTimeout(() => {
      setIsBlowing(false)
      setShowWish(true)
    }, 1500)
  }

  return (
    <>
      <AnimatePresence>
        {!candlesExtinguished && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            transition={{ duration: 0.5 }}
            style={{
              position: 'fixed',
              bottom: '40px',
              left: '50%',
              transform: 'translateX(-50%)',
              zIndex: 100,
              textAlign: 'center'
            }}
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
              pointerEvents: 'none'
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
                border: '3px solid rgba(255,215,0,0.5)'
              }}
            >
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
