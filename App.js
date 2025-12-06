// App.js
// Main application entry point

import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

// Screens
import { HomeScreen } from './screens/HomeScreen';
import { SalahScreen } from './screens/SalahScreen';
import { QuranScreen } from './screens/QuranScreen';
import { CharityScreen } from './screens/CharityScreen';
import { DhikrScreen } from './screens/DhikrScreen';
import { FastingScreen } from './screens/FastingScreen';
import { KindnessScreen } from './screens/KindnessScreen';
import { HistoryScreen } from './screens/HistoryScreen';
import { ReferencesScreen } from './screens/ReferencesScreen';

// Utils
import { loadHasanat, saveHasanat } from './utils/storage';
import {
  registerForPushNotifications,
  scheduleDailyNotification,
  updateDailyNotification
} from './utils/notifications';

// Styles
import { colors } from './styles/theme';

export default function App() {
  const [currentView, setCurrentView] = useState('home');
  const [hasanat, setHasanat] = useState([]);

  // Load data and setup notifications on mount
  useEffect(() => {
    const initializeApp = async () => {
      // Load hasanat data
      const data = await loadHasanat();
      setHasanat(data);

      // Request notification permissions
      const permissionGranted = await registerForPushNotifications();

      if (permissionGranted) {
        // Schedule daily notification at 9 PM
        await scheduleDailyNotification(data);
      }
    };

    initializeApp();
  }, []);

  // Update notification whenever hasanat changes
  useEffect(() => {
    if (hasanat.length > 0) {
      updateDailyNotification(hasanat);
    }
  }, [hasanat]);

  // Add new hasanah entry
  const addHasanah = async (entry) => {
    const newEntry = {
      id: Date.now(),
      ...entry,
      date: new Date().toISOString(),
    };

    const updated = [newEntry, ...hasanat];
    setHasanat(updated);
    await saveHasanat(updated);
    
    // Navigate back to home after recording
    setTimeout(() => {
      setCurrentView('home');
    }, 1500);
  };

  // Delete hasanah entry
  const deleteHasanah = async (id) => {
    const updated = hasanat.filter((entry) => entry.id !== id);
    setHasanat(updated);
    await saveHasanat(updated);
    
    Alert.alert('Deleted', 'Entry has been removed', [{ text: 'OK' }]);
  };

  // Navigate to different screens
  const handleNavigate = (view) => {
    setCurrentView(view);
  };

  // Navigate back to home
  const handleBack = () => {
    setCurrentView('home');
  };

  // Render current screen
  const renderScreen = () => {
    switch (currentView) {
      case 'home':
        return <HomeScreen onNavigate={handleNavigate} />;

      case 'salah':
        return <SalahScreen onBack={handleBack} onRecord={addHasanah} />;

      case 'quran':
        return <QuranScreen onBack={handleBack} onRecord={addHasanah} />;

      case 'charity':
        return <CharityScreen onBack={handleBack} onRecord={addHasanah} />;

      case 'dhikr':
        return <DhikrScreen onBack={handleBack} onRecord={addHasanah} />;

      case 'fasting':
        return <FastingScreen onBack={handleBack} onRecord={addHasanah} />;

      case 'kindness':
        return <KindnessScreen onBack={handleBack} onRecord={addHasanah} />;

      case 'history':
        return (
          <HistoryScreen
            onBack={handleBack}
            hasanat={hasanat}
            onDelete={deleteHasanah}
          />
        );

      case 'references':
        return <ReferencesScreen onBack={handleBack} />;

      default:
        return <HomeScreen onNavigate={handleNavigate} />;
    }
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
        {renderScreen()}
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background.secondary,
  },
});
