// screens/SalahScreen.js
// Salah tracking with mosque toggle

import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { Header } from '../components/Header';
import { BigHadithCard } from '../components/HadithCard';
import { prayers } from '../data/prayers';
import { calculateSalahReward } from '../utils/calculations';
import { colors, spacing, fontSize, fontWeight, borderRadius } from '../styles/theme';
import { commonStyles } from '../styles/commonStyles';

export const SalahScreen = ({ onBack, onRecord }) => {
  const [selectedPrayer, setSelectedPrayer] = useState(null);
  const [atMosque, setAtMosque] = useState(false);

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
        {/* Hadith Card */}
        <BigHadithCard
          prayer={{
            hadith: '"Prayer in congregation is twenty-seven times superior to prayer offered alone."',
            reference: 'Sahih al-Bukhari 645',
          }}
        />

        {/* Prayer Selection */}
        <Text style={commonStyles.label}>Select Prayer</Text>
        {prayers.map((prayer) => (
          <TouchableOpacity
            key={prayer.name}
            style={[
              styles.prayerCard,
              selectedPrayer?.name === prayer.name && styles.prayerCardSelected,
            ]}
            onPress={() => setSelectedPrayer(prayer)}
          >
            <Text style={styles.prayerIcon}>{prayer.icon}</Text>
            <View style={styles.prayerInfo}>
              <Text style={styles.prayerName}>{prayer.name}</Text>
              <Text style={styles.prayerTime}>{prayer.time}</Text>
              <Text style={styles.prayerReward}>🎁 {prayer.reward}</Text>
            </View>
            {selectedPrayer?.name === prayer.name && (
              <Text style={styles.checkmark}>✓</Text>
            )}
          </TouchableOpacity>
        ))}

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
            <View style={styles.rewardBox}>
              <Text style={styles.rewardLabel}>Estimated Reward:</Text>
              <Text style={styles.rewardValue}>
                {calculateSalahReward(selectedPrayer, atMosque)}
              </Text>
              {atMosque && (
                <Text style={styles.rewardBonus}>
                  ✨ 27x multiplier for congregation!
                </Text>
              )}
            </View>
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
    borderColor: colors.border.light,
  },

  prayerCardSelected: {
    borderColor: colors.salah,
    backgroundColor: '#eff6ff',
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
    color: colors.text.primary,
    marginBottom: spacing.xs / 2,
  },

  prayerTime: {
    fontSize: fontSize.sm,
    color: colors.text.secondary,
    marginBottom: spacing.xs,
  },

  prayerReward: {
    fontSize: fontSize.sm,
    color: colors.salah,
    fontWeight: fontWeight.semibold,
  },

  checkmark: {
    fontSize: 24,
    color: colors.salah,
    fontWeight: fontWeight.bold,
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
    backgroundColor: '#d1fae5',
    borderRadius: borderRadius.lg,
    padding: spacing.lg,
    alignItems: 'center',
  },

  rewardLabel: {
    fontSize: fontSize.sm,
    color: '#065f46',
    marginBottom: spacing.xs,
  },

  rewardValue: {
    fontSize: fontSize.xl,
    fontWeight: fontWeight.bold,
    color: '#065f46',
    textAlign: 'center',
  },

  rewardBonus: {
    fontSize: fontSize.sm,
    color: '#059669',
    marginTop: spacing.sm,
    textAlign: 'center',
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
});