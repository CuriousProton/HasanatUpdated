// screens/SalahScreen.js
// Salah tracking with mosque toggle

import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { Header } from '../components/Header';
import { BigHadithCard } from '../components/HadithCard';
import { prayers } from '../data/prayers';
import { calculateSalahReward, calculateSalahRewardValue } from '../utils/calculations';
import { colors, spacing, fontSize, fontWeight, borderRadius } from '../styles/theme';
import { commonStyles } from '../styles/commonStyles';

export const SalahScreen = ({ onBack, onRecord }) => {
  const [selectedPrayer, setSelectedPrayer] = useState(null);
  const [atMosque, setAtMosque] = useState(false);

  // Helper function to add opacity to hex color
  const addOpacity = (hex, opacity) => {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `rgba(${r}, ${g}, ${b}, ${opacity})`;
  };

  const handleRecord = () => {
    if (!selectedPrayer) {
      Alert.alert('Select Prayer', 'Please select which prayer you performed');
      return;
    }

    const reward = calculateSalahReward(selectedPrayer, atMosque);
    const location = atMosque ? 'at mosque' : 'at home';

    onRecord({
      type: 'salah',
      details: `${selectedPrayer.name} ${location}`,
      rewordValue: calculateSalahRewardValue(selectedPrayer, atMosque),
      estimatedReward: reward,
    });

    Alert.alert(
      '🎉 Salah Recorded!',
      `May Allah accept your ${selectedPrayer.name} prayer!\n\nReward: ${reward}`,
      [{ text: 'Alhamdulillah!' }]
    );

    // Reset
    setSelectedPrayer(null);
    setAtMosque(false);
  };

  return (
    <View style={commonStyles.container}>
      <Header title="🕌 Salah" showBack onBack={onBack} />

      <ScrollView contentContainerStyle={commonStyles.scrollContent}>
        {/* General Hadith about Salah */}
        <BigHadithCard
          prayer={{
            hadith: '"The first matter that the slave will be brought to account for on the Day of Judgment is the prayer. If it is sound, then the rest of his deeds will be sound. And if it is bad, then the rest of his deeds will be bad."',
            reference: 'Sunan an-Nasa\'i 465',
          }}
        />

        {/* Selected Prayer's Specific Hadith */}
        {selectedPrayer && (() => {
          const prayerColor = (() => {
            const colorMap = {
              'Fajr': colors.prayers.fajr,
              'Dhuhr': colors.prayers.dhuhr,
              'Asr': colors.prayers.asr,
              'Maghrib': colors.prayers.maghrib,
              'Isha': colors.prayers.isha,
            };
            return colorMap[selectedPrayer.name] || colors.salah;
          })();
          
          return (
            <View style={[styles.prayerHadithCard, { borderLeftColor: prayerColor }]}>
              <Text style={[styles.prayerHadithTitle, { color: prayerColor }]}>
                💡 About {selectedPrayer.name} Prayer
              </Text>
              <Text style={styles.prayerHadithText}>
                {selectedPrayer.hadith}
              </Text>
              <Text style={styles.prayerHadithReference}>
                — {selectedPrayer.reference}
              </Text>
              <View style={[styles.importanceBox, { backgroundColor: addOpacity(prayerColor, 0.1) }]}>
                <Text style={[styles.importanceText, { color: prayerColor }]}>
                  ⭐ {selectedPrayer.importance}
                </Text>
              </View>
            </View>
          );
        })()}

        {/* Prayer Selection */}
        <Text style={commonStyles.label}>Select Prayer</Text>
        {prayers.map((prayer) => {
          // Get prayer-specific color based on name
          const getPrayerColor = (prayerName) => {
            const colorMap = {
              'Fajr': colors.prayers.fajr,
              'Dhuhr': colors.prayers.dhuhr,
              'Asr': colors.prayers.asr,
              'Maghrib': colors.prayers.maghrib,
              'Isha': colors.prayers.isha,
            };
            return colorMap[prayerName] || colors.salah;
          };
          
          const prayerColor = getPrayerColor(prayer.name);
          
          return (
            <TouchableOpacity
              key={prayer.name}
              style={[
                styles.prayerCard,
                { borderColor: prayerColor },
                selectedPrayer?.name === prayer.name && [
                  styles.prayerCardSelected,
                  { 
                    borderColor: prayerColor,
                    backgroundColor: addOpacity(prayerColor, 0.1), // 10% opacity
                  }
                ],
              ]}
              onPress={() => setSelectedPrayer(prayer)}
            >
              <Text style={styles.prayerIcon}>{prayer.icon}</Text>
              <View style={styles.prayerInfo}>
                <Text style={[styles.prayerName, { color: prayerColor }]}>
                  {prayer.name}
                </Text>
                <Text style={styles.prayerTime}>{prayer.time}</Text>
                <Text style={[styles.prayerReward, { color: prayerColor }]}>
                  🎁 {prayer.reward}
                </Text>
              </View>
              {selectedPrayer?.name === prayer.name && (
                <Text style={[styles.checkmark, { color: prayerColor }]}>✓</Text>
              )}
            </TouchableOpacity>
          );
        })}

        {/* Mosque Toggle */}
        {selectedPrayer && (
          <View style={styles.mosqueSection}>
            <Text style={commonStyles.label}>Where did you pray?</Text>
            
            <View style={styles.toggleContainer}>
              <TouchableOpacity
                style={[
                  styles.toggleButton,
                  !atMosque && styles.toggleButtonActive,
                ]}
                onPress={() => setAtMosque(false)}
              >
                <Text style={styles.toggleIcon}>🏠</Text>
                <Text
                  style={[
                    styles.toggleText,
                    !atMosque && styles.toggleTextActive,
                  ]}
                >
                  At Home
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[
                  styles.toggleButton,
                  atMosque && styles.toggleButtonActive,
                ]}
                onPress={() => setAtMosque(true)}
              >
                <Text style={styles.toggleIcon}>🕌</Text>
                <Text
                  style={[
                    styles.toggleText,
                    atMosque && styles.toggleTextActive,
                  ]}
                >
                  At Mosque
                </Text>
              </TouchableOpacity>
            </View>

            {/* Reward Display */}
            {(() => {
              const prayerColor = (() => {
                const colorMap = {
                  'Fajr': colors.prayers.fajr,
                  'Dhuhr': colors.prayers.dhuhr,
                  'Asr': colors.prayers.asr,
                  'Maghrib': colors.prayers.maghrib,
                  'Isha': colors.prayers.isha,
                };
                return colorMap[selectedPrayer.name] || colors.salah;
              })();
              
              return (
                <View style={[styles.rewardBox, { backgroundColor: addOpacity(prayerColor, 0.15) }]}>
                  <Text style={[styles.rewardLabel, { color: prayerColor }]}>
                    Estimated Reward:
                  </Text>
                  <Text style={[styles.rewardValue, { color: prayerColor }]}>
                    {calculateSalahReward(selectedPrayer, atMosque)}
                  </Text>
                  {atMosque && (
                    <Text style={[styles.rewardBonus, { color: prayerColor }]}>
                      ✨ 27x multiplier for congregation!
                    </Text>
                  )}
                </View>
              );
            })()}
          </View>
        )}

        {/* Record Button */}
        <TouchableOpacity
          style={[
            commonStyles.button,
            !selectedPrayer && commonStyles.buttonDisabled,
          ]}
          onPress={handleRecord}
          disabled={!selectedPrayer}
        >
          <Text style={commonStyles.buttonText}>
            ✅ Record Salah
          </Text>
        </TouchableOpacity>

        {/* Extra Reminder */}
        <View style={styles.reminder}>
          <Text style={styles.reminderIcon}>💡</Text>
          <Text style={styles.reminderText}>
            Remember to renew your intention before each prayer!
          </Text>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  prayerCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.background.primary,
    borderRadius: borderRadius.lg,
    padding: spacing.lg,
    marginBottom: spacing.md,
    borderWidth: 2,
  },

  prayerCardSelected: {
    // Dynamic colors applied inline
  },

  prayerIcon: {
    fontSize: 40,
    marginRight: spacing.md,
  },

  prayerInfo: {
    flex: 1,
  },

  prayerName: {
    fontSize: fontSize.lg,
    fontWeight: fontWeight.bold,
    marginBottom: spacing.xs / 2,
    // Dynamic color applied inline
  },

  prayerTime: {
    fontSize: fontSize.sm,
    color: colors.text.secondary,
    marginBottom: spacing.xs,
  },

  prayerReward: {
    fontSize: fontSize.sm,
    fontWeight: fontWeight.semibold,
    // Dynamic color applied inline
  },

  checkmark: {
    fontSize: 24,
    fontWeight: fontWeight.bold,
    // Dynamic color applied inline
  },

  mosqueSection: {
    marginTop: spacing.lg,
  },

  toggleContainer: {
    flexDirection: 'row',
    gap: spacing.md,
    marginBottom: spacing.lg,
  },

  toggleButton: {
    flex: 1,
    backgroundColor: colors.background.tertiary,
    borderRadius: borderRadius.lg,
    padding: spacing.lg,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: colors.border.light,
  },

  toggleButtonActive: {
    backgroundColor: '#eff6ff',
    borderColor: colors.salah,
  },

  toggleIcon: {
    fontSize: 32,
    marginBottom: spacing.sm,
  },

  toggleText: {
    fontSize: fontSize.md,
    fontWeight: fontWeight.semibold,
    color: colors.text.secondary,
  },

  toggleTextActive: {
    color: colors.salah,
  },

  rewardBox: {
    borderRadius: borderRadius.lg,
    padding: spacing.lg,
    alignItems: 'center',
    // Dynamic background color applied inline
  },

  rewardLabel: {
    fontSize: fontSize.sm,
    marginBottom: spacing.xs,
    // Dynamic color applied inline
  },

  rewardValue: {
    fontSize: fontSize.xl,
    fontWeight: fontWeight.bold,
    textAlign: 'center',
    // Dynamic color applied inline
  },

  rewardBonus: {
    fontSize: fontSize.sm,
    marginTop: spacing.sm,
    textAlign: 'center',
    // Dynamic color applied inline
  },

  reminder: {
    backgroundColor: colors.background.primary,
    borderRadius: borderRadius.lg,
    padding: spacing.lg,
    marginTop: spacing.lg,
    flexDirection: 'row',
    alignItems: 'center',
  },

  reminderIcon: {
    fontSize: 24,
    marginRight: spacing.md,
  },

  reminderText: {
    flex: 1,
    fontSize: fontSize.sm,
    color: colors.text.secondary,
    lineHeight: 20,
  },

  prayerHadithCard: {
    backgroundColor: '#eff6ff',
    borderRadius: borderRadius.lg,
    padding: spacing.lg,
    marginBottom: spacing.lg,
    borderLeftWidth: 4,
    // Dynamic border color applied inline
  },

  prayerHadithTitle: {
    fontSize: fontSize.lg,
    fontWeight: fontWeight.bold,
    marginBottom: spacing.md,
    // Dynamic color applied inline
  },

  prayerHadithText: {
    fontSize: fontSize.md,
    color: colors.text.primary,
    lineHeight: 22,
    fontStyle: 'italic',
    marginBottom: spacing.sm,
  },

  prayerHadithReference: {
    fontSize: fontSize.sm,
    color: colors.text.secondary,
    textAlign: 'right',
    marginBottom: spacing.md,
  },

  importanceBox: {
    borderRadius: borderRadius.md,
    padding: spacing.sm,
    alignItems: 'center',
    // Dynamic background color applied inline
  },

  importanceText: {
    fontSize: fontSize.sm,
    fontWeight: fontWeight.semibold,
    // Dynamic color applied inline
  },
});