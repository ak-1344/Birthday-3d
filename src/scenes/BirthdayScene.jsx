import { Suspense, useState, useRef } from 'react'
import { Canvas } from '@react-three/fiber'
import { Loader } from '@react-three/drei'

import Cake from '../components/Cake'
import HangingPhotos from '../components/HangingPhotos'
import Environment from '../components/Environment'
import CameraController from '../components/CameraController'
import BlowButton from '../components/BlowButton'
import IntroOverlay from '../components/IntroOverlay'

function LoadingScreen() {
  return (
    <mesh>
      <planeGeometry args={[10, 10]} />
      <meshBasicMaterial color="#0a0a15" />
    </mesh>
  )
}

function BirthdayScene() {
  const [introComplete, setIntroComplete] = useState(false)
  const [candlesBlown, setCandlesBlown] = useState(false)
  const [showIntroOverlay, setShowIntroOverlay] = useState(true)
  const cakeRef = useRef()

  const handleIntroComplete = () => {
    setIntroComplete(true)
    setTimeout(() => setShowIntroOverlay(false), 500)
  }

  const handleSkipIntro = () => {
    setIntroComplete(true)
    setShowIntroOverlay(false)
  }

  const handleBlowCandles = () => {
    // This will trigger the blow animation in the Cake component
    setCandlesBlown(true)
  }

  return (
    <div style={{ 
      width: '100vw', 
      height: '100vh', 
      position: 'relative',
      background: '#0a0a15'
    }}>
      {/* Intro overlay */}
      <IntroOverlay 
        isVisible={showIntroOverlay} 
        onSkip={handleSkipIntro}
      />
      
      {/* 3D Canvas */}
      <Canvas
        shadows
        camera={{ 
          fov: 60, 
          near: 0.1, 
          far: 100,
          position: [0, 8, 12]
        }}
        gl={{
          antialias: true,
          alpha: false,
          powerPreference: 'high-performance'
        }}
        style={{ position: 'absolute', top: 0, left: 0 }}
      >
        <Suspense fallback={<LoadingScreen />}>
          {/* Camera animation controller */}
          <CameraController 
            introComplete={introComplete}
            onIntroComplete={handleIntroComplete}
          />
          
          {/* Environment (lights, balloons, floor, etc.) */}
          <Environment showConfetti={candlesBlown} />
          
          {/* Cake with candles */}
          <Cake 
            ref={cakeRef}
            position={[0, 0, 0]} 
            onCandlesBlown={() => setCandlesBlown(true)}
          />
          
          {/* Hanging photo gallery */}
          <HangingPhotos />
        </Suspense>
      </Canvas>

      {/* Loader indicator from drei */}
      <Loader />

      {/* Blow button UI */}
      {introComplete && (
        <BlowButton 
          onBlow={handleBlowCandles}
          candlesExtinguished={candlesBlown}
        />
      )}

      {/* Instructions */}
      {introComplete && !candlesBlown && (
        <div style={{
          position: 'fixed',
          top: '20px',
          left: '50%',
          transform: 'translateX(-50%)',
          color: 'white',
          textAlign: 'center',
          fontSize: '14px',
          opacity: 0.7,
          fontFamily: 'Georgia, serif',
          pointerEvents: 'none'
        }}>
          <p>🖱️ Click and drag to look around | Scroll to zoom</p>
          <p>📷 Click on photos to view memories</p>
        </div>
      )}
    </div>
  )
}

export default BirthdayScene
