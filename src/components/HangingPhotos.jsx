import { useRef, useState, useEffect } from 'react'
import { useFrame, useLoader } from '@react-three/fiber'
import { Html, Text } from '@react-three/drei'
import * as THREE from 'three'
import { data } from '../data'

// Import all photos dynamically
const importedPhotos = import.meta.glob('../assets/photo*.{jpg,jpeg,png,webp}', { eager: true, as: 'url' })

function Photo({ position, rotation = [0, 0, 0], caption, index, onZoom, isZoomed, imageUrl }) {
  const groupRef = useRef()
  const frameRef = useRef()
  const [hovered, setHovered] = useState(false)
  const [texture, setTexture] = useState(null)
  const [textureError, setTextureError] = useState(false)
  
  // Load texture properly with useEffect
  useEffect(() => {
    if (imageUrl) {
      const loader = new THREE.TextureLoader()
      loader.load(
        imageUrl,
        (loadedTexture) => {
          loadedTexture.colorSpace = THREE.SRGBColorSpace
          setTexture(loadedTexture)
        },
        undefined,
        (error) => {
          console.warn(`Failed to load image: ${imageUrl}`, error)
          setTextureError(true)
        }
      )
    }
  }, [imageUrl])

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
      {/* Photo frame */}
      <group
        ref={frameRef}
        onClick={handleClick}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        {/* Outer frame (wood) - larger */}
        <mesh position={[0, 0, -0.02]}>
          <boxGeometry args={[0.9, 0.7, 0.04]} />
          <meshStandardMaterial 
            color={hovered ? '#d4a574' : '#8B4513'} 
            roughness={0.6}
          />
        </mesh>
        
        {/* Inner frame border (gold) - larger */}
        <mesh position={[0, 0, 0]}>
          <boxGeometry args={[0.78, 0.58, 0.02]} />
          <meshStandardMaterial 
            color="#ffd700" 
            metalness={0.8}
            roughness={0.2}
          />
        </mesh>
        
        {/* Photo placeholder or actual image - larger for clarity */}
        <mesh position={[0, 0, 0.01]}>
          <planeGeometry args={[0.7, 0.5]} />
          {texture ? (
            <meshStandardMaterial map={texture} />
          ) : (
            <meshStandardMaterial color={photoColor} emissive={photoColor} emissiveIntensity={0.3} />
          )}
        </mesh>
        
        {/* Photo texture pattern (decorative) - only show if no texture */}
        {!texture && (
          <mesh position={[0, 0, 0.015]}>
            <planeGeometry args={[0.55, 0.38]} />
            <meshBasicMaterial color="#ffffff" transparent opacity={0.3} />
          </mesh>
        )}
        
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
          border: '2px solid rgba(255,215,0,0.3)',
          maxWidth: '90vw'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div
          style={{
            background: !photo.imageUrl ? `linear-gradient(45deg, ${photo.color}, ${photo.colorAlt})` : 'transparent',
            borderRadius: '12px',
            marginBottom: '20px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '60px',
            overflow: 'hidden',
            position: 'relative'
          }}
        >
          {photo.imageUrl ? (
            <img 
              src={photo.imageUrl} 
              alt={photo.caption}
              style={{
                maxHeight: '70vh',
                width: 'auto',
                height: 'auto',
                maxWidth: '85vw',
                objectFit: 'contain',
                borderRadius: '12px',
                display: 'block'
              }}
            />
          ) : (
            <div style={{ width: '400px', height: '300px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              📷
            </div>
          )}
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
  
  // Get total photo count from data
  const totalPhotoCount = data.photoCount || 5
  
  // Generate photo data with dynamic image loading
  const generatePhotoData = () => {
    // Back wall positions (max 5 photos) - Zigzag pattern: down-up-down-up-down
    const backWallPositions = [
      { pos: [-2.8, 2.3, -8.9], rot: [0, 0, 0] },        // Position 1: Down
      { pos: [-1.4, 3.0, -8.9], rot: [0, 0, 0] },        // Position 2: Up
      { pos: [0, 2.3, -8.9], rot: [0, 0, 0] },           // Position 3: Down
      { pos: [1.4, 3.0, -8.9], rot: [0, 0, 0] },         // Position 4: Up
      { pos: [2.8, 2.3, -8.9], rot: [0, 0, 0] }          // Position 5: Down
    ]
    
    // Left wall positions (for photos 6+)
    const leftWallPositions = [
      { pos: [-5.9, 2.5, -3], rot: [0, Math.PI / 2, 0] },     // Left wall position 1
      { pos: [-5.9, 2.5, -0.5], rot: [0, Math.PI / 2, 0] },   // Left wall position 2
      { pos: [-5.9, 2.5, 2], rot: [0, Math.PI / 2, 0] }       // Left wall position 3
    ]
    
    // Right wall positions (for photos 9+)
    const rightWallPositions = [
      { pos: [5.9, 2.5, -3], rot: [0, -Math.PI / 2, 0] },     // Right wall position 1
      { pos: [5.9, 2.5, -0.5], rot: [0, -Math.PI / 2, 0] },   // Right wall position 2
      { pos: [5.9, 2.5, 2], rot: [0, -Math.PI / 2, 0] }       // Right wall position 3
    ]
    
    const colors = [
      { color: '#ff6b6b', colorAlt: '#ff8e53' },
      { color: '#4ecdc4', colorAlt: '#45b7d1' },
      { color: '#96ceb4', colorAlt: '#88d8b0' },
      { color: '#ffeaa7', colorAlt: '#fdcb6e' },
      { color: '#dda0dd', colorAlt: '#da70d6' },
      { color: '#74b9ff', colorAlt: '#a29bfe' },
      { color: '#fd79a8', colorAlt: '#e17055' },
      { color: '#55efc4', colorAlt: '#00b894' }
    ]
    
    const photoData = []
    for (let i = 0; i < totalPhotoCount; i++) {
      const photoNum = i + 1
      let position, rotation
      
      // Determine which wall to place the photo on
      if (i < 5) {
        // Photos 1-5: Back wall
        position = backWallPositions[i].pos
        rotation = backWallPositions[i].rot
      } else if (i < 8) {
        // Photos 6-8: Left wall
        const leftIndex = i - 5
        position = leftWallPositions[leftIndex].pos
        rotation = leftWallPositions[leftIndex].rot
      } else {
        // Photos 9+: Right wall
        const rightIndex = i - 8
        position = rightWallPositions[rightIndex].pos
        rotation = rightWallPositions[rightIndex].rot
      }
      
      // Get the image URL from imported photos
      // Try different extensions
      let imageUrl = null
      const extensions = ['jpg', 'jpeg', 'png', 'webp']
      for (const ext of extensions) {
        const key = `../assets/photo${photoNum}.${ext}`
        if (importedPhotos[key]) {
          imageUrl = importedPhotos[key]
          break
        }
      }
      
      photoData.push({
        position,
        rotation,
        caption: `Memory ${photoNum}`,
        description: `A special moment to remember forever.`,
        imageUrl,
        ...colors[i % colors.length]
      })
    }
    
    return photoData
  }

  const defaultPhotos = [
    { 
      position: [-2.5, 2.5, -5.3], 
      rotation: [0, 0, 0], 
      caption: 'Memory 1',
      description: 'A cherished moment frozen in time.',
      imageUrl: null,
      color: '#ff6b6b',
      colorAlt: '#ff8e53'
    },
    { 
      position: [-1, 2.5, -5.3], 
      rotation: [0, 0, 0], 
      caption: 'Memory 2',
      description: 'Laughter echoes through this photograph.',
      imageUrl: null,
      color: '#4ecdc4',
      colorAlt: '#45b7d1'
    },
    { 
      position: [0.5, 2.5, -5.3], 
      rotation: [0, 0, 0], 
      caption: 'Memory 3',
      description: 'Adventures that shaped who we are.',
      imageUrl: null,
      color: '#96ceb4',
      colorAlt: '#88d8b0'
    },
    { 
      position: [2, 2.5, -5.3], 
      rotation: [0, 0, 0], 
      caption: 'Memory 4',
      description: 'The journey continues...',
      imageUrl: null,
      color: '#ffeaa7',
      colorAlt: '#fdcb6e'
    },
    { 
      position: [-1.7, 3.5, -5.3], 
      rotation: [0, 0, 0], 
      caption: 'Memory 5',
      description: 'Together through thick and thin.',
      imageUrl: null,
      color: '#dda0dd',
      colorAlt: '#da70d6'
    },
    { 
      position: [-5.9, 2.5, -2], 
      rotation: [0, Math.PI / 2, 0], 
      caption: 'Memory 6',
      description: 'Memories that last a lifetime.',
      imageUrl: null,
      color: '#74b9ff',
      colorAlt: '#a29bfe'
    }
  ]

  const photoData = generatePhotoData()

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
          imageUrl={photo.imageUrl}
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
