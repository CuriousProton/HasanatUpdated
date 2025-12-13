# Android Testing Setup Guide

This guide will help you test the Hasanat Tracker app on your Android phone using Expo Go.

## Prerequisites

1. **On your Android phone:**
   - Install **Expo Go** from the Google Play Store
   - Enable Developer Options (Settings > About Phone > Tap "Build Number" 7 times)
   - Connect to the same WiFi network as your development computer

2. **On your development computer:**
   - Node.js installed (v16 or higher recommended)
   - npm or yarn package manager

## Setup Steps

### 1. Install Dependencies

```bash
cd hasanat-tracker
npm install
```

If you encounter issues, try:
```bash
npm install --legacy-peer-deps
```

### 2. Start the Development Server

```bash
npm start
```

Or alternatively:
```bash
npx expo start
```

### 3. Connect Your Android Phone

Once the development server starts, you'll see a QR code in your terminal.

**Option A: Using QR Code (Recommended)**
1. Open **Expo Go** app on your Android phone
2. Tap "Scan QR code"
3. Point your camera at the QR code in the terminal
4. The app will load on your device

**Option B: Using Tunnel (if same WiFi doesn't work)**
```bash
npx expo start --tunnel
```
Then scan the QR code as above.

**Option C: Manual URL Entry**
1. Note the URL shown in the terminal (e.g., `exp://192.168.1.x:8081`)
2. Open Expo Go on your phone
3. Manually enter the URL

## Troubleshooting

### App won't load
- Ensure both devices are on the same WiFi network
- Try using `--tunnel` mode: `npx expo start --tunnel`
- Check if your firewall is blocking port 8081

### "Expo CLI not found" error
```bash
npm install -g expo-cli
```

### Dependencies installation fails
```bash
rm -rf node_modules package-lock.json
npm install --legacy-peer-deps
```

### Metro bundler errors
```bash
npm start -- --reset-cache
```

## App Features

The Hasanat Tracker helps you:
- Track daily prayers (Salah)
- Record Quran reading
- Monitor charity (Sadaqah)
- Count Dhikr
- Track fasting
- Record acts of kindness
- View your spiritual history

## Development Notes

- **App Name:** Hasanat Tracker
- **Package:** com.hasanattracker.app
- **Expo SDK:** ~51.0.0
- **React Native:** 0.74.5

## Additional Commands

- **Android-specific start:** `npm run android`
- **iOS-specific start:** `npm run ios`
- **Web version:** `npm run web`

## Next Steps

Once you've successfully tested on your phone:
1. You can modify the app code
2. Changes will hot-reload automatically
3. Shake your device to open the developer menu
4. Use the React Native Debugger for advanced debugging

---

For more information, visit:
- [Expo Documentation](https://docs.expo.dev/)
- [React Native Documentation](https://reactnative.dev/)
