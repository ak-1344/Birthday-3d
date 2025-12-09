# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### 🐛 Fixed
- Fixed image loading issue where photos in `src/assets/` weren't displaying on hanging photo frames or in zoomed view
- Resolved variable name collision in `HangingPhotos.jsx` that prevented images from loading correctly
- Fixed zoomed photo modal to use `<img>` tag instead of CSS background for better compatibility with Vite's asset handling

### ✨ Added
- "Read Me" button now disappears after clicking on the birthday letter for cleaner UI
- Improved image handling with proper Vite `import.meta.glob` integration

### 🔧 Changed
- Migrated configuration from `.env` file to `src/data.ts` for better TypeScript support
- Enhanced photo loading with support for multiple image formats (jpg, jpeg, png, webp)
- Updated state management to track letter interaction for better UX

## [1.0.0] - 2025-12-02

### 🎉 Initial Open Source Release

This is the first open-source release of Birthday 3D!

### ✨ Added

#### Core Features
- Interactive 3D birthday cake with multiple tiers
- Age-based candle system (dynamically generated)
- Blow candles feature with realistic smoke animation
- Hanging photo gallery with zoom functionality
- Cinematic camera intro animation
- 3D environment with balloons, confetti, and gift boxes
- Starry night background with fog effects
- Dynamic party lighting system
- Interactive camera controls (orbit, zoom, pan)

#### Customization
- Full environment variable configuration
- Customizable person name
- Customizable age (affects candle count)
- Custom birthday messages
- Configurable photo count (up to 8 photos)
- Optional cake tier configuration
- Optional manual candle count override

#### Documentation
- Comprehensive README with setup instructions
- Detailed customization guide
- Deployment guide for multiple platforms
- Contributing guidelines
- Code of Conduct
- Security policy
- Photo setup guide
- Environment variable reference

#### Developer Experience
- Vite build system for fast development
- Hot module replacement
- ESLint configuration
- React 19 support
- Three.js integration with React Three Fiber
- Framer Motion for UI animations

#### Open Source Infrastructure
- MIT License
- GitHub issue templates (bug reports, feature requests)
- Pull request template
- CI/CD workflow with GitHub Actions
- .gitattributes for proper file handling
- Comprehensive .gitignore

### 🛠️ Technical Stack
- React 19.2.0
- Three.js 0.181.2
- @react-three/fiber 9.4.2
- @react-three/drei 10.7.7
- Framer Motion 12.23.25
- Vite 7.2.4

### 📦 Deployment Support
- Vercel (recommended)
- Netlify
- GitHub Pages
- Cloudflare Pages
- Firebase Hosting
- Generic static hosting

### 🎯 Browser Support
- Modern browsers with WebGL support
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

---

## [Unreleased]

### 🔮 Planned Features
- Multiple cake themes and designs
- Music player integration
- Video message support
- Multiple language support
- Mobile-optimized touch controls
- Custom color theme editor
- Export as shareable link
- Animation speed controls
- More particle effects

---

## Release Notes Format

### Types of Changes
- `Added` for new features
- `Changed` for changes in existing functionality
- `Deprecated` for soon-to-be removed features
- `Removed` for now removed features
- `Fixed` for any bug fixes
- `Security` for vulnerability fixes

---

[1.0.0]: https://github.com/ak-1344/Birthday-3d/releases/tag/v1.0.0
