import { Suspense, useState, useRef } from 'react'
import { Canvas } from '@react-three/fiber'
import { Loader } from '@react-three/drei'
import * as THREE from 'three'

import Cake from '../components/Cake'
import HangingPhotos from '../components/HangingPhotos'
import Environment from '../components/Environment'
import CameraController from '../components/CameraController'
import BlowButton from '../components/BlowButton'
import IntroOverlay from '../components/IntroOverlay'
import LetterZoom from '../components/LetterZoom'
import LightToggle from '../components/LightToggle'

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
  const [showLetterZoom, setShowLetterZoom] = useState(false)
  const [letterClicked, setLetterClicked] = useState(false)
  const [isLitUp, setIsLitUp] = useState(false)
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
    // Call the cake's blowCandles method directly
    if (cakeRef.current && cakeRef.current.blowCandles) {
      cakeRef.current.blowCandles()
    }
  }

  const handleLetterClick = (e) => {
    e.stopPropagation()
    setShowLetterZoom(true)
    setLetterClicked(true)
  }

  const handleCloseLetterZoom = () => {
    setShowLetterZoom(false)
  }

  return (
    <div style={{ 
      width: '100vw', 
      height: '100vh', 
      position: 'relative',
      background: '#0a0a0a'
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
          fov: 50, 
          near: 0.1, 
          far: 50,
          position: [-3, 3, 4]
        }}
        gl={{
          antialias: true,
          alpha: false,
          powerPreference: 'high-performance',
          toneMapping: THREE.ACESFilmicToneMapping,
          toneMappingExposure: 0.8
        }}
        style={{ position: 'absolute', top: 0, left: 0, background: '#0a0a0a' }}
      >
        <Suspense fallback={<LoadingScreen />}>
          {/* Camera animation controller */}
          <CameraController 
            introComplete={introComplete}
            onIntroComplete={handleIntroComplete}
          />
          
          {/* Environment (lights, room, table, gifts, letter) */}
          <Environment 
            showConfetti={candlesBlown} 
            onLetterClick={handleLetterClick}
            letterClicked={letterClicked}
            isLitUp={isLitUp}
          />
          
          {/* Cake with candles */}
          <Cake 
            ref={cakeRef}
            position={[0, 0, 0]} 
            onCandlesBlown={() => setCandlesBlown(true)}
          />
          
          {/* Letter zoom view */}
          <LetterZoom 
            isVisible={showLetterZoom}
            onClose={handleCloseLetterZoom}
          />
          
          {/* Hanging photo gallery */}
          <HangingPhotos />
        </Suspense>
      </Canvas>

      {/* Loader indicator from drei */}
      <Loader />

      {/* Light toggle button */}
      <LightToggle onToggle={setIsLitUp} />

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
