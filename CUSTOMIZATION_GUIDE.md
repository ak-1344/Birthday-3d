# 🎉 Customization Guide

This guide helps you personalize the Birthday 3D website for your special someone!

## Quick Setup (5 minutes)

### Step 1: Open the Configuration File

Open `src/data.ts` in your code editor.

### Step 2: Personalize Your Settings

Update the values in the `data` object:

```typescript
export const data = {
  // Person's Information
  personName: 'Alex',              // Change to recipient's name
  personAge: 25,                   // Change to recipient's age

  // Custom Birthday Message (appears on intro overlay)
  birthdayMessage: 'Wishing you a day filled with happiness and a year filled with joy!',

  // Photo Configuration
  // Add your photos to src/assets/ folder named as: photo1.jpg, photo2.jpg, photo3.jpg, etc.
  // Supported formats: .jpg, .jpeg, .png, .webp
  photoCount: 6,                   // How many photos you'll add (max 11)

  // Optional: Number of candles (defaults to age if not specified)
  candleCount: 5,
};
```

### Step 3: Add Photos

1. Place your photos in `src/assets/`
2. Name them: `photo1.jpg`, `photo2.jpg`, `photo3.jpg`, etc.
3. Supported formats: `.jpg`, `.jpeg`, `.png`, `.webp`
4. See `src/assets/README.md` for detailed instructions

### Step 4: Save and View

Save the file - Vite will automatically reload your changes!

Visit `http://localhost:5173` (or the port shown in your terminal) to see your personalized birthday site! 🎂

---

## Configuration Reference

| Property | Description | Type | Example | Required |
|----------|-------------|------|---------|----------|
| `personName` | Birthday person's name | string | `'Sarah'` | Yes |
| `personAge` | Person's age (sets default candle count) | number | `25` | Yes |
| `birthdayMessage` | Custom intro message | string | `'Happy Birthday!'` | Yes |
| `photoCount` | Number of photos to display (max 11) | number | `6` | Yes |
| `candleCount` | Override candle count | number | `5` | No (defaults to age) |

## Advanced Customization

### Changing Colors and Themes

Edit individual component files to customize colors:

**Cake Colors** (`src/components/Cake.jsx`):
```jsx
// Line ~40: Cake tier colors
<meshStandardMaterial color="#ffd700" />  // Change color here
```

**Background** (`src/components/Environment.jsx`):
```jsx
// Background color and effects
<color attach="background" args={['#0a0a1a']} />
```

**Photo Frames** (`src/components/HangingPhotos.jsx`):
```jsx
// Frame colors and materials
<meshStandardMaterial color="#d4af37" />
```

### Customizing the Cake

The cake automatically uses the age from `personAge` in `src/data.ts` to determine candle count.

**Custom Candle Count:**
```typescript
candleCount: 10  // Always show 10 candles, regardless of age
```

### Photo Configuration

**Maximum Photos**: Up to 11 photos can be displayed in the scene
- Photos 1-5: Back wall (zigzag pattern)
- Photos 6-8: Left wall
- Photos 9-11: Right wall

**Photo Positions**: Photos are arranged in a circular gallery around the scene

**Placeholder Colors**: If photos are missing, colorful placeholders appear

### Customizing Messages

Edit the birthday message in `src/data.ts`:

```typescript
birthdayMessage: 'Your custom message here! Can be multiple lines if needed.',
```

You can also edit the letter content in `src/components/LetterZoom.jsx` for the birthday letter that appears when clicked.

## Troubleshooting

### Photos Not Showing?

1. ✅ Check file names: `photo1.jpg`, `photo2.jpg`, etc.
2. ✅ Verify files are in `src/assets/` folder
3. ✅ Check `photoCount` in `src/data.ts` matches number of photos
4. ✅ Check browser console for loading errors

### Candles Not Matching Age?

- Make sure `personAge` is a number (no quotes)
- If using `candleCount`, it overrides the age

### Changes Not Appearing?

1. ✅ Make sure you saved `src/data.ts`
2. ✅ Check the terminal for any build errors
3. ✅ Hard refresh browser (Ctrl+Shift+R or Cmd+Shift+R)
4. ✅ Clear browser cache if needed

## Deployment Checklist

Before deploying your personalized site:

- [ ] `src/data.ts` is configured with correct information
- [ ] All photos are added to `src/assets/`
- [ ] Tested locally with `npm run dev`
- [ ] Built successfully with `npm run build`
- [ ] All changes committed to your repository

## Security Note

✨ **Good News**: Since we're using `src/data.ts` instead of environment variables, all your customization is part of the code and will be automatically included when you deploy!

No need to configure environment variables separately on your hosting platform.

## Need Help?

- 📖 Check the main [README.md](README.md)
- 📸 See [src/assets/README.md](src/assets/README.md) for photo setup
- 🐛 Report issues on [GitHub](https://github.com/ak-1344/Birthday-3d/issues)
- 💡 Suggest features in [GitHub Discussions](https://github.com/ak-1344/Birthday-3d/discussions)

---

## Examples

### Example 1: Minimalist (3 photos, simple message)
```typescript
export const data = {
  personName: 'Emma',
  personAge: 30,
  birthdayMessage: 'Happy 30th Birthday!',
  photoCount: 3,
};
```

### Example 2: Extravagant (8 photos, custom candles)
```typescript
export const data = {
  personName: 'Michael',
  personAge: 40,
  birthdayMessage: 'Celebrating 40 amazing years! Here\'s to many more adventures together!',
  photoCount: 8,
  candleCount: 40,
};
```

### Example 3: Child's Birthday
```typescript
export const data = {
  personName: 'Sophie',
  personAge: 7,
  birthdayMessage: 'Happy 7th Birthday Princess! 🎂👑',
  photoCount: 5,
};
```

---

Happy customizing! 🎉✨

**The project is now a reusable birthday template! 🎂✨**
