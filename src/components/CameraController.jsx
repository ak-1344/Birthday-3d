import { useRef, useEffect, useState } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import * as THREE from 'three'

// Animation keyframes defined outside component
const KEYFRAMES = {
  start: {
    position: new THREE.Vector3(0, 8, 12),
    lookAt: new THREE.Vector3(0, 0, 0),
    duration: 0
  },
  phase1: {
    position: new THREE.Vector3(8, 5, 8),
    lookAt: new THREE.Vector3(0, 1, 0),
    duration: 2500
  },
  phase2: {
    position: new THREE.Vector3(-5, 3, 6),
    lookAt: new THREE.Vector3(0, 1, 0),
    duration: 2500
  },
  phase3: {
    position: new THREE.Vector3(0, 2, 5),
    lookAt: new THREE.Vector3(0, 0.5, 0),
    duration: 2000
  },
  complete: {
    position: new THREE.Vector3(0, 2, 5),
    lookAt: new THREE.Vector3(0, 0.5, 0),
    duration: 0
  }
}

const PHASES = ['start', 'phase1', 'phase2', 'phase3', 'complete']

function CameraController({ introComplete, onIntroComplete }) {
  const { camera } = useThree()
  const controlsRef = useRef()
  const [animationPhase, setAnimationPhase] = useState('start')
  const startTime = useRef(null)

  useEffect(() => {
    // Set initial camera position
    camera.position.copy(KEYFRAMES.start.position)
    camera.lookAt(KEYFRAMES.start.lookAt)
    
    // Start animation after a brief delay
    const timer = setTimeout(() => {
      setAnimationPhase('phase1')
      startTime.current = Date.now()
    }, 500)

    return () => clearTimeout(timer)
  }, [camera])

  useFrame(() => {
    if (introComplete || animationPhase === 'complete') {
      return
    }

    if (!startTime.current) return

    const currentPhaseIndex = PHASES.indexOf(animationPhase)
    if (currentPhaseIndex < 0 || currentPhaseIndex >= PHASES.length - 1) return

    const currentKeyframe = KEYFRAMES[animationPhase]

    const elapsed = Date.now() - startTime.current
    const progress = Math.min(elapsed / currentKeyframe.duration, 1)
    
    // Smooth easing function
    const easeInOutCubic = (t) => {
      return t < 0.5
        ? 4 * t * t * t
        : 1 - Math.pow(-2 * t + 2, 3) / 2
    }

    const easedProgress = easeInOutCubic(progress)

    // Interpolate position
    camera.position.lerpVectors(
      currentPhaseIndex > 0 ? KEYFRAMES[PHASES[currentPhaseIndex - 1]].position : KEYFRAMES.start.position,
      currentKeyframe.position,
      easedProgress
    )

    // Interpolate lookAt
    const targetLookAt = new THREE.Vector3().lerpVectors(
      currentPhaseIndex > 0 ? KEYFRAMES[PHASES[currentPhaseIndex - 1]].lookAt : KEYFRAMES.start.lookAt,
      currentKeyframe.lookAt,
      easedProgress
    )
    camera.lookAt(targetLookAt)

    // Move to next phase
    if (progress >= 1) {
      const nextPhaseIndex = currentPhaseIndex + 1
      if (nextPhaseIndex < PHASES.length - 1) {
        setAnimationPhase(PHASES[nextPhaseIndex])
        startTime.current = Date.now()
      } else {
        setAnimationPhase('complete')
        if (onIntroComplete) {
          onIntroComplete()
        }
      }
    }
  })

  return (
    <>
      {introComplete && (
        <OrbitControls
          ref={controlsRef}
          enablePan={false}
          enableZoom={true}
          enableRotate={true}
          minDistance={3}
          maxDistance={12}
          minPolarAngle={Math.PI / 6}
          maxPolarAngle={Math.PI / 2.2}
          target={[0, 0.5, 0]}
          dampingFactor={0.05}
          rotateSpeed={0.5}
        />
      )}
    </>
  )
}

export default CameraController
