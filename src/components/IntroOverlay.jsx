import { motion, AnimatePresence } from 'framer-motion'

function IntroOverlay({ isVisible, onSkip }) {
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.5 }}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 50,
            pointerEvents: 'none',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          {/* Gradient overlay for cinematic effect */}
          <motion.div
            initial={{ opacity: 0.8 }}
            animate={{ opacity: [0.8, 0.4, 0.8] }}
            transition={{ duration: 4, repeat: Infinity }}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: 'radial-gradient(circle at center, transparent 0%, rgba(0,0,0,0.6) 100%)',
              pointerEvents: 'none'
            }}
          />

          {/* Title animation */}
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            transition={{ duration: 1, delay: 0.5 }}
            style={{ textAlign: 'center', zIndex: 2 }}
          >
            <motion.h1
              style={{
                fontSize: 'clamp(32px, 8vw, 72px)',
                fontFamily: 'Georgia, serif',
                color: 'transparent',
                background: 'linear-gradient(45deg, #ffd700, #ff69b4, #4ecdc4, #ffd700)',
                backgroundSize: '300% 300%',
                WebkitBackgroundClip: 'text',
                backgroundClip: 'text',
                textShadow: '0 0 40px rgba(255,215,0,0.3)',
                marginBottom: '20px'
              }}
              animate={{
                backgroundPosition: ['0% 50%', '100% 50%', '0% 50%']
              }}
              transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
            >
              ✨ Happy Birthday ✨
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.5, duration: 1 }}
              style={{
                fontSize: 'clamp(16px, 3vw, 24px)',
                color: 'rgba(255,255,255,0.8)',
                fontStyle: 'italic',
                fontFamily: 'Georgia, serif'
              }}
            >
              Welcome to your special day!
            </motion.p>
          </motion.div>

          {/* Floating emojis */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2 }}
            style={{
              position: 'absolute',
              width: '100%',
              height: '100%',
              pointerEvents: 'none',
              overflow: 'hidden'
            }}
          >
            {['🎂', '🎁', '🎈', '🎉', '🌟', '💖', '✨', '🎊'].map((emoji, i) => (
              <motion.div
                key={i}
                initial={{
                  x: `${10 + (i * 12)}%`,
                  y: '110%',
                  opacity: 0
                }}
                animate={{
                  y: '-10%',
                  opacity: [0, 1, 1, 0],
                  rotate: [0, 360]
                }}
                transition={{
                  duration: 6 + i * 0.5,
                  repeat: Infinity,
                  delay: i * 0.8,
                  ease: 'linear'
                }}
                style={{
                  position: 'absolute',
                  fontSize: 'clamp(24px, 5vw, 48px)',
                  filter: 'drop-shadow(0 0 10px rgba(255,255,255,0.3))'
                }}
              >
                {emoji}
              </motion.div>
            ))}
          </motion.div>

          {/* Skip button */}
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2 }}
            onClick={onSkip}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            style={{
              position: 'absolute',
              bottom: '40px',
              right: '40px',
              background: 'rgba(255,255,255,0.1)',
              border: '1px solid rgba(255,255,255,0.3)',
              padding: '10px 25px',
              borderRadius: '25px',
              color: 'white',
              fontSize: '14px',
              cursor: 'pointer',
              pointerEvents: 'auto',
              backdropFilter: 'blur(5px)',
              transition: 'background 0.3s ease'
            }}
            onMouseOver={(e) => {
              e.target.style.background = 'rgba(255,255,255,0.2)'
            }}
            onMouseOut={(e) => {
              e.target.style.background = 'rgba(255,255,255,0.1)'
            }}
          >
            Skip Intro →
          </motion.button>

          {/* Loading indicator */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
            style={{
              position: 'absolute',
              bottom: '40px',
              left: '50%',
              transform: 'translateX(-50%)',
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              color: 'rgba(255,255,255,0.6)',
              fontSize: '14px'
            }}
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
              style={{
                width: '20px',
                height: '20px',
                border: '2px solid rgba(255,255,255,0.3)',
                borderTopColor: '#ffd700',
                borderRadius: '50%'
              }}
            />
            <span>Preparing your celebration...</span>
          </motion.div>

          {/* Cinematic bars */}
          <motion.div
            initial={{ height: '15%' }}
            animate={{ height: ['15%', '10%', '15%'] }}
            transition={{ duration: 8, repeat: Infinity }}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              background: 'linear-gradient(to bottom, #000, transparent)'
            }}
          />
          <motion.div
            initial={{ height: '15%' }}
            animate={{ height: ['15%', '10%', '15%'] }}
            transition={{ duration: 8, repeat: Infinity }}
            style={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
              background: 'linear-gradient(to top, #000, transparent)'
            }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default IntroOverlay
