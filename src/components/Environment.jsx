import { useRef, useState, useEffect } from 'react'
import { useFrame } from '@react-three/fiber'
import { Stars, Float } from '@react-three/drei'
import * as THREE from 'three'

// Seeded random for consistent confetti generation
function seededRandom(seed) {
  const x = Math.sin(seed) * 10000
  return x - Math.floor(x)
}

function Balloon({ position, color, delay = 0 }) {
  const groupRef = useRef()
  const baseY = position[1]

  useFrame((state) => {
    if (groupRef.current) {
      const time = state.clock.getElapsedTime() + delay
      groupRef.current.position.y = baseY + Math.sin(time * 0.5) * 0.3
      groupRef.current.rotation.y = Math.sin(time * 0.3) * 0.1
    }
  })

  return (
    <group ref={groupRef} position={position}>
      {/* Balloon body */}
      <mesh position={[0, 0, 0]}>
        <sphereGeometry args={[0.3, 16, 16]} />
        <meshStandardMaterial 
          color={color} 
          roughness={0.2}
          metalness={0.1}
        />
      </mesh>
      
      {/* Balloon knot */}
      <mesh position={[0, -0.32, 0]}>
        <coneGeometry args={[0.05, 0.08, 8]} />
        <meshStandardMaterial color={color} />
      </mesh>
      
      {/* String */}
      <mesh position={[0, -0.8, 0]}>
        <cylinderGeometry args={[0.005, 0.005, 1, 8]} />
        <meshStandardMaterial color="#888" />
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
          (seededRandom(seed) - 0.5) * 15,
          seededRandom(seed + 1) * 10 + 5,
          (seededRandom(seed + 2) - 0.5) * 15
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

function GiftBox({ position, color, ribbonColor }) {
  return (
    <Float speed={2} rotationIntensity={0.2} floatIntensity={0.3}>
      <group position={position}>
        {/* Box body */}
        <mesh position={[0, 0.15, 0]}>
          <boxGeometry args={[0.4, 0.3, 0.4]} />
          <meshStandardMaterial color={color} roughness={0.3} />
        </mesh>
        
        {/* Ribbon horizontal */}
        <mesh position={[0, 0.15, 0]}>
          <boxGeometry args={[0.42, 0.32, 0.08]} />
          <meshStandardMaterial color={ribbonColor} roughness={0.2} />
        </mesh>
        
        {/* Ribbon vertical */}
        <mesh position={[0, 0.15, 0]}>
          <boxGeometry args={[0.08, 0.32, 0.42]} />
          <meshStandardMaterial color={ribbonColor} roughness={0.2} />
        </mesh>
        
        {/* Bow */}
        <mesh position={[0, 0.35, 0]}>
          <torusGeometry args={[0.08, 0.03, 8, 16]} />
          <meshStandardMaterial color={ribbonColor} roughness={0.2} />
        </mesh>
        <mesh position={[0.12, 0.35, 0]} rotation={[0, 0, 0.5]}>
          <torusGeometry args={[0.06, 0.025, 8, 16]} />
          <meshStandardMaterial color={ribbonColor} roughness={0.2} />
        </mesh>
        <mesh position={[-0.12, 0.35, 0]} rotation={[0, 0, -0.5]}>
          <torusGeometry args={[0.06, 0.025, 8, 16]} />
          <meshStandardMaterial color={ribbonColor} roughness={0.2} />
        </mesh>
      </group>
    </Float>
  )
}

function Environment({ showConfetti = true }) {
  const balloonColors = ['#ff6b6b', '#4ecdc4', '#ffd93d', '#ff69b4', '#9b59b6', '#3498db']
  
  const balloonPositions = [
    [-4, 3, -2],
    [-3, 4, 1],
    [4, 3, -2],
    [3, 4, 1],
    [-2, 3.5, -4],
    [2, 3.5, -4],
    [-5, 2.5, 0],
    [5, 2.5, 0]
  ]

  return (
    <group>
      {/* Starry background */}
      <Stars
        radius={100}
        depth={50}
        count={3000}
        factor={4}
        saturation={0.5}
        fade
        speed={0.5}
      />
      
      {/* Main ambient light */}
      <ambientLight intensity={0.3} />
      
      {/* Key light */}
      <directionalLight
        position={[5, 8, 5]}
        intensity={0.8}
        castShadow
        shadow-mapSize={[2048, 2048]}
      />
      
      {/* Fill light */}
      <directionalLight
        position={[-5, 5, 3]}
        intensity={0.4}
        color="#b4e7ff"
      />
      
      {/* Party lights */}
      <PartyLights />
      
      {/* Balloons */}
      {balloonPositions.map((pos, i) => (
        <Balloon
          key={i}
          position={pos}
          color={balloonColors[i % balloonColors.length]}
          delay={i * 0.5}
        />
      ))}
      
      {/* Gift boxes */}
      <GiftBox position={[-1.5, 0, 1]} color="#e74c3c" ribbonColor="#ffd700" />
      <GiftBox position={[1.5, 0, 1]} color="#9b59b6" ribbonColor="#ffffff" />
      <GiftBox position={[0, 0, 2]} color="#3498db" ribbonColor="#ff69b4" />
      
      {/* Floor */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.1, 0]} receiveShadow>
        <planeGeometry args={[30, 30]} />
        <meshStandardMaterial 
          color="#1a1a2e" 
          roughness={0.8}
          metalness={0.2}
        />
      </mesh>
      
      {/* Back wall */}
      <mesh position={[0, 4, -6]} receiveShadow>
        <planeGeometry args={[20, 12]} />
        <meshStandardMaterial 
          color="#16213e"
          roughness={0.9}
        />
      </mesh>
      
      {/* Confetti */}
      {showConfetti && <Confetti count={80} />}
      
      {/* Fog for depth */}
      <fog attach="fog" args={['#0a0a15', 8, 25]} />
    </group>
  )
}

export default Environment
