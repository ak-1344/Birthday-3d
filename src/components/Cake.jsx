import { useRef, useState, useEffect } from 'react'
import { useFrame } from '@react-three/fiber'

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
      {/* Candle body */}
      <mesh position={[0, 0.5, 0]}>
        <cylinderGeometry args={[0.03, 0.03, 0.3, 16]} />
        <meshStandardMaterial color="#f5deb3" />
      </mesh>
      
      {/* Wick */}
      <mesh position={[0, 0.67, 0]}>
        <cylinderGeometry args={[0.005, 0.005, 0.04, 8]} />
        <meshStandardMaterial color="#333" />
      </mesh>
      
      {/* Flame */}
      {isLit && (
        <group ref={flameRef} position={[0, 0.75, 0]}>
          {/* Inner flame (bright yellow) */}
          <mesh>
            <sphereGeometry args={[0.025, 16, 16]} />
            <meshBasicMaterial color="#ffff80" transparent opacity={0.9} />
          </mesh>
          {/* Outer flame (orange) */}
          <mesh scale={[1.3, 1.8, 1.3]}>
            <sphereGeometry args={[0.025, 16, 16]} />
            <meshBasicMaterial color="#ff6600" transparent opacity={0.6} />
          </mesh>
          {/* Point light for glow */}
          <pointLight color="#ff9900" intensity={0.3} distance={2} />
        </group>
      )}
      
      {/* Smoke particles */}
      {showSmoke && smokeParticles.map((particle) => (
        <SmokeParticle
          key={particle.id}
          delay={particle.delay}
          speed={particle.speed}
          offset={particle.offset}
          startY={0.7}
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

function Cake({ position = [0, 0, 0], onCandlesBlown }) {
  const [candlesLit, setCandlesLit] = useState([true, true, true, true, true])
  
  const candlePositions = [
    [0, 0.45, 0],
    [0.15, 0.45, 0.1],
    [-0.15, 0.45, 0.1],
    [0.1, 0.45, -0.12],
    [-0.1, 0.45, -0.12]
  ]

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

  return (
    <group position={position}>
      {/* Bottom tier */}
      <mesh position={[0, 0.1, 0]}>
        <cylinderGeometry args={[0.6, 0.65, 0.2, 32]} />
        <meshStandardMaterial color="#f8b4c4" roughness={0.3} />
      </mesh>
      
      {/* Middle tier */}
      <mesh position={[0, 0.25, 0]}>
        <cylinderGeometry args={[0.5, 0.55, 0.15, 32]} />
        <meshStandardMaterial color="#ffb6c1" roughness={0.3} />
      </mesh>
      
      {/* Top tier */}
      <mesh position={[0, 0.38, 0]}>
        <cylinderGeometry args={[0.4, 0.45, 0.12, 32]} />
        <meshStandardMaterial color="#ffc0cb" roughness={0.3} />
      </mesh>
      
      {/* Frosting details - top */}
      <mesh position={[0, 0.45, 0]}>
        <torusGeometry args={[0.35, 0.03, 8, 32]} />
        <meshStandardMaterial color="#ffffff" roughness={0.2} />
      </mesh>
      
      {/* Frosting drips */}
      {[0, 60, 120, 180, 240, 300].map((angle, i) => (
        <mesh
          key={i}
          position={[
            Math.cos((angle * Math.PI) / 180) * 0.5,
            0.2,
            Math.sin((angle * Math.PI) / 180) * 0.5
          ]}
        >
          <sphereGeometry args={[0.05, 8, 8]} />
          <meshStandardMaterial color="#ffffff" roughness={0.2} />
        </mesh>
      ))}
      
      {/* Candles */}
      {candlePositions.map((pos, index) => (
        <Candle
          key={index}
          position={pos}
          isLit={candlesLit[index]}
        />
      ))}
      
      {/* Plate */}
      <mesh position={[0, -0.02, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[0.8, 32]} />
        <meshStandardMaterial color="#e8e8e8" roughness={0.1} metalness={0.3} />
      </mesh>
      
      {/* Blow button trigger area - invisible */}
      <mesh
        position={[0, 0.5, 0]}
        onClick={blowCandles}
        visible={false}
      >
        <boxGeometry args={[1.5, 1, 1.5]} />
        <meshBasicMaterial transparent opacity={0} />
      </mesh>
    </group>
  )
}

export { Cake, Candle }
export default Cake
