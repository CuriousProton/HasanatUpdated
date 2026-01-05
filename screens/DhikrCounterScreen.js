// screens/DhikrCounterScreen.js
// Dhikr counter screen with vibration and hadiths

import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Alert, Vibration } from 'react-native';
import { Header } from '../components/Header';
import { calculateDhikrReward, calculateDhikrRewardValue } from '../utils/calculations';
import { colors, spacing, fontSize, fontWeight, borderRadius, shadows } from '../styles/theme';
import { commonStyles } from '../styles/commonStyles';

export const DhikrCounterScreen = ({ onBack, dhikr, onRecord }) => {
  const [count, setCount] = useState(0);

  // Vibration pattern: short vibration for each count
  const vibrate = () => {
    Vibration.vibrate(50); // 50ms vibration
  };

  const handleIncrement = () => {
    const newCount = count + 1;
    setCount(newCount);
    vibrate();
    
    // Milestone celebrations
    if (newCount === 33) {
      Alert.alert('🎉 Milestone!', 'MashaAllah! You reached 33!', [{ text: 'Continue' }]);
      Vibration.vibrate([0, 100, 50, 100]); // Double vibration for milestone
    } else if (newCount === 100) {
      Alert.alert('🌟 Amazing!', `MashaAllah! You completed ${dhikr.recommended} recitations!`, [{ text: 'Alhamdulillah!' }]);
      Vibration.vibrate([0, 100, 50, 100, 50, 100]); // Triple vibration for 100
    } else if (newCount === dhikr.recommended) {
      Alert.alert('✨ Goal Achieved!', `MashaAllah! You reached the recommended ${dhikr.recommended} recitations!`, [{ text: 'Alhamdulillah!' }]);
      Vibration.vibrate([0, 200, 100, 200]); // Strong vibration for goal
    }
  };

  const handleReset = () => {
    setCount(0);
  };

  const handleRecord = () => {
    if (count === 0) {
      Alert.alert('Add Count', 'Please add at least one count');
      return;
    }

    const specialReward = calculateDhikrReward(dhikr, count);

    onRecord({
      type: 'dhikr',
      details: `${dhikr.transliteration} (${count}x)`,
      rewordValue: calculateDhikrRewardValue(dhikr, count),
      count: count,
      estimatedReward: specialReward || `${count} times`,
    });

    Alert.alert(
      '✨ Dhikr Recorded!',
      `${dhikr.transliteration} - ${count} times\n\n${specialReward || 'May Allah accept it!'}`,
      [{ text: 'Alhamdulillah!' }]
    );

    // Reset
    setCount(0);
  };

  // Get motivational message based on progress
  const getMotivation = () => {
    const progress = (count / dhikr.recommended) * 100;
    
    if (count === 0) {
      return dhikr.motivation || 'Start your journey of remembrance!';
    } else if (progress < 25) {
      return 'Great start! Keep going!';
    } else if (progress < 50) {
      return 'MashaAllah! You\'re doing well!';
    } else if (progress < 75) {
      return 'Excellent progress! Almost there!';
    } else if (progress < 100) {
      return 'So close! You can do it!';
    } else {
      return 'MashaAllah! Goal achieved!';
    }
  };

  return (
    <View style={commonStyles.container}>
      <Header title="✨ Dhikr Counter" showBack onBack={onBack} />

      <ScrollView contentContainerStyle={styles.content}>
        {/* Dhikr Hadith Card */}
        <View style={styles.hadithCard}>
          <Text style={styles.hadithTitle}>💡 About {dhikr.transliteration}</Text>
          <Text style={styles.hadithText}>"{dhikr.hadith}"</Text>
          <Text style={styles.hadithReference}>— {dhikr.hadithReference}</Text>
          <View style={styles.rewardBox}>
            <Text style={styles.rewardText}>🎁 {dhikr.reward}</Text>
          </View>
        </View>

        {/* Selected Dhikr Display */}
        <View style={styles.dhikrBox}>
          <Text style={styles.arabic}>{dhikr.arabic}</Text>
          <Text style={styles.transliteration}>{dhikr.transliteration}</Text>
          <Text style={styles.meaning}>{dhikr.meaning}</Text>
        </View>

        {/* Motivational Message */}
        <View style={styles.motivationBox}>
          <Text style={styles.motivationText}>{getMotivation()}</Text>
        </View>

        {/* Counter Display */}
        <View style={styles.counterDisplay}>
          <Text style={styles.counterLabel}>Count</Text>
          <Text style={styles.counterNumber}>{count}</Text>
          <View style={styles.progressBar}>
            <View 
              style={[
                styles.progressFill, 
                { width: `${Math.min((count / dhikr.recommended) * 100, 100)}%` }
              ]} 
            />
          </View>
          <Text style={styles.progressText}>
            {count} / {dhikr.recommended} recommended
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
            activeOpacity={0.8}
          >
            <Text style={styles.incrementButtonText}>+1</Text>
          </TouchableOpacity>
        </View>

        {/* Quick Add Buttons */}
        <View style={styles.quickAddButtons}>
          <TouchableOpacity
            style={styles.quickAddButton}
            onPress={() => {
              setCount(count + 10);
              vibrate();
            }}
          >
            <Text style={styles.quickAddText}>+10</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.quickAddButton}
            onPress={() => {
              setCount(count + 33);
              vibrate();
            }}
          >
            <Text style={styles.quickAddText}>+33</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.quickAddButton}
            onPress={() => {
              setCount(dhikr.recommended);
              vibrate();
            }}
          >
            <Text style={styles.quickAddText}>+{dhikr.recommended}</Text>
          </TouchableOpacity>
        </View>

        {/* Special Reward Display */}
        {calculateDhikrReward(dhikr, count) && (
          <View style={styles.specialRewardBox}>
            <Text style={styles.specialRewardIcon}>🎁</Text>
            <Text style={styles.specialRewardTitle}>Special Reward Unlocked!</Text>
            <Text style={styles.specialRewardText}>
              {calculateDhikrReward(dhikr, count)}
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
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  content: {
    padding: spacing.lg,
  },

  // Hadith Card
  hadithCard: {
    backgroundColor: '#fdf2f8',
    borderRadius: borderRadius.lg,
    padding: spacing.lg,
    marginBottom: spacing.xl,
    borderLeftWidth: 4,
    borderLeftColor: colors.dhikr,
  },

  hadithTitle: {
    fontSize: fontSize.lg,
    fontWeight: fontWeight.bold,
    color: colors.dhikr,
    marginBottom: spacing.md,
  },

  hadithText: {
    fontSize: fontSize.base,
    color: colors.text.primary,
    lineHeight: 22,
    fontStyle: 'italic',
    marginBottom: spacing.sm,
  },

  hadithReference: {
    fontSize: fontSize.sm,
    color: colors.text.secondary,
    textAlign: 'right',
    marginBottom: spacing.md,
  },

  rewardBox: {
    backgroundColor: colors.background.primary,
    borderRadius: borderRadius.md,
    padding: spacing.sm,
    alignItems: 'center',
  },

  rewardText: {
    fontSize: fontSize.base,
    fontWeight: fontWeight.bold,
    color: colors.dhikr,
  },

  // Dhikr Box
  dhikrBox: {
    backgroundColor: colors.background.primary,
    borderRadius: borderRadius.lg,
    padding: spacing.xl,
    marginBottom: spacing.lg,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: colors.dhikr,
    ...shadows.medium,
  },

  arabic: {
    fontSize: fontSize.xxxl,
    color: colors.text.primary,
    marginBottom: spacing.md,
  },

  transliteration: {
    fontSize: fontSize.xl,
    fontWeight: fontWeight.bold,
    color: colors.dhikr,
    marginBottom: spacing.sm,
  },

  meaning: {
    fontSize: fontSize.base,
    color: colors.text.secondary,
  },

  // Motivation Box
  motivationBox: {
    backgroundColor: '#fdf2f8',
    borderRadius: borderRadius.lg,
    padding: spacing.md,
    marginBottom: spacing.lg,
    alignItems: 'center',
  },

  motivationText: {
    fontSize: fontSize.base,
    fontWeight: fontWeight.semibold,
    color: colors.dhikr,
    textAlign: 'center',
  },

  // Counter Display
  counterDisplay: {
    backgroundColor: colors.background.primary,
    borderRadius: borderRadius.xl,
    padding: spacing.xxl,
    alignItems: 'center',
    marginBottom: spacing.lg,
    ...shadows.medium,
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
    ...shadows.medium,
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
});

