// screens/DhikrScreen.js
// Dhikr counter with special rewards

import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { Header } from '../components/Header';
import { dhikrOptions } from '../data/dhikr';
import { dhikrHadiths } from '../data/hadiths';
import { colors, spacing, fontSize, fontWeight, borderRadius, shadows } from '../styles/theme';
import { commonStyles } from '../styles/commonStyles';

export const DhikrScreen = ({ onBack, onRecord, onNavigate }) => {
  const handleDhikrSelect = (dhikr) => {
    if (onNavigate) {
      onNavigate('dhikr-counter', { dhikr });
    }
  };

  return (
    <View style={commonStyles.container}>
      <Header title="✨ Dhikr" showBack onBack={onBack} />

      <ScrollView contentContainerStyle={commonStyles.scrollContent}>
        {/* Main Hadith - Always visible */}
        <View style={styles.mainHadithSection}>
          {/* Main Hadith Card - About rewards of dhikr */}
          <View style={styles.mainHadithCard}>
            <Text style={styles.mainHadithTitle}>✨ Reward of Dhikr</Text>
            <Text style={styles.mainHadithText}>
              "{dhikrHadiths[0].hadith}"
            </Text>
            <View style={styles.mainHadithFooter}>
              <Text style={styles.mainHadithReward}>🎁 {dhikrHadiths[0].reward}</Text>
              <Text style={styles.mainHadithReference}>— {dhikrHadiths[0].reference}</Text>
            </View>
          </View>

          {/* Navigate to Rewards Screen */}
          {onNavigate && (
            <TouchableOpacity
              style={styles.rewardsSectionHeader}
              onPress={() => onNavigate('dhikr-rewards')}
              activeOpacity={0.7}
            >
              <Text style={styles.rewardsSectionTitle}>
                📚 More Rewards of Dhikr
              </Text>
              <Text style={styles.navigateIcon}>→</Text>
            </TouchableOpacity>
          )}
        </View>

        {/* Dhikr Selection */}
        <Text style={commonStyles.label}>Select Dhikr</Text>
        {dhikrOptions.map((dhikr) => (
          <TouchableOpacity
            key={dhikr.id}
            style={styles.dhikrCard}
            onPress={() => handleDhikrSelect(dhikr)}
            activeOpacity={0.7}
          >
            <View style={styles.dhikrInfo}>
              <Text style={styles.dhikrArabic}>{dhikr.arabic}</Text>
              <Text style={styles.dhikrTransliteration}>{dhikr.transliteration}</Text>
              <Text style={styles.dhikrMeaning}>{dhikr.meaning}</Text>
              <Text style={styles.dhikrRecommended}>
                💡 Recommended: {dhikr.recommended}x
              </Text>
            </View>
            <Text style={styles.navigateIcon}>→</Text>
          </TouchableOpacity>
        ))}

        {/* Reminder */}
        <View style={styles.reminder}>
          <Text style={styles.reminderIcon}>💡</Text>
          <Text style={styles.reminderText}>
            Select a dhikr to start counting with vibration feedback!
          </Text>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  // Main Hadith Section
  mainHadithSection: {
    marginBottom: spacing.xl,
  },

  // Main Hadith Card
  mainHadithCard: {
    backgroundColor: colors.background.primary,
    borderRadius: borderRadius.lg,
    padding: spacing.lg,
    marginBottom: spacing.md,
    borderLeftWidth: 4,
    borderLeftColor: colors.dhikr,
    ...shadows.medium,
  },

  mainHadithTitle: {
    fontSize: fontSize.lg,
    fontWeight: fontWeight.bold,
    color: colors.dhikr,
    marginBottom: spacing.md,
  },

  mainHadithText: {
    fontSize: fontSize.base,
    color: colors.text.primary,
    lineHeight: 22,
    fontStyle: 'italic',
    marginBottom: spacing.md,
  },

  mainHadithFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap',
  },

  mainHadithReward: {
    fontSize: fontSize.base,
    color: colors.dhikr,
    fontWeight: fontWeight.bold,
  },

  mainHadithReference: {
    fontSize: fontSize.sm,
    color: colors.text.tertiary,
    fontStyle: 'italic',
  },

  // Navigate to Rewards Section
  rewardsSectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: colors.background.primary,
    borderRadius: borderRadius.lg,
    padding: spacing.lg,
    marginBottom: spacing.md,
    borderWidth: 2,
    borderColor: colors.dhikr,
    ...shadows.small,
  },

  rewardsSectionTitle: {
    fontSize: fontSize.base,
    fontWeight: fontWeight.bold,
    color: colors.dhikr,
    flex: 1,
  },

  navigateIcon: {
    fontSize: fontSize.xl,
    color: colors.dhikr,
    fontWeight: fontWeight.bold,
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
    ...shadows.small,
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