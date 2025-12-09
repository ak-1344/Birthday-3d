/**
 * Configuration data for the Birthday 3D application
 * Hardcoded values that were previously in .env file
 */

export const data = {
  // Person's Information
  personName: 'Muskan',
  personAge: 21,

  // Custom Birthday Message (appears on intro overlay)
  birthdayMessage: 'Wishing you a day filled with happiness and a year filled with joy!',

  // Photo Configuration
  // Add your photos to src/assets/ folder named as: photo1.jpg, photo2.jpg, photo3.jpg, etc.
  // Supported formats: .jpg, .jpeg, .png, .webp
  photoCount: 6,

  // Optional: Cake tiers
  cakeTiers: 3,

  // Optional: Number of candles (defaults to age if not specified)
  candleCount: 5,
};

export default data;
