/**
 * Configuration data for the Birthday 3D application
 * Hardcoded values that were previously in .env file
 */

export const data = {
  // Person's Information
  personName: 'Muskan',
  personAge: 21,

  // Custom Birthday Message (appears on intro overlay)
birthdayMessage: 'Hey there! \nHope you are doing great! Wishing you a very happy birthday! 🎂\nMay your problems go away as you blow the candles! 🕯️✨\nIdc what happens but brother, I want you to be happy always! 💙\nWell, age always catches up... As well the wisdom! 🧠 Keep growing and glowing. ✨\nWish you all the best for upcoming events in your life! \nStay safe and take care! 🙏',

  // Photo Configuration
  // Add your photos to src/assets/ folder named as: photo1.jpg, photo2.jpg, photo3.jpg, etc.
  // Supported formats: .jpg, .jpeg, .png, .webp
  photoCount: 11,


  // Optional: Number of candles (defaults to age if not specified)
  candleCount: 5,
};

export default data;
