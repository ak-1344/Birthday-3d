# 🎂 Birthday 3D - Interactive Birthday Wish Website

A cinematic 3D birthday wish website built with React and Three.js. Experience a VR-style birthday celebration in your browser!

## ✨ Features

- **Cinematic Intro**: Video-like camera animation that sweeps through the 3D scene
- **Interactive 3D Cake**: Multi-tiered birthday cake with animated candles
- **Blow Candles**: Click the blow button to extinguish candles with realistic smoke animation
- **Hanging Photo Gallery**: Swinging photo frames that zoom in on click to view memories
- **Persistent Environment**: Starry background, floating balloons, gift boxes, and party confetti
- **Party Atmosphere**: Dynamic lighting with colorful party lights
- **Cinematic Effects**: Depth of field, fog effects, and smooth transitions

## 🚀 Getting Started

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

### Production Build

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

## 🛠️ Tech Stack

- **React 19** - UI Framework
- **Three.js** - 3D Graphics Library
- **@react-three/fiber** - React renderer for Three.js
- **@react-three/drei** - Useful helpers for react-three-fiber
- **Framer Motion** - Animation library for React
- **Vite** - Build tool

## 📁 Project Structure

```
src/
├── components/
│   ├── Cake.jsx           # 3D cake with candles and smoke
│   ├── HangingPhotos.jsx  # Photo gallery with zoom
│   ├── Environment.jsx    # Background, balloons, confetti
│   ├── BlowButton.jsx     # UI button to blow candles
│   ├── CameraController.jsx # Camera animation and controls
│   └── IntroOverlay.jsx   # Cinematic intro overlay
├── scenes/
│   └── BirthdayScene.jsx  # Main scene composition
├── App.jsx
├── App.css
├── main.jsx
└── index.css
```

## 🎮 Interactions

1. **Watch the Intro**: Experience the cinematic camera flythrough
2. **Look Around**: Click and drag to orbit the scene (after intro)
3. **Zoom**: Use scroll wheel to zoom in/out
4. **Blow Candles**: Click the "Blow Candles" button to make a wish
5. **View Photos**: Click on hanging photos to see memories

## 🎨 Customization

### Adding Your Own Photos
Edit the `defaultPhotos` array in `src/components/HangingPhotos.jsx` to add your own memories.

### Changing Colors
Modify the color values in each component to match your preferred theme.

## 📄 License

MIT
