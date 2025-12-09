import { useState } from 'react'
import './MusicToggle.css'

function MusicToggle({ audioRef }) {
  const [isPlaying, setIsPlaying] = useState(false)

  const handleToggle = () => {
    if (!audioRef.current) {
      // Initialize audio on first click
      const audio = new Audio('/birthday-music.mp3')
      audio.loop = true
      audio.volume = 0.5
      audioRef.current = audio
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

  return (
    <button 
      className={`music-toggle ${isPlaying ? 'playing' : 'stopped'}`}
      onClick={handleToggle}
      aria-label={isPlaying ? 'Stop music' : 'Play music'}
      title={isPlaying ? 'Stop music' : 'Play music'}
    >
      {isPlaying ? (
        <>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="6" y="4" width="4" height="16" />
            <rect x="14" y="4" width="4" height="16" />
          </svg>
          <span>Stop Music</span>
        </>
      ) : (
        <>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10" />
            <polygon points="10 8 16 12 10 16 10 8" fill="currentColor" />
          </svg>
          <span>Play Music</span>
        </>
      )}
    </button>
  )
}

export default MusicToggle
