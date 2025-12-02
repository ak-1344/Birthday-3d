import { useRef, useState } from 'react'
import { useFrame } from '@react-three/fiber'
import { Html, Text } from '@react-three/drei'

function Photo({ position, rotation = [0, 0, 0], caption, index, onZoom, isZoomed }) {
  const groupRef = useRef()
  const frameRef = useRef()
  const [hovered, setHovered] = useState(false)
  
  // Gentle swinging animation
  useFrame((state) => {
    if (groupRef.current && !isZoomed) {
      const time = state.clock.getElapsedTime()
      const swingAmount = 0.05
      const swingSpeed = 0.5 + index * 0.1
      groupRef.current.rotation.z = Math.sin(time * swingSpeed) * swingAmount
    }
  })

  const handleClick = (e) => {
    e.stopPropagation()
    onZoom(index)
  }

  // Generate a gradient color for the photo placeholder
  const photoColors = [
    '#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4', '#ffeaa7', '#dda0dd'
  ]
  const photoColor = photoColors[index % photoColors.length]

  return (
    <group ref={groupRef} position={position} rotation={rotation}>
      {/* String */}
      <mesh position={[0, 0.4, 0]}>
        <cylinderGeometry args={[0.005, 0.005, 0.8, 8]} />
        <meshStandardMaterial color="#8B4513" />
      </mesh>
      
      {/* Photo frame */}
      <group
        ref={frameRef}
        onClick={handleClick}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        {/* Outer frame (wood) */}
        <mesh position={[0, 0, -0.02]}>
          <boxGeometry args={[0.7, 0.55, 0.04]} />
          <meshStandardMaterial 
            color={hovered ? '#d4a574' : '#8B4513'} 
            roughness={0.6}
          />
        </mesh>
        
        {/* Inner frame border (gold) */}
        <mesh position={[0, 0, 0]}>
          <boxGeometry args={[0.6, 0.45, 0.02]} />
          <meshStandardMaterial 
            color="#ffd700" 
            metalness={0.8}
            roughness={0.2}
          />
        </mesh>
        
        {/* Photo placeholder */}
        <mesh position={[0, 0, 0.01]}>
          <planeGeometry args={[0.5, 0.35]} />
          <meshBasicMaterial color={photoColor} />
        </mesh>
        
        {/* Photo texture pattern (decorative) */}
        <mesh position={[0, 0, 0.015]}>
          <planeGeometry args={[0.4, 0.25]} />
          <meshBasicMaterial color="#ffffff" transparent opacity={0.3} />
        </mesh>
        
        {/* Caption */}
        <Text
          position={[0, -0.35, 0.02]}
          fontSize={0.05}
          color="#ffffff"
          anchorX="center"
          anchorY="top"
          font={undefined}
        >
          {caption}
        </Text>
        
        {/* Hover indicator */}
        {hovered && (
          <mesh position={[0, 0, 0.03]}>
            <ringGeometry args={[0.25, 0.28, 32]} />
            <meshBasicMaterial color="#ffffff" transparent opacity={0.5} />
          </mesh>
        )}
      </group>
    </group>
  )
}

function ZoomedPhoto({ photo, onClose }) {
  return (
    <Html
      center
      style={{
        width: '80vw',
        maxWidth: '600px',
        pointerEvents: 'auto'
      }}
    >
      <div
        style={{
          background: 'linear-gradient(145deg, #2a2a4a, #1a1a2e)',
          borderRadius: '20px',
          padding: '30px',
          boxShadow: '0 25px 50px rgba(0,0,0,0.5)',
          textAlign: 'center',
          color: 'white',
          border: '2px solid rgba(255,215,0,0.3)'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div
          style={{
            width: '100%',
            height: '300px',
            background: `linear-gradient(45deg, ${photo.color}, ${photo.colorAlt})`,
            borderRadius: '12px',
            marginBottom: '20px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '60px'
          }}
        >
          📷
        </div>
        <h2 style={{ 
          marginBottom: '15px', 
          fontFamily: 'Georgia, serif',
          fontSize: '24px',
          color: '#ffd700'
        }}>
          {photo.caption}
        </h2>
        <p style={{ 
          opacity: 0.8, 
          marginBottom: '20px',
          fontSize: '16px',
          lineHeight: '1.6'
        }}>
          {photo.description}
        </p>
        <button
          onClick={onClose}
          style={{
            background: 'linear-gradient(45deg, #ff6b6b, #ff8e53)',
            border: 'none',
            padding: '12px 30px',
            borderRadius: '25px',
            color: 'white',
            cursor: 'pointer',
            fontSize: '16px',
            fontWeight: 'bold',
            transition: 'transform 0.2s, box-shadow 0.2s',
            boxShadow: '0 4px 15px rgba(255,107,107,0.4)'
          }}
          onMouseOver={(e) => {
            e.target.style.transform = 'scale(1.05)'
            e.target.style.boxShadow = '0 6px 20px rgba(255,107,107,0.6)'
          }}
          onMouseOut={(e) => {
            e.target.style.transform = 'scale(1)'
            e.target.style.boxShadow = '0 4px 15px rgba(255,107,107,0.4)'
          }}
        >
          Close
        </button>
      </div>
    </Html>
  )
}

function HangingPhotos({ photos = [] }) {
  const [zoomedIndex, setZoomedIndex] = useState(null)

  const defaultPhotos = [
    { 
      position: [-2.5, 2, -3], 
      rotation: [0, 0.2, 0], 
      caption: 'Memory 1',
      description: 'A cherished moment frozen in time.',
      color: '#ff6b6b',
      colorAlt: '#ff8e53'
    },
    { 
      position: [0, 2.3, -4], 
      rotation: [0, 0, 0], 
      caption: 'Memory 2',
      description: 'Laughter echoes through this photograph.',
      color: '#4ecdc4',
      colorAlt: '#45b7d1'
    },
    { 
      position: [2.5, 2, -3], 
      rotation: [0, -0.2, 0], 
      caption: 'Memory 3',
      description: 'Adventures that shaped who we are.',
      color: '#96ceb4',
      colorAlt: '#88d8b0'
    },
    { 
      position: [-3.5, 1.8, -2], 
      rotation: [0, 0.4, 0], 
      caption: 'Memory 4',
      description: 'The journey continues...',
      color: '#ffeaa7',
      colorAlt: '#fdcb6e'
    },
    { 
      position: [3.5, 1.8, -2], 
      rotation: [0, -0.4, 0], 
      caption: 'Memory 5',
      description: 'Together through thick and thin.',
      color: '#dda0dd',
      colorAlt: '#da70d6'
    }
  ]

  const photoData = photos.length > 0 ? photos : defaultPhotos

  const handleZoom = (index) => {
    setZoomedIndex(index)
  }

  const handleClose = () => {
    setZoomedIndex(null)
  }

  return (
    <group>
      {photoData.map((photo, index) => (
        <Photo
          key={index}
          position={photo.position}
          rotation={photo.rotation}
          caption={photo.caption}
          index={index}
          onZoom={handleZoom}
          isZoomed={zoomedIndex === index}
        />
      ))}
      
      {zoomedIndex !== null && (
        <ZoomedPhoto
          photo={photoData[zoomedIndex]}
          onClose={handleClose}
        />
      )}
    </group>
  )
}

export default HangingPhotos
