// screens/DhikrScreen.js
// Dhikr counter with special rewards

import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { Header } from '../components/Header';
import { SmallHadithCard } from '../components/HadithCard';
import { dhikrOptions } from '../data/dhikr';
import { dhikrHadithCards } from '../data/hadiths';
import { calculateDhikrReward } from '../utils/calculations';
import { colors, spacing, fontSize, fontWeight, borderRadius } from '../styles/theme';
import { commonStyles } from '../styles/commonStyles';

export const DhikrScreen = ({ onBack, onRecord }) => {
  const [selectedDhikr, setSelectedDhikr] = useState(null);
  const [count, setCount] = useState(0);

  const handleIncrement = () => {
    setCount(count + 1);
    
    // Haptic feedback milestone celebrations
    if (count + 1 === 33 || count + 1 === 100) {
      // Show milestone celebration
      Alert.alert('🎉 Milestone!', `MashaAllah! You reached ${count + 1}!`, [{ text: 'Continue' }]);
    }
  };

  const handleReset = () => {
    setCount(0);
  };

  const handleRecord = () => {
    if (!selectedDhikr) {
      Alert.alert('Select Dhikr', 'Please select which dhikr you recited');
      return;
    }

    if (count === 0) {
      Alert.alert('Add Count', 'Please add at least one count');
      return;
    }

    const specialReward = calculateDhikrReward(selectedDhikr, count);

    onRecord({
      type: 'dhikr',
      details: `${selectedDhikr.transliteration} (${count}x)`,
      estimatedReward: specialReward || `${count} times`,
    });

    Alert.alert(
      '✨ Dhikr Recorded!',
      `${selectedDhikr.transliteration} - ${count} times\n\n${specialReward || 'May Allah accept it!'}`,
      [{ text: 'Alhamdulillah!' }]
    );

    // Reset
    setCount(0);
  };

  return (
    <View style={commonStyles.container}>
      <Header title="✨ Dhikr" showBack onBack={onBack} />

      <ScrollView contentContainerStyle={commonStyles.scrollContent}>
        {/* Hadith Cards */}
        <View style={styles.hadithSection}>
          {dhikrHadithCards.map((hadith, index) => (
            <SmallHadithCard key={index} hadith={hadith} index={index} />
          ))}
        </View>

        {/* Dhikr Selection */}
        <Text style={commonStyles.label}>Select Dhikr</Text>
        {dhikrOptions.map((dhikr) => (
          <TouchableOpacity
            key={dhikr.id}
            style={[
              styles.dhikrCard,
              selectedDhikr?.id === dhikr.id && styles.dhikrCardSelected,
            ]}
            onPress={() => setSelectedDhikr(dhikr)}
          >
            <View style={styles.dhikrInfo}>
              <Text style={styles.dhikrArabic}>{dhikr.arabic}</Text>
              <Text style={styles.dhikrTransliteration}>{dhikr.transliteration}</Text>
              <Text style={styles.dhikrMeaning}>{dhikr.meaning}</Text>
              <Text style={styles.dhikrRecommended}>
                💡 Recommended: {dhikr.recommended}x
              </Text>
            </View>
            {selectedDhikr?.id === dhikr.id && (
              <Text style={styles.checkmark}>✓</Text>
            )}
          </TouchableOpacity>
        ))}

        {/* Counter Section */}
        {selectedDhikr && (
          <View style={styles.counterSection}>
            {/* Selected Dhikr Display */}
            <View style={styles.selectedDhikrBox}>
              <Text style={styles.selectedArabic}>{selectedDhikr.arabic}</Text>
              <Text style={styles.selectedTransliteration}>{selectedDhikr.transliteration}</Text>
            </View>

            {/* Counter Display */}
            <View style={styles.counterDisplay}>
              <Text style={styles.counterLabel}>Count</Text>
              <Text style={styles.counterNumber}>{count}</Text>
              <View style={styles.progressBar}>
                <View 
                  style={[
                    styles.progressFill, 
                    { width: `${Math.min((count / selectedDhikr.recommended) * 100, 100)}%` }
                  ]} 
                />
              </View>
              <Text style={styles.progressText}>
                {count} / {selectedDhikr.recommended} recommended
              </Text>
            </View>

            {/* Counter Buttons */}
            <View style={styles.counterButtons}>
              <TouchableOpacity
                style={styles.resetButton}
                onPress={handleReset}
              >
                <Text style={styles.resetButtonText}>Reset</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.incrementButton}
                onPress={handleIncrement}
              >
                <Text style={styles.incrementButtonText}>+1</Text>
              </TouchableOpacity>
            </View>

            {/* Quick Add Buttons */}
            <View style={styles.quickAddButtons}>
              <TouchableOpacity
                style={styles.quickAddButton}
                onPress={() => setCount(count + 10)}
              >
                <Text style={styles.quickAddText}>+10</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.quickAddButton}
                onPress={() => setCount(count + 33)}
              >
                <Text style={styles.quickAddText}>+33</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.quickAddButton}
                onPress={() => setCount(selectedDhikr.recommended)}
              >
                <Text style={styles.quickAddText}>+{selectedDhikr.recommended}</Text>
              </TouchableOpacity>
            </View>

            {/* Special Reward Display */}
            {calculateDhikrReward(selectedDhikr, count) && (
              <View style={styles.specialRewardBox}>
                <Text style={styles.specialRewardIcon}>🎁</Text>
                <Text style={styles.specialRewardTitle}>Special Reward Unlocked!</Text>
                <Text style={styles.specialRewardText}>
                  {calculateDhikrReward(selectedDhikr, count)}
                </Text>
              </View>
            )}

            {/* Record Button */}
            <TouchableOpacity
              style={[
                commonStyles.button,
                count === 0 && commonStyles.buttonDisabled,
              ]}
              onPress={handleRecord}
              disabled={count === 0}
            >
              <Text style={commonStyles.buttonText}>
                ✅ Record Dhikr ({count})
              </Text>
            </TouchableOpacity>
          </View>
        )}

        {/* Reminder */}
        <View style={styles.reminder}>
          <Text style={styles.reminderIcon}>💡</Text>
          <Text style={styles.reminderText}>
            Tap the big +1 button each time you recite, or use quick add buttons!
          </Text>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  hadithSection: {
    marginBottom: spacing.lg,
  },

  // Dhikr Selection
  dhikrCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.background.primary,
    borderRadius: borderRadius.lg,
    padding: spacing.lg,
    marginBottom: spacing.md,
    borderWidth: 2,
    borderColor: colors.border.light,
  },

  dhikrCardSelected: {
    borderColor: colors.dhikr,
    backgroundColor: '#fdf2f8',
  },

  dhikrInfo: {
    flex: 1,
  },

  dhikrArabic: {
    fontSize: fontSize.xl,
    color: colors.text.primary,
    marginBottom: spacing.xs,
  },

  dhikrTransliteration: {
    fontSize: fontSize.base,
    fontWeight: fontWeight.bold,
    color: colors.text.primary,
    marginBottom: spacing.xs / 2,
  },

  dhikrMeaning: {
    fontSize: fontSize.sm,
    color: colors.text.secondary,
    marginBottom: spacing.xs,
  },

  dhikrRecommended: {
    fontSize: fontSize.xs,
    color: colors.dhikr,
    fontWeight: fontWeight.semibold,
  },

  checkmark: {
    fontSize: 24,
    color: colors.dhikr,
    fontWeight: fontWeight.bold,
  },

  // Counter Section
  counterSection: {
    marginTop: spacing.xl,
  },

  selectedDhikrBox: {
    backgroundColor: colors.background.primary,
    borderRadius: borderRadius.lg,
    padding: spacing.lg,
    marginBottom: spacing.xl,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: colors.dhikr,
  },

  selectedArabic: {
    fontSize: fontSize.xxxl,
    color: colors.text.primary,
    marginBottom: spacing.sm,
  },

  selectedTransliteration: {
    fontSize: fontSize.lg,
    fontWeight: fontWeight.semibold,
    color: colors.dhikr,
  },

  // Counter Display
  counterDisplay: {
    backgroundColor: colors.background.primary,
    borderRadius: borderRadius.xl,
    padding: spacing.xxl,
    alignItems: 'center',
    marginBottom: spacing.lg,
  },

  counterLabel: {
    fontSize: fontSize.md,
    color: colors.text.secondary,
    marginBottom: spacing.sm,
  },

  counterNumber: {
    fontSize: fontSize.massive,
    fontWeight: fontWeight.bold,
    color: colors.dhikr,
    marginBottom: spacing.lg,
  },

  progressBar: {
    width: '100%',
    height: 8,
    backgroundColor: colors.background.tertiary,
    borderRadius: borderRadius.full,
    marginBottom: spacing.sm,
    overflow: 'hidden',
  },

  progressFill: {
    height: '100%',
    backgroundColor: colors.dhikr,
    borderRadius: borderRadius.full,
  },

  progressText: {
    fontSize: fontSize.sm,
    color: colors.text.tertiary,
  },

  // Counter Buttons
  counterButtons: {
    flexDirection: 'row',
    gap: spacing.md,
    marginBottom: spacing.md,
  },

  resetButton: {
    flex: 1,
    backgroundColor: colors.background.tertiary,
    borderRadius: borderRadius.lg,
    padding: spacing.xl,
    alignItems: 'center',
  },

  resetButtonText: {
    fontSize: fontSize.lg,
    fontWeight: fontWeight.bold,
    color: colors.text.secondary,
  },

  incrementButton: {
    flex: 2,
    backgroundColor: colors.dhikr,
    borderRadius: borderRadius.lg,
    padding: spacing.xl,
    alignItems: 'center',
  },

  incrementButtonText: {
    fontSize: fontSize.xxxl,
    fontWeight: fontWeight.bold,
    color: colors.text.white,
  },

  // Quick Add Buttons
  quickAddButtons: {
    flexDirection: 'row',
    gap: spacing.sm,
    marginBottom: spacing.xl,
  },

  quickAddButton: {
    flex: 1,
    backgroundColor: colors.background.primary,
    borderRadius: borderRadius.md,
    padding: spacing.md,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.dhikr,
  },

  quickAddText: {
    fontSize: fontSize.base,
    fontWeight: fontWeight.semibold,
    color: colors.dhikr,
  },

  // Special Reward
  specialRewardBox: {
    backgroundColor: '#fef3c7',
    borderRadius: borderRadius.lg,
    padding: spacing.xl,
    alignItems: 'center',
    marginBottom: spacing.xl,
  },

  specialRewardIcon: {
    fontSize: 40,
    marginBottom: spacing.sm,
  },

  specialRewardTitle: {
    fontSize: fontSize.lg,
    fontWeight: fontWeight.bold,
    color: '#78350f',
    marginBottom: spacing.sm,
  },

  specialRewardText: {
    fontSize: fontSize.base,
    color: '#92400e',
    textAlign: 'center',
  },

  // Reminder
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