// screens/FastingRewardsScreen.js
// Screen showing all rewards of fasting

import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { Header } from '../components/Header';
import { fastingHadiths } from '../data/hadiths';
import { colors, spacing, fontSize, fontWeight, borderRadius, shadows } from '../styles/theme';
import { commonStyles } from '../styles/commonStyles';

export const FastingRewardsScreen = ({ onBack }) => {
  // Show all hadiths except the first one (which is shown on main screen)
  const rewardsHadiths = fastingHadiths.slice(1);

  return (
    <View style={commonStyles.container}>
      <Header title="☀️ Rewards of Fasting" showBack onBack={onBack} />

      <ScrollView contentContainerStyle={commonStyles.scrollContent}>
        {/* Introduction */}
        <View style={styles.introCard}>
          <Text style={styles.introTitle}>🌟 Fasting Rewards</Text>
          <Text style={styles.introText}>
            Fasting is one of the most beloved acts of worship to Allah. It is a shield from the Fire and brings immense rewards in this life and the Hereafter.
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
            Remember: "Fasting is a shield from the Fire." The fasting person's supplication when breaking fast is not rejected!
          </Text>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  introCard: {
    backgroundColor: '#f5f3ff',
    borderRadius: borderRadius.lg,
    padding: spacing.lg,
    marginBottom: spacing.xl,
    borderLeftWidth: 4,
    borderLeftColor: colors.fasting,
  },

  introTitle: {
    fontSize: fontSize.xl,
    fontWeight: fontWeight.bold,
    color: colors.fasting,
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
    borderLeftColor: colors.fasting,
    ...shadows.medium,
  },

  hadithTitle: {
    fontSize: fontSize.base,
    fontWeight: fontWeight.bold,
    color: colors.fasting,
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
    backgroundColor: '#f5f3ff',
    borderRadius: borderRadius.md,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
  },

  rewardBadgeText: {
    fontSize: fontSize.sm,
    color: colors.fasting,
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
    borderLeftColor: colors.fasting,
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

