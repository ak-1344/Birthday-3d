import { useRef, useState, useEffect } from 'react'
import { useFrame } from '@react-three/fiber'
import { Float, Html } from '@react-three/drei'
import * as THREE from 'three'
import birthdayMusic from '/birthday-music.mp3?url'

// Seeded random for consistent confetti generation with better distribution
function seededRandom(seed) {
  const x = Math.sin(seed * 12.9898) * 43758.5453
  return x - Math.floor(x)
}

// Wooden table for the cake and decorations
function Table() {
  return (
    <group position={[0, 0, 0]}>
      {/* Table top - rectangular */}
      <mesh position={[0, -0.1, 0]} receiveShadow castShadow>
        <boxGeometry args={[2.8, 0.08, 1.8]} />
        <meshStandardMaterial 
          color="#3d2817" 
          roughness={0.6}
          metalness={0.1}
        />
      </mesh>
      
      {/* Table edge trim */}
      <mesh position={[0, -0.07, 0]}>
        <boxGeometry args={[2.85, 0.03, 1.85]} />
        <meshStandardMaterial color="#2a1810" roughness={0.7} />
      </mesh>
      
      {/* Four table legs */}
      {[
        [-1.2, -0.6, -0.75],
        [1.2, -0.6, -0.75],
        [-1.2, -0.6, 0.75],
        [1.2, -0.6, 0.75]
      ].map((pos, i) => (
        <group key={i} position={pos}>
          {/* Main leg */}
          <mesh castShadow>
            <boxGeometry args={[0.1, 1, 0.1]} />
            <meshStandardMaterial 
              color="#2a1810" 
              roughness={0.7}
            />
          </mesh>
          {/* Leg foot */}
          <mesh position={[0, -0.52, 0]}>
            <boxGeometry args={[0.15, 0.04, 0.15]} />
            <meshStandardMaterial color="#2a1810" roughness={0.7} />
          </mesh>
        </group>
      ))}
    </group>
  )
}

// Gift box on table
function GiftBox({ position, size = [0.25, 0.25, 0.25], color = "#e74c3c", ribbonColor = "#ffd700" }) {
  const [hovered, setHovered] = useState(false)
  const [clicked, setClicked] = useState(false)
  const groupRef = useRef()
  
  useFrame((state) => {
    if (groupRef.current && hovered) {
      groupRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 3) * 0.02
    } else if (groupRef.current) {
      groupRef.current.position.y = position[1]
    }
  })

  const handleClick = (e) => {
    e.stopPropagation()
    setClicked(true)
    setTimeout(() => setClicked(false), 3000)
  }

  return (
    <group 
      ref={groupRef}
      position={position}
      onClick={handleClick}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      {/* Box body */}
      <mesh position={[0, size[1] / 2, 0]} castShadow receiveShadow>
        <boxGeometry args={size} />
        <meshStandardMaterial 
          color={hovered ? new THREE.Color(color).multiplyScalar(1.2) : color} 
          roughness={0.4} 
          metalness={0.1} 
        />
      </mesh>
      
      {/* Ribbon horizontal */}
      <mesh position={[0, size[1] / 2, 0]} castShadow>
        <boxGeometry args={[size[0] + 0.01, size[1] + 0.01, size[2] * 0.15]} />
        <meshStandardMaterial color={ribbonColor} roughness={0.2} metalness={0.3} />
      </mesh>
      
      {/* Ribbon vertical */}
      <mesh position={[0, size[1] / 2, 0]} castShadow>
        <boxGeometry args={[size[0] * 0.15, size[1] + 0.01, size[2] + 0.01]} />
        <meshStandardMaterial color={ribbonColor} roughness={0.2} metalness={0.3} />
      </mesh>
      
      {/* Bow on top */}
      <mesh position={[0, size[1] + 0.03, 0]} castShadow>
        <sphereGeometry args={[0.04, 8, 8]} />
        <meshStandardMaterial color={ribbonColor} roughness={0.2} />
      </mesh>
      <mesh position={[-0.05, size[1] + 0.04, 0]} rotation={[0, 0, 0.5]} castShadow>
        <boxGeometry args={[0.08, 0.02, 0.04]} />
        <meshStandardMaterial color={ribbonColor} roughness={0.2} />
      </mesh>
      <mesh position={[0.05, size[1] + 0.04, 0]} rotation={[0, 0, -0.5]} castShadow>
        <boxGeometry args={[0.08, 0.02, 0.04]} />
        <meshStandardMaterial color={ribbonColor} roughness={0.2} />
      </mesh>

      {/* Clickable message popup */}
      {clicked && (
        <Html
          position={[0, size[1] + 0.3, 0]}
          center
          distanceFactor={1}
          style={{
            pointerEvents: 'none',
            userSelect: 'none'
          }}
        >
          <div
            style={{
              position: 'relative',
              background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
              color: 'white',
              padding: '12px 24px',
              borderRadius: '16px',
              fontSize: '68px',
              fontWeight: 'bold',
              fontFamily: 'Georgia, serif',
              boxShadow: '0 4px 15px rgba(245, 87, 108, 0.5)',
              whiteSpace: 'nowrap',
              animation: 'giftBounce 0.5s ease-out, giftFade 3s ease-in-out',
              border: '2px solid rgba(255, 255, 255, 0.4)'
            }}
          >
            🎁 Getting greedy huh??
            {/* Speech bubble tail */}
            <div
              style={{
                position: 'absolute',
                bottom: '-8px',
                left: '50%',
                transform: 'translateX(-50%)',
                width: '0',
                height: '0',
                borderLeft: '8px solid transparent',
                borderRight: '8px solid transparent',
                borderTop: '8px solid #f5576c'
              }}
            />
          </div>
          <style>
            {`
              @keyframes giftBounce {
                0% { transform: scale(0) translateY(20px); opacity: 0; }
                50% { transform: scale(1.1) translateY(-5px); }
                100% { transform: scale(1) translateY(0); opacity: 1; }
              }
              @keyframes giftFade {
                0%, 80% { opacity: 1; }
                100% { opacity: 0; }
              }
            `}
          </style>
        </Html>
      )}

      {/* Hover glow effect */}
      {hovered && !clicked && (
        <pointLight 
          position={[0, size[1] / 2, 0]} 
          color={ribbonColor} 
          intensity={0.5} 
          distance={0.5} 
        />
      )}
    </group>
  )
}

// Birthday letter/card on table - lying flat
function BirthdayLetter({ position, onClick, letterClicked = false }) {
  const [hovered, setHovered] = useState(false)
  
  return (
    <group 
      position={position}
      onClick={onClick}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      {/* Paper lying flat on table - larger and more visible */}
      <mesh position={[0, 0.01, 0]} rotation={[-Math.PI / 2, 0, -0.05]} receiveShadow castShadow>
        <planeGeometry args={[0.55, 0.7]} />
        <meshStandardMaterial 
          color={hovered ? "#fffef0" : "#fffef5"} 
          roughness={0.4}
          side={THREE.DoubleSide}
        />
      </mesh>
      
      {/* Text lines on paper (decorative) - more prominent */}
      {[0, 0.08, 0.16, 0.24, 0.32].map((offset, i) => (
        <mesh 
          key={i}
          position={[0, 0.011, -0.18 + offset]} 
          rotation={[-Math.PI / 2, 0, -0.05]}
        >
          <planeGeometry args={[0.42, 0.015]} />
          <meshBasicMaterial color="#8b8b8b" opacity={0.7} transparent />
        </mesh>
      ))}
      
      {/* Title area - larger */}
      <mesh position={[0, 0.012, -0.28]} rotation={[-Math.PI / 2, 0, -0.05]}>
        <planeGeometry args={[0.35, 0.04]} />
        <meshBasicMaterial color="#b8860b" opacity={0.8} transparent />
      </mesh>
      
      {/* Hover indicator glow */}
      
      {hovered && (
        <mesh position={[0, 0.011, 0]} rotation={[-Math.PI / 2, 0, -0.05]}>
          <planeGeometry args={[0.6, 0.75]} />
          <meshBasicMaterial 
            color="#ffd700" 
            transparent 
            opacity={0.3}
            side={THREE.DoubleSide}
          />
        </mesh>
      )}
      
      {/* Small decorative corner fold */}
      <mesh position={[0.24, 0.011, -0.32]} rotation={[-Math.PI / 2, 0, -0.4]}>
        <planeGeometry args={[0.06, 0.06]} />
        <meshStandardMaterial color="#f5f0e8" roughness={0.5} side={THREE.DoubleSide} />
      </mesh>

      {/* "Read Me" Speech Bubble - only show if not clicked yet */}
      {!letterClicked && (
        <Html
          position={[0.15, 0.25, 0.02]}
          center
          distanceFactor={1}
          style={{
            pointerEvents: 'none',
            userSelect: 'none'
          }}
        >
        <div
          style={{
            position: 'relative',
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            color: 'white',
            padding: '18px 36px',
            borderRadius: '20px',
            fontSize: '44px',
            fontWeight: 'bold',
            fontFamily: 'Georgia, serif',
            boxShadow: '0 4px 15px rgba(102, 126, 234, 0.4)',
            whiteSpace: 'nowrap',
            animation: 'bounce 2s ease-in-out infinite, pulse 2s ease-in-out infinite',
            border: '2px solid rgba(255, 255, 255, 0.3)'
          }}
        >
          📖 Read Me
          {/* Speech bubble tail */}
          <div
            style={{
              position: 'absolute',
              bottom: '-8px',
              left: '20px',
              width: '0',
              height: '0',
              borderLeft: '8px solid transparent',
              borderRight: '8px solid transparent',
              borderTop: '8px solid #764ba2'
            }}
          />
        </div>
        <style>
          {`
            @keyframes bounce {
              0%, 100% { transform: translateY(0px); }
              50% { transform: translateY(-8px); }
            }
            @keyframes pulse {
              0%, 100% { opacity: 0.9; }
              50% { opacity: 1; }
            }
          `}
        </style>
      </Html>
      )}
    </group>
  )
}

// Simple flower decoration
function Flower({ position, color = "#ff69b4" }) {
  return (
    <group position={position}>
      {/* Flower petals */}
      {[0, 72, 144, 216, 288].map((angle, i) => {
        const rad = (angle * Math.PI) / 180
        return (
          <mesh 
            key={i}
            position={[Math.cos(rad) * 0.025, 0.08, Math.sin(rad) * 0.025]}
            castShadow
          >
            <sphereGeometry args={[0.02, 8, 8]} />
            <meshStandardMaterial color={color} roughness={0.4} />
          </mesh>
        )
      })}
      {/* Center */}
      <mesh position={[0, 0.08, 0]} castShadow>
        <sphereGeometry args={[0.015, 8, 8]} />
        <meshStandardMaterial color="#ffd700" roughness={0.3} />
      </mesh>
      {/* Stem */}
      <mesh position={[0, 0.04, 0]} castShadow>
        <cylinderGeometry args={[0.003, 0.003, 0.08, 8]} />
        <meshStandardMaterial color="#2d5016" roughness={0.7} />
      </mesh>
    </group>
  )
}

// Floating balloon decoration
function Balloon({ position, color = "#ff6b6b" }) {
  const balloonRef = useRef()
  
  useFrame((state) => {
    if (balloonRef.current) {
      balloonRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 0.5 + position[0]) * 0.1
      balloonRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.3 + position[2]) * 0.1
    }
  })
  
  return (
    <group ref={balloonRef} position={position}>
      {/* Balloon body */}
      <mesh position={[0, 0, 0]} castShadow>
        <sphereGeometry args={[0.15, 32, 32]} />
        <meshStandardMaterial 
          color={color} 
          roughness={0.2}
          metalness={0.6}
        />
      </mesh>
      
      {/* Balloon knot */}
      <mesh position={[0, -0.16, 0]}>
        <sphereGeometry args={[0.02, 16, 16]} />
        <meshStandardMaterial color={color} roughness={0.4} />
      </mesh>
      
      {/* String */}
      <mesh position={[0, -0.5, 0]}>
        <cylinderGeometry args={[0.002, 0.002, 0.7, 8]} />
        <meshStandardMaterial color="#e0e0e0" />
      </mesh>
    </group>
  )
}

// Shelf for room decoration
function Shelf({ position }) {
  return (
    <group position={position}>
      <mesh castShadow receiveShadow>
        <boxGeometry args={[1.5, 0.05, 0.3]} />
        <meshStandardMaterial color="#6d4c41" roughness={0.7} />
      </mesh>
      {/* Shelf brackets */}
      <mesh position={[-0.65, -0.1, 0]}>
        <boxGeometry args={[0.08, 0.2, 0.25]} />
        <meshStandardMaterial color="#4e342e" roughness={0.8} />
      </mesh>
      <mesh position={[0.65, -0.1, 0]}>
        <boxGeometry args={[0.08, 0.2, 0.25]} />
        <meshStandardMaterial color="#4e342e" roughness={0.8} />
      </mesh>
    </group>
  )
}

// Small Music System
function SmallMusicSystem({ position, audioRef, isPlaying, setIsPlaying, showMusicButton, setShowMusicButton }) {
  const [hovered, setHovered] = useState(false)
  
  const handleClick = (e) => {
    e.stopPropagation()
    
    if (!audioRef.current) {
      // Initialize audio on first click
      audioRef.current = new Audio(birthdayMusic)
      audioRef.current.loop = true
      audioRef.current.volume = 0.5
    }
    
    if (isPlaying) {
      audioRef.current.pause()
      setIsPlaying(false)
    } else {
      audioRef.current.play().catch(err => {
        console.log('Audio play failed:', err)
      })
      setIsPlaying(true)
    }
  }
  
  const handleStopMusic = () => {
    if (audioRef.current) {
      audioRef.current.pause()
      setIsPlaying(false)
    }
    setShowMusicButton(false)
  }
  
  return (
    <group 
      position={position} 
      rotation={[0, Math.PI / 4, 0]}
      onClick={handleClick}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      {/* Main unit */}
      <mesh castShadow receiveShadow position={[0, 0.25, 0]}>
        <boxGeometry args={[0.6, 0.45, 0.4]} />
        <meshStandardMaterial 
          color={hovered ? "#2a2a2a" : "#1a1a1a"} 
          roughness={0.3} 
        />
      </mesh>
      
      {/* Speaker cone */}
      <mesh position={[0, 0.25, 0.21]} castShadow>
        <cylinderGeometry args={[0.12, 0.11, 0.06, 32]} />
        <meshStandardMaterial color="#333333" roughness={0.5} />
      </mesh>
      
      {/* Display/LED - changes color when playing */}
      <mesh position={[0, 0.42, 0.21]}>
        <planeGeometry args={[0.15, 0.03]} />
        <meshBasicMaterial 
          color={isPlaying ? "#ff4444" : "#00ff88"}
        />
      </mesh>
      
      {/* Hover indicator */}
      {hovered && (
        <mesh position={[0, 0.2, 0.2]}>
          <ringGeometry args={[0.15, 0.17, 32]} />
          <meshBasicMaterial color="#ffffff" transparent opacity={0.5} />
        </mesh>
      )}
      
      {/* Stop music button overlay */}
      {showMusicButton && (
        <Html position={[0, 0.6, 0]} center>
          <button
            onClick={(e) => {
              e.stopPropagation()
              handleStopMusic()
            }}
            style={{
              padding: '8px 16px',
              backgroundColor: 'rgba(255, 68, 68, 0.9)',
              color: 'white',
              border: '2px solid rgba(255, 255, 255, 0.3)',
              borderRadius: '8px',
              cursor: 'pointer',
              fontSize: '12px',
              fontFamily: 'Georgia, serif',
              fontWeight: 'bold',
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)',
              transition: 'all 0.3s ease',
              whiteSpace: 'nowrap'
            }}
            onMouseEnter={(e) => {
              e.target.style.backgroundColor = 'rgba(255, 30, 30, 1)'
              e.target.style.transform = 'scale(1.05)'
            }}
            onMouseLeave={(e) => {
              e.target.style.backgroundColor = 'rgba(255, 68, 68, 0.9)'
              e.target.style.transform = 'scale(1)'
            }}
          >
            🔇 Stop Music
          </button>
        </Html>
      )}
    </group>
  )
}

// Hanging pendant lamp
function HangingLamp() {
  const lampRef = useRef()
  
  useFrame((state) => {
    if (lampRef.current) {
      // Subtle swaying motion
      lampRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.5) * 0.02
    }
  })
  
  return (
    <group ref={lampRef} position={[0, 7.2, 0]}>
      {/* Ceiling mount */}
      <mesh position={[0, -0.05, 0]}>
        <cylinderGeometry args={[0.04, 0.04, 0.1, 16]} />
        <meshStandardMaterial color="#1a1a1a" metalness={0.8} roughness={0.2} />
      </mesh>
      
      {/* Wire/cord - longer to reach table area */}
      <mesh position={[0, -2.0, 0]}>
        <cylinderGeometry args={[0.005, 0.005, 2.0, 8]} />
        <meshStandardMaterial color="#0a0a0a" roughness={0.8} />
      </mesh>
      
      {/* Lamp shade - industrial pendant style */}
      <group position={[0, -3.7, 0]}>
        {/* Outer shade */}
        <mesh rotation={[0, 0, 0]}>
          <coneGeometry args={[0.35, 0.4, 32, 1, true]} />
          <meshStandardMaterial 
            color="#1a1a1a"
            side={THREE.DoubleSide}
            roughness={0.5}
            metalness={0.3}
          />
        </mesh>
        
        {/* Inner reflective surface */}
        <mesh rotation={[Math.PI, 0, 0]} position={[0, 0.05, 0]}>
          <coneGeometry args={[0.33, 0.38, 32, 1, true]} />
          <meshStandardMaterial 
            color="#f5f5f5"
            side={THREE.FrontSide}
            roughness={0.1}
            metalness={0.8}
            emissive="#fff5e6"
            emissiveIntensity={0.2}
          />
        </mesh>
        
        {/* Bulb (visible glow) */}
        <mesh position={[0, -0.15, 0]}>
          <sphereGeometry args={[0.08, 16, 16]} />
          <meshBasicMaterial color="#fffacd" transparent opacity={0.9} />
        </mesh>
        
        {/* Main spotlight - focused on cake */}
        <spotLight
          position={[0, -0.2, 0]}
          angle={1.3}
          penumbra={0.5}
          intensity={25}
          distance={6.5}
          color="#fff5e6"
          castShadow
          shadow-mapSize-width={2048}
          shadow-mapSize-height={2048}
          shadow-bias={-0.0001}
          target-position={[0, -0.5, 0]}
        />
        
        {/* Ambient glow from lamp */}
        <pointLight
          position={[0, -0.1, 0]}
          intensity={4}
          distance={5}
          color="#fff5e6"
          decay={2}
        />
      </group>
    </group>
  )
}

// Room walls and floor
function Room() {
  return (
    <group>
      {/* Floor - wooden planks */}
      <mesh position={[0, -0.95, 0]} receiveShadow rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[20, 20]} />
        <meshStandardMaterial 
          color="#5c4033"
          roughness={0.8}
          metalness={0.05}
        />
      </mesh>
      
      {/* Back wall - warmer color */}
      <mesh position={[0, 2, -9]} receiveShadow>
        <planeGeometry args={[12, 7]} />
        <meshStandardMaterial 
          color="#e8d4b8"
          roughness={0.9}
        />
      </mesh>
      
      {/* Left wall */}
      <mesh position={[-6, 2, 0]} rotation={[0, Math.PI / 2, 0]} receiveShadow>
        <planeGeometry args={[18, 7]} />
        <meshStandardMaterial 
          color="#f5e6d3"
          roughness={0.9}
        />
      </mesh>
      
      {/* Right wall */}
      <mesh position={[6, 2, 0]} rotation={[0, -Math.PI / 2, 0]} receiveShadow>
        <planeGeometry args={[18, 7]} />
        <meshStandardMaterial 
          color="#f5e6d3"
          roughness={0.9}
        />
      </mesh>
      
      {/* Ceiling */}
      <mesh position={[0, 5.5, 0]} rotation={[Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[20, 20]} />
        <meshStandardMaterial 
          color="#ffffff"
          roughness={0.8}
        />
      </mesh>
      
      {/* Ceiling decorations - Crown molding */}
      <mesh position={[0, 5.45, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[4.5, 0.08, 16, 64]} />
        <meshStandardMaterial color="#f8f8f8" roughness={0.6} />
      </mesh>
      <mesh position={[0, 5.45, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[3.5, 0.06, 16, 64]} />
        <meshStandardMaterial color="#f0f0f0" roughness={0.6} />
      </mesh>
      
      {/* Ceiling center medallion */}
      <mesh position={[0, 5.44, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.6, 0.6, 0.02, 32]} />
        <meshStandardMaterial color="#fafafa" roughness={0.5} />
      </mesh>
      {Array.from({ length: 8 }).map((_, i) => {
        const angle = (i / 8) * Math.PI * 2
        return (
          <mesh 
            key={i}
            position={[
              Math.cos(angle) * 0.5, 
              5.44, 
              Math.sin(angle) * 0.5
            ]} 
            rotation={[Math.PI / 2, 0, angle]}
          >
            <boxGeometry args={[0.15, 0.02, 0.3]} />
            <meshStandardMaterial color="#f5f5f5" roughness={0.6} />
          </mesh>
        )
      })}
      
      {/* Baseboard trim on back wall */}
      <mesh position={[0, -0.8, -8.95]}>
        <boxGeometry args={[19.8, 0.15, 0.1]} />
        <meshStandardMaterial color="#1a1a1a" roughness={0.6} />
      </mesh>
    </group>
  )
}

function Confetti({ count = 100 }) {
  const [particles, setParticles] = useState([])
  
  // Initialize particles on mount
  useEffect(() => {
    const colors = [
      '#ff6b6b', '#4ecdc4', '#45b7d1', '#ffd93d', 
      '#ff69b4', '#9b59b6', '#3498db', '#2ecc71'
    ]
    
    const temp = []
    for (let i = 0; i < count; i++) {
      const seed = i * 1234.5678
      temp.push({
        position: [
          (seededRandom(seed) - 0.5) * 8,
          seededRandom(seed + 1) * 6 + 3,
          (seededRandom(seed + 2) - 0.5) * 8
        ],
        rotation: [
          seededRandom(seed + 3) * Math.PI,
          seededRandom(seed + 4) * Math.PI,
          seededRandom(seed + 5) * Math.PI
        ],
        scale: 0.05 + seededRandom(seed + 6) * 0.08,
        speed: 0.2 + seededRandom(seed + 7) * 0.3,
        wobble: seededRandom(seed + 8) * 2,
        color: colors[Math.floor(seededRandom(seed + 9) * 8)]
      })
    }
    setParticles(temp)
  }, [count])

  useFrame((state) => {
    particles.forEach((particle) => {
      const time = state.clock.getElapsedTime()
      particle.position[1] -= particle.speed * 0.02
      particle.position[0] += Math.sin(time + particle.wobble) * 0.01
      particle.rotation[0] += 0.02
      particle.rotation[2] += 0.01
      
      // Reset position when fallen
      if (particle.position[1] < -2) {
        particle.position[1] = 10 + Math.random() * 5
        particle.position[0] = (Math.random() - 0.5) * 15
      }
    })
  })

  return (
    <group>
      {particles.map((particle, i) => (
        <mesh
          key={i}
          position={particle.position}
          rotation={particle.rotation}
          scale={particle.scale}
        >
          <planeGeometry args={[1, 1]} />
          <meshBasicMaterial 
            color={particle.color} 
            side={THREE.DoubleSide}
            transparent
            opacity={0.8}
          />
        </mesh>
      ))}
    </group>
  )
}

function PartyLights() {
  const lightsRef = useRef([])
  
  const lightPositions = [
    { position: [-4, 4, 2], color: '#ff6b6b' },
    { position: [4, 4, 2], color: '#4ecdc4' },
    { position: [0, 5, -3], color: '#ffd93d' },
    { position: [-3, 3, -4], color: '#ff69b4' },
    { position: [3, 3, -4], color: '#9b59b6' }
  ]

  useFrame((state) => {
    const time = state.clock.getElapsedTime()
    lightsRef.current.forEach((light, i) => {
      if (light) {
        light.intensity = 0.3 + Math.sin(time * 2 + i) * 0.2
      }
    })
  })

  return (
    <group>
      {lightPositions.map((light, i) => (
        <pointLight
          key={i}
          ref={(el) => (lightsRef.current[i] = el)}
          position={light.position}
          color={light.color}
          intensity={0.5}
          distance={10}
        />
      ))}
    </group>
  )
}

function Environment({ showConfetti = false, onLetterClick, letterClicked = false, isLitUp = false }) {
  const audioRef = useRef(null)
  const [isPlaying, setIsPlaying] = useState(true)
  const [showMusicButton, setShowMusicButton] = useState(true)
  
  // Auto-play music on component mount
  useEffect(() => {
    const timer = setTimeout(() => {
      if (!audioRef.current) {
        audioRef.current = new Audio(birthdayMusic)
        audioRef.current.loop = true
        audioRef.current.volume = 0.5
      }
      audioRef.current.play().catch(err => {
        console.log('Audio autoplay failed:', err)
        setIsPlaying(false)
      })
    }, 1000) // Small delay to ensure user interaction
    
    return () => {
      clearTimeout(timer)
      if (audioRef.current) {
        audioRef.current.pause()
      }
    }
  }, [])
  
  // Lighting configurations
  const lightConfig = isLitUp ? {
    ambient: { intensity: 1.5, color: "#ffffff" },
    fill1: { intensity: 2.5, distance: 10, color: "#ffffff" },
    fill2: { intensity: 2.0, distance: 9, color: "#fffaec" },
    fill3: { intensity: 1.8, distance: 8, color: "#ffffff" }
  } : {
    ambient: { intensity: 3.7, color: "#2a2a3a" },
    fill1: { intensity: 0.8, distance: 8, color: "#fff5e6" },
    fill2: { intensity: 0.6, distance: 7, color: "#fffaec" },
    fill3: { intensity: 0.5, distance: 6, color: "#3a3a4a" }
  }
  
  return (
    <group>
      {/* Ambient light - adjustable based on toggle */}
      <ambientLight intensity={lightConfig.ambient.intensity} color={lightConfig.ambient.color} />
      
      {/* Fill lights positioned near lamp to simulate bounce light */}
      <pointLight 
        position={[-2, 2.5, 1]} 
        intensity={lightConfig.fill1.intensity} 
        distance={lightConfig.fill1.distance}
        color={lightConfig.fill1.color}
      />
      
      {/* Additional fill lights around room edges */}
      <pointLight 
        position={[2, 2, 1]} 
        intensity={lightConfig.fill2.intensity} 
        distance={lightConfig.fill2.distance}
        color={lightConfig.fill2.color}
      />
      <pointLight 
        position={[-1.5, 1.8, 2]} 
        intensity={lightConfig.fill3.intensity} 
        distance={lightConfig.fill3.distance}
        color={lightConfig.fill3.color}
      />
      
      {/* Room structure */}
      <Room />
      
      {/* Table for cake */}
      <Table />
      
      {/* Gift boxes on LEFT side of cake */}
      <GiftBox position={[-0.75, -0.06, 0.3]} size={[0.2, 0.2, 0.2]} color="#e74c3c" ribbonColor="#ffd700" />
      <GiftBox position={[-0.9, -0.06, -0.2]} size={[0.25, 0.18, 0.25]} color="#9b59b6" ribbonColor="#ffffff" />
      <GiftBox position={[-0.65, -0.06, -0.5]} size={[0.18, 0.25, 0.18]} color="#3498db" ribbonColor="#ff69b4" />
      <GiftBox position={[-0.85, -0.06, -0.42]} size={[0.18, 0.25, 0.18]} color="#3498db" ribbonColor="#062e22" />
      
      {/* Flowers on LEFT side with gifts */}
      <Flower position={[-0.55, -0.06, 0.15]} color="#ff69b4" />
      <Flower position={[-0.7, -0.06, 0.05]} color="#ff6b6b" />
      <Flower position={[-0.85, -0.06, -0.4]} color="#ffd93d" />
      <Flower position={[-0.6, -0.06, -0.35]} color="#e67e22" />
      
      {/* Birthday paper on RIGHT side of cake (lying flat) */}
      <BirthdayLetter position={[0.7, -0.06, 0]} onClick={onLetterClick} letterClicked={letterClicked} />
      
      {/* Hanging lamp with dramatic spotlight */}
      <HangingLamp />
      
      {/* Floating balloons around the room */}
      <Balloon position={[-4, 4.5, -3]} color="#ff6b6b" />
      <Balloon position={[4.5, 4.2, -4]} color="#4ecdc4" />
      <Balloon position={[-3.5, 3.8, 2]} color="#ffd93d" />
      <Balloon position={[3, 4.5, 1.5]} color="#9b59b6" />
      <Balloon position={[-2, 4.8, -1]} color="#ff69b4" />
      <Balloon position={[2.5, 4.3, -2.5]} color="#45b7d1" />
      
      {/* Decorative shelves on side walls */}
      <Shelf position={[-5.85, 1.5, -3]} />
      <Shelf position={[5.85, 1.5, 2]} />
      
      {/* Music System stack in left-back corner */}
      <SmallMusicSystem position={[-5.4, -0.95, -8.4]} audioRef={audioRef} isPlaying={isPlaying} setIsPlaying={setIsPlaying} showMusicButton={showMusicButton} setShowMusicButton={setShowMusicButton} />
      <SmallMusicSystem position={[-4.9, -0.95, -8.7]} audioRef={audioRef} isPlaying={isPlaying} setIsPlaying={setIsPlaying} showMusicButton={false} setShowMusicButton={() => {}} />
      <SmallMusicSystem position={[-5.15, -0.45, -8.55]} audioRef={audioRef} isPlaying={isPlaying} setIsPlaying={setIsPlaying} showMusicButton={false} setShowMusicButton={() => {}} />
      
      {/* Confetti (only when candles blown) */}
      {showConfetti && <Confetti count={80} />}
      
      {/* Removed fog to keep decorations visible */}
    </group>
  )
}

export default Environment
