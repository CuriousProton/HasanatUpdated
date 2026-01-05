// screens/KindnessRewardsScreen.js
// Screen showing all rewards of kindness

import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { Header } from '../components/Header';
import { kindnessHadiths } from '../data/hadiths';
import { colors, spacing, fontSize, fontWeight, borderRadius, shadows } from '../styles/theme';
import { commonStyles } from '../styles/commonStyles';

export const KindnessRewardsScreen = ({ onBack }) => {
  // Show all hadiths except the first one (which is shown on main screen)
  const rewardsHadiths = kindnessHadiths.slice(1);

  return (
    <View style={commonStyles.container}>
      <Header title="👥 Rewards of Kindness" showBack onBack={onBack} />

      <ScrollView contentContainerStyle={commonStyles.scrollContent}>
        {/* Introduction */}
        <View style={styles.introCard}>
          <Text style={styles.introTitle}>🌟 Kindness Rewards</Text>
          <Text style={styles.introText}>
            Kindness and good deeds are among the most beloved acts to Allah. Every act of kindness, no matter how small, brings immense rewards and blessings.
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
            Remember: Every joint of your body can perform charity each day. That's 360 opportunities for charity every single day!
          </Text>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  introCard: {
    backgroundColor: '#ecfeff',
    borderRadius: borderRadius.lg,
    padding: spacing.lg,
    marginBottom: spacing.xl,
    borderLeftWidth: 4,
    borderLeftColor: colors.kindness,
  },

  introTitle: {
    fontSize: fontSize.xl,
    fontWeight: fontWeight.bold,
    color: colors.kindness,
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
    borderLeftColor: colors.kindness,
    ...shadows.medium,
  },

  hadithTitle: {
    fontSize: fontSize.base,
    fontWeight: fontWeight.bold,
    color: colors.kindness,
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
    backgroundColor: '#ecfeff',
    borderRadius: borderRadius.md,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
  },

  rewardBadgeText: {
    fontSize: fontSize.sm,
    color: colors.kindness,
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
    borderLeftColor: colors.kindness,
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

