import { useRef, useState, useEffect, useImperativeHandle, forwardRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { data } from '../data'

function Candle({ position, isLit }) {
  const flameRef = useRef()
  const [showSmoke, setShowSmoke] = useState(false)
  const [smokeParticles, setSmokeParticles] = useState([])

  useEffect(() => {
    if (!isLit && !showSmoke) {
      setShowSmoke(true)
      // Create smoke particles
      const particles = Array.from({ length: 8 }, (_, i) => ({
        id: i,
        delay: i * 0.1,
        speed: 0.3 + Math.random() * 0.2,
        offset: (Math.random() - 0.5) * 0.3
      }))
      setSmokeParticles(particles)
      
      // Hide smoke after animation
      setTimeout(() => setShowSmoke(false), 2000)
    }
  }, [isLit, showSmoke])

  useFrame((state) => {
    if (flameRef.current && isLit) {
      // Animate flame flickering
      const time = state.clock.getElapsedTime()
      flameRef.current.scale.x = 0.8 + Math.sin(time * 10) * 0.2
      flameRef.current.scale.y = 1 + Math.sin(time * 15) * 0.3
      flameRef.current.position.x = Math.sin(time * 8) * 0.02
    }
  })

  return (
    <group position={position}>
      {/* Candle body - realistic wax texture */}
      <mesh position={[0, 0.15, 0]} castShadow>
        <cylinderGeometry args={[0.025, 0.028, 0.3, 16]} />
        <meshStandardMaterial 
          color="#fef5e7" 
          roughness={0.6}
        />
      </mesh>
      
      {/* Melted wax on sides */}
      {!isLit && Math.random() > 0.5 && (
        <>
          <mesh position={[0.015, 0.25, 0]}>
            <sphereGeometry args={[0.008, 8, 8]} />
            <meshStandardMaterial color="#fef5e7" roughness={0.7} />
          </mesh>
          <mesh position={[-0.012, 0.22, 0.01]}>
            <sphereGeometry args={[0.006, 8, 8]} />
            <meshStandardMaterial color="#fef5e7" roughness={0.7} />
          </mesh>
        </>
      )}
      
      {/* Wick */}
      <mesh position={[0, 0.32, 0]}>
        <cylinderGeometry args={[0.004, 0.004, 0.05, 8]} />
        <meshStandardMaterial color="#1a1a1a" roughness={0.9} />
      </mesh>
      
      {/* Flame */}
      {isLit && (
        <group ref={flameRef} position={[0, 0.38, 0]}>
          {/* Inner flame core (bright yellow-white) */}
          <mesh scale={[0.8, 1.2, 0.8]}>
            <sphereGeometry args={[0.02, 16, 16]} />
            <meshBasicMaterial color="#ffffcc" transparent opacity={1} />
          </mesh>
          {/* Middle flame (yellow-orange) */}
          <mesh scale={[1, 1.5, 1]}>
            <sphereGeometry args={[0.022, 16, 16]} />
            <meshBasicMaterial color="#ffaa00" transparent opacity={0.8} />
          </mesh>
          {/* Outer flame (orange-red) */}
          <mesh scale={[1.2, 2, 1.2]}>
            <sphereGeometry args={[0.025, 16, 16]} />
            <meshBasicMaterial color="#ff6600" transparent opacity={0.5} />
          </mesh>
          {/* Point light for realistic glow */}
          <pointLight 
            color="#ffaa44" 
            intensity={0.8} 
            distance={1.5} 
            decay={2}
          />
        </group>
      )}
      
      {/* Smoke particles */}
      {showSmoke && smokeParticles.map((particle) => (
        <SmokeParticle
          key={particle.id}
          delay={particle.delay}
          speed={particle.speed}
          offset={particle.offset}
          startY={0.35}
        />
      ))}
    </group>
  )
}

function SmokeParticle({ delay, speed, offset, startY }) {
  const ref = useRef()
  const [opacity, setOpacity] = useState(0)

  useFrame((state) => {
    if (ref.current) {
      const time = state.clock.getElapsedTime()
      const localTime = Math.max(0, time - delay)
      
      if (localTime > 0 && localTime < 2) {
        ref.current.position.y = startY + localTime * speed
        ref.current.position.x = offset + Math.sin(localTime * 3) * 0.1
        ref.current.scale.setScalar(0.5 + localTime * 0.5)
        setOpacity(Math.max(0, 0.6 - localTime * 0.3))
      }
    }
  })

  return (
    <mesh ref={ref} position={[offset, startY, 0]}>
      <sphereGeometry args={[0.05, 8, 8]} />
      <meshBasicMaterial color="#888888" transparent opacity={opacity} />
    </mesh>
  )
}

function Cake({ position = [0, 0, 0], onCandlesBlown }, ref) {
  // Get candle count from data (defaults to age, or 5 if not set)
  const age = data.personAge || 5
  const candleCount = data.candleCount || age
  
  // Generate candle positions in a circle
  const generateCandlePositions = (count) => {
    const positions = []
    const radius = 0.15  // Adjusted for smaller top tier
    
    if (count === 1) {
      return [[0, 0.66, 0]]
    }
    
    for (let i = 0; i < count; i++) {
      const angle = (i / count) * Math.PI * 2
      positions.push([
        Math.cos(angle) * radius,
        0.66,  // Top of the cake
        Math.sin(angle) * radius
      ])
    }
    return positions
  }
  
  const candlePositions = generateCandlePositions(candleCount)
  const [candlesLit, setCandlesLit] = useState(new Array(candleCount).fill(true))

  const blowCandles = () => {
    if (candlesLit.some(lit => lit)) {
      // Extinguish candles one by one with slight delay
      candlesLit.forEach((lit, index) => {
        if (lit) {
          setTimeout(() => {
            setCandlesLit(prev => {
              const newState = [...prev]
              newState[index] = false
              return newState
            })
          }, index * 200 + Math.random() * 300)
        }
      })
      
      setTimeout(() => {
        if (onCandlesBlown) onCandlesBlown()
      }, 1500)
    }
  }

  // Expose blowCandles method to parent via ref
  useImperativeHandle(ref, () => ({
    blowCandles
  }))

  return (
    <group position={position}>
      {/* Base cake board/plate */}
      <mesh position={[0, -0.05, 0]} receiveShadow>
        <cylinderGeometry args={[0.42, 0.42, 0.03, 32]} />
        <meshStandardMaterial 
          color="#f5f5f5" 
          roughness={0.2} 
          metalness={0.6}
        />
      </mesh>

      {/* Bottom tier - largest */}
      <group>
        {/* Main cake layer */}
        <mesh position={[0, 0.1, 0]} castShadow receiveShadow>
          <cylinderGeometry args={[0.45, 0.49, 0.2, 64]} />
          <meshStandardMaterial 
            color="#704214"
            roughness={0.4}
          />
        </mesh>
        
        {/* Frosting layer */}
        <mesh position={[0, 0.2, 0]}>
          <cylinderGeometry args={[0.48, 0.48, 0.01, 64]} />
          <meshStandardMaterial color="#ffc0cb" roughness={0.2} />
        </mesh>
        
        {/* Frosting drips around bottom tier */}
        {Array.from({ length: 16 }).map((_, i) => {
          const angle = (i / 16) * Math.PI * 2
          const radius = 0.48
          return (
            <mesh
              key={`drip-bottom-${i}`}
              position={[
                Math.cos(angle) * radius,
                0.19 - Math.random() * 0.07,
                Math.sin(angle) * radius
              ]}
            >
              <sphereGeometry args={[0.03, 8, 8]} />
              <meshStandardMaterial color="#ffe4e1" roughness={0.2} />
            </mesh>
          )
        })}
      </group>

      {/* Middle tier */}
      <group>
        <mesh position={[0, 0.37, 0]} castShadow receiveShadow>
          <cylinderGeometry args={[0.35, 0.37, 0.2, 64]} />
          <meshStandardMaterial 
            color="#704214"
            roughness={0.4}
          />
        </mesh>
        
        <mesh position={[0, 0.47, 0]}>
          <cylinderGeometry args={[0.37, 0.37, 0.01, 64]} />
          <meshStandardMaterial color="#fff0f5" roughness={0.2} />
        </mesh>
        
        {/* Frosting drips around middle tier */}
        {Array.from({ length: 12 }).map((_, i) => {
          const angle = (i / 12) * Math.PI * 2
          const radius = 0.37
          return (
            <mesh
              key={`drip-middle-${i}`}
              position={[
                Math.cos(angle) * radius,
                0.43 - Math.random() * 0.06,
                Math.sin(angle) * radius
              ]}
            >
              <sphereGeometry args={[0.025, 8, 8]} />
              <meshStandardMaterial color="#fff0f5" roughness={0.2} />
            </mesh>
          )
        })}
      </group>

      {/* Top tier */}
      <group>
        <mesh position={[0, 0.58, 0]} castShadow receiveShadow>
          <cylinderGeometry args={[0.24, 0.27, 0.16, 64]} />
          <meshStandardMaterial 
            color="#5d2906"
            roughness={0.4}
          />
        </mesh>
        
        <mesh position={[0, 0.66, 0]}>
          <cylinderGeometry args={[0.26, 0.26, 0.01, 64]} />
          <meshStandardMaterial color="#fffaf0" roughness={0.2} />
        </mesh>
        
        {/* Frosting drips around top tier */}
        {Array.from({ length: 10 }).map((_, i) => {
          const angle = (i / 10) * Math.PI * 2
          const radius = 0.26
          return (
            <mesh
              key={`drip-top-${i}`}
              position={[
                Math.cos(angle) * radius,
                0.62 - Math.random() * 0.05,
                Math.sin(angle) * radius
              ]}
            >
              <sphereGeometry args={[0.02, 8, 8]} />
              <meshStandardMaterial color="#fffaf0" roughness={0.2} />
            </mesh>
          )
        })}
      </group>

      {/* Decorative rosettes on middle tier */}
      {Array.from({ length: 8 }).map((_, i) => {
        const angle = (i / 8) * Math.PI * 2
        const radius = 0.38
        return (
          <mesh
            key={`rosette-${i}`}
            position={[
              Math.cos(angle) * radius,
              0.42,
              Math.sin(angle) * radius
            ]}
          >
            <sphereGeometry args={[0.04, 12, 12]} />
            <meshStandardMaterial color="#ff69b4" roughness={0.3} />
          </mesh>
        )
      })}

      {/* Candles */}
      {candlePositions.map((pos, index) => (
        <Candle
          key={index}
          position={pos}
          isLit={candlesLit[index]}
        />
      ))}
    </group>
  )
}

export default forwardRef(Cake)
