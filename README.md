# 🎂 Birthday 3D - Interactive Birthday Wish Website

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![React](https://img.shields.io/badge/React-19-blue.svg)](https://reactjs.org/)
[![Three.js](https://img.shields.io/badge/Three.js-WebGL-black.svg)](https://threejs.org/)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](CONTRIBUTING.md)

A fully customizable, cinematic 3D birthday wish website built with React and Three.js. Create memorable birthday experiences in the browser with interactive 3D elements, animations, and personalized content!

> **Perfect for**: Creating personalized birthday websites for friends, family, or clients. Fully open-source and free to use!

## 🎥 Demo

<!-- Add your demo GIF or video here -->
🔗 [Live Demo](https://birthday-3d.vercel.app) *(Coming Soon)*

## ✨ Features

- **Cinematic Intro**: Video-like camera animation that sweeps through the 3D scene
- **Interactive 3D Cake**: Multi-tiered birthday cake with animated candles
- **Blow Candles**: Click the blow button to extinguish candles with realistic smoke animation
- **Hanging Photo Gallery**: Swinging photo frames that zoom in on click to view memories
- **Persistent Environment**: Starry background, floating balloons, gift boxes, and party confetti
- **Party Atmosphere**: Dynamic lighting with colorful party lights
- **Cinematic Effects**: Depth of field, fog effects, and smooth transitions

## 🚀 Quick Start

### Prerequisites

- Node.js 16+ and npm

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/ak-1344/Birthday-3d.git
cd Birthday-3d
```

2. **Install dependencies**
```bash
npm install
```

3. **Personalize the configuration:**

Edit `src/data.ts` with your customization:

```typescript
export const data = {
  personName: 'John',
  personAge: 25,
  birthdayMessage: 'Wishing you a day filled with happiness!',
  photoCount: 6,
  candleCount: 5, // Optional: defaults to age if not specified
};
```

4. **Add your photos to `src/assets/`:**
   - Name them: `photo1.jpg`, `photo2.jpg`, `photo3.jpg`, etc.
   - See `src/assets/README.md` for detailed instructions
   - Supported formats: `.jpg`, `.png`, `.webp`

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

This is a **fully customizable birthday template**! Personalize every aspect for your special someone.

### Quick Customization

Edit the `src/data.ts` file to personalize:

| Property | Description | Example |
|----------|-------------|---------|
| `personName` | Birthday person's name | `'Alex'` |
| `personAge` | Person's age (affects candle count) | `25` |
| `birthdayMessage` | Custom intro message | `'Wishing you joy!'` |
| `photoCount` | Number of photos to display (max 11) | `6` |
| `candleCount` | Override candle count (optional) | `5` (defaults to age if not set) |

### Adding Custom Photos

1. Place photos in `src/assets/` folder
2. Name them sequentially: `photo1.jpg`, `photo2.jpg`, `photo3.jpg`, etc.
3. Set `photoCount` in `src/data.ts` to match the number of photos
4. Save the file (changes auto-reload with Vite)

📖 **Detailed guide**: See [CUSTOMIZATION_GUIDE.md](CUSTOMIZATION_GUIDE.md) for step-by-step instructions, examples, and troubleshooting.

### Advanced Customization

Modify colors, themes, and visual elements in component files:
- **Cake**: `src/components/Cake.jsx`
- **Environment**: `src/components/Environment.jsx`
- **Photos**: `src/components/HangingPhotos.jsx`
- **Intro**: `src/components/IntroOverlay.jsx`

## 🤝 Contributing

Contributions are welcome! Please read our [Contributing Guide](CONTRIBUTING.md) for details on how to submit pull requests, report issues, and contribute to the project.

## 🚀 Deployment

### Deploy to Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/ak-1344/Birthday-3d)

1. Click the "Deploy" button above
2. Edit `src/data.ts` with your personalization before deployment
3. Add your photos to `src/assets/` in the repository before deployment

### Deploy to Netlify

1. Fork this repository
2. Edit `src/data.ts` with your personalization
3. Add your photos to `src/assets/`
4. Connect your fork to Netlify
5. Deploy!

### Deploy to GitHub Pages

See our comprehensive [Deployment Guide](DEPLOYMENT.md) for detailed instructions on deploying to GitHub Pages and other platforms.

### Manual Deployment

```bash
npm run build
```

The `dist/` folder contains your production-ready site. Upload it to any static hosting service.

📖 **Full deployment instructions**: See [DEPLOYMENT.md](DEPLOYMENT.md) for platform-specific guides (Vercel, Netlify, GitHub Pages, Cloudflare, Firebase, and more).

## 🎨 Customization

## 📝 Roadmap

- [ ] Add more cake themes and designs
- [ ] Music player integration
- [ ] Video message support
- [ ] Multiple language support
- [ ] Mobile-optimized controls
- [ ] Custom color themes

## ⭐ Show Your Support

If you like this project, please give it a ⭐ on GitHub!

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📧 Contact

For questions or suggestions, please open an issue on [GitHub](https://github.com/ak-1344/Birthday-3d/issues).

---

Made with ❤️ by [ak-1344](https://github.com/ak-1344)
