// screens/DhikrRewardsScreen.js
// Screen showing all rewards of dhikr

import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { Header } from '../components/Header';
import { dhikrHadiths } from '../data/hadiths';
import { colors, spacing, fontSize, fontWeight, borderRadius, shadows } from '../styles/theme';
import { commonStyles } from '../styles/commonStyles';

export const DhikrRewardsScreen = ({ onBack }) => {
  // Show all hadiths except the first one (which is shown on main screen)
  const rewardsHadiths = dhikrHadiths.slice(1);

  return (
    <View style={commonStyles.container}>
      <Header title="✨ Rewards of Dhikr" showBack onBack={onBack} />

      <ScrollView contentContainerStyle={commonStyles.scrollContent}>
        {/* Introduction */}
        <View style={styles.introCard}>
          <Text style={styles.introTitle}>🌟 Dhikr Rewards</Text>
          <Text style={styles.introText}>
            Dhikr (remembrance of Allah) is one of the most beloved acts of worship. Every word of remembrance brings you closer to Allah and earns immense rewards.
          </Text>
        </View>

        {/* All Rewards Hadiths */}
        {rewardsHadiths.map((hadith, index) => (
          <View key={index} style={styles.hadithCard}>
            <Text style={styles.hadithTitle}>{hadith.title}</Text>
            <Text style={styles.hadithText}>"{hadith.hadith}"</Text>
            <View style={styles.hadithFooter}>
              <View style={styles.rewardBadge}>
                <Text style={styles.rewardBadgeText}>🎁 {hadith.reward}</Text>
              </View>
              <Text style={styles.hadithReference}>— {hadith.reference}</Text>
            </View>
          </View>
        ))}

        {/* Closing Note */}
        <View style={styles.closingNote}>
          <Text style={styles.closingIcon}>💡</Text>
          <Text style={styles.closingText}>
            Remember: Dhikr is light on the tongue but heavy on the scales. Make it a daily habit!
          </Text>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  introCard: {
    backgroundColor: '#fdf2f8',
    borderRadius: borderRadius.lg,
    padding: spacing.lg,
    marginBottom: spacing.xl,
    borderLeftWidth: 4,
    borderLeftColor: colors.dhikr,
  },

  introTitle: {
    fontSize: fontSize.xl,
    fontWeight: fontWeight.bold,
    color: colors.dhikr,
    marginBottom: spacing.md,
  },

  introText: {
    fontSize: fontSize.base,
    color: colors.text.primary,
    lineHeight: 22,
  },

  hadithCard: {
    backgroundColor: colors.background.primary,
    borderRadius: borderRadius.lg,
    padding: spacing.lg,
    marginBottom: spacing.md,
    borderLeftWidth: 4,
    borderLeftColor: colors.dhikr,
    ...shadows.medium,
  },

  hadithTitle: {
    fontSize: fontSize.base,
    fontWeight: fontWeight.bold,
    color: colors.dhikr,
    marginBottom: spacing.sm,
  },

  hadithText: {
    fontSize: fontSize.sm,
    color: colors.text.primary,
    lineHeight: 20,
    fontStyle: 'italic',
    marginBottom: spacing.md,
  },

  hadithFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: spacing.sm,
  },

  rewardBadge: {
    backgroundColor: '#fdf2f8',
    borderRadius: borderRadius.md,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
  },

  rewardBadgeText: {
    fontSize: fontSize.sm,
    color: colors.dhikr,
    fontWeight: fontWeight.bold,
  },

  hadithReference: {
    fontSize: fontSize.xs,
    color: colors.text.tertiary,
    fontStyle: 'italic',
  },

  closingNote: {
    backgroundColor: colors.background.primary,
    borderRadius: borderRadius.lg,
    padding: spacing.lg,
    marginTop: spacing.lg,
    flexDirection: 'row',
    alignItems: 'flex-start',
    borderLeftWidth: 3,
    borderLeftColor: colors.dhikr,
  },

  closingIcon: {
    fontSize: 24,
    marginRight: spacing.md,
  },

  closingText: {
    flex: 1,
    fontSize: fontSize.sm,
    color: colors.text.secondary,
    lineHeight: 20,
  },
});

