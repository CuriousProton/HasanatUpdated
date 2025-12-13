# 📿 Hasanat Tracker

A beautiful and intuitive mobile application for Muslims to track their good deeds (Hasanat) and spiritual activities. Built with React Native and Expo, this app helps you maintain a daily record of your Islamic practices and stay motivated on your spiritual journey.

## ✨ Features

### 📱 Core Functionality
- **Track Multiple Categories**: Record various types of good deeds including:
  - 🕌 **Salah (Prayer)**: Track your daily prayers
  - 📖 **Quran**: Record verses read or memorized
  - 💰 **Charity**: Log charitable contributions
  - 📿 **Dhikr**: Track remembrance and supplications
  - 🌙 **Fasting**: Record fasting days
  - ❤️ **Kindness**: Track acts of kindness

### 🎯 Key Features
- **History Tracking**: View all your recorded hasanat entries with dates
- **Daily Notifications**: Receive motivational reminders at 9 PM daily
- **Encouraging Messages**: Get personalized messages based on your daily progress
- **References**: Access Islamic references and motivational tips
- **Beautiful UI**: Modern, clean interface with intuitive navigation
- **Offline Support**: All data stored locally on your device
- **Data Persistence**: Your entries are automatically saved

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher recommended)
- npm or yarn
- Expo CLI (optional, but recommended)
- For Android: Android Studio and Android SDK
- For iOS: Xcode (macOS only)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd hasanat-tracker
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm start
   # or
   npx expo start
   ```

4. **Run on your device/emulator**
   - **Android**: Press `a` in the terminal or run `npm run android`
   - **iOS**: Press `i` in the terminal or run `npm run ios`
   - **Web**: Press `w` in the terminal or run `npm run web`

### Using Expo Go

1. Install **Expo Go** app on your mobile device:
   - [Android](https://play.google.com/store/apps/details?id=host.exp.exponent)
   - [iOS](https://apps.apple.com/app/expo-go/id982107779)

2. Scan the QR code displayed in your terminal with:
   - **Android**: Expo Go app
   - **iOS**: Camera app

## 📦 Building the App

### Building APK for Android

This project uses [EAS Build](https://docs.expo.dev/build/introduction/) for building production-ready apps.

1. **Install EAS CLI**
   ```bash
   npm install -g eas-cli
   ```

2. **Login to Expo**
   ```bash
   eas login
   ```

3. **Configure the build**
   ```bash
   eas build:configure
   ```

4. **Build the APK**
   ```bash
   eas build -p android --profile preview
   ```

5. **Download the APK**
   - After the build completes, you'll receive a download link
   - Download and install the APK on your Android device

### Building for iOS

```bash
eas build -p ios --profile preview
```

> **Note**: iOS builds require an Apple Developer account.

## 🏗️ Project Structure

```
hasanat-tracker/
├── assets/              # App icons and splash screens
├── components/          # Reusable UI components
│   ├── CategoryCard.js
│   ├── HadithCard.js
│   ├── Header.js
│   └── RewardBadge.js
├── data/                # Static data and content
│   ├── categories.js
│   ├── dhikr.js
│   ├── fasting.js
│   ├── hadiths.js
│   ├── motivationalTips.js
│   ├── prayers.js
│   ├── quotes.js
│   └── surahs.js
├── screens/             # App screens
│   ├── HomeScreen.js
│   ├── SalahScreen.js
│   ├── QuranScreen.js
│   ├── CharityScreen.js
│   ├── DhikrScreen.js
│   ├── FastingScreen.js
│   ├── KindnessScreen.js
│   ├── HistoryScreen.js
│   └── ReferencesScreen.js
├── styles/              # Styling files
│   ├── commonStyles.js
│   └── theme.js
├── utils/               # Utility functions
│   ├── calculations.js
│   ├── dateHelpers.js
│   ├── notifications.js
│   └── storage.js
├── App.js               # Main app component
├── app.json             # Expo configuration
├── eas.json             # EAS Build configuration
└── package.json         # Dependencies and scripts
```

## 🛠️ Tech Stack

- **Framework**: React Native
- **Build Tool**: Expo SDK 54
- **Language**: JavaScript
- **State Management**: React Hooks (useState, useEffect)
- **Storage**: AsyncStorage
- **Notifications**: Expo Notifications
- **Navigation**: Custom screen-based navigation

## 📱 Available Scripts

- `npm start` - Start the Expo development server
- `npm run android` - Start and open on Android emulator/device
- `npm run ios` - Start and open on iOS simulator/device
- `npm run web` - Start and open in web browser

## 🔔 Notifications

The app sends daily notifications at 9 PM to remind you to track your hasanat. The notification includes:
- Today's hasanat count
- Encouraging message based on your progress
- Motivational tip

To enable notifications:
1. Grant notification permissions when prompted
2. Notifications will be scheduled automatically

## 💾 Data Storage

All your hasanat entries are stored locally on your device using AsyncStorage. Your data is:
- ✅ Stored securely on your device
- ✅ Automatically saved when you add entries
- ✅ Accessible offline
- ✅ Never sent to external servers

## 🎨 Customization

### Changing App Colors

Edit `styles/theme.js` to customize the app's color scheme.

### Adding New Categories

1. Add category data to `data/categories.js`
2. Create a new screen component in `screens/`
3. Add the screen to the navigation in `App.js`

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is private and proprietary.

## 👤 Author

**CuriousProton**
- GitHub: [@CuriousProton](https://github.com/CuriousProton)

## 🙏 Acknowledgments

- Built with [Expo](https://expo.dev/)
- Powered by [React Native](https://reactnative.dev/)
- Icons and UI inspired by modern Islamic app design principles

## 📞 Support

For support, email or open an issue in the GitHub repository.

---

**May this app help you in your journey of tracking good deeds and growing closer to Allah (SWT). Barakallahu feekum! 🌟**

