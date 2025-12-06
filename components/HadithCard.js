// components/HadithCard.js
// Reusable hadith card components

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors, spacing, borderRadius, fontSize, fontWeight } from '../styles/theme';

/**
 * Small hadith card for category screens
 */
export const SmallHadithCard = ({ hadith, index }) => (
  <View key={index} style={styles.smallCard}>
    <Text style={styles.smallIcon}>📿</Text>
    <Text style={styles.smallTitle}>{hadith.title}</Text>
    <Text style={styles.smallReward}>{hadith.quantified}</Text>
    <Text style={styles.smallReference}>{hadith.reference}</Text>
  </View>
);

/**
 * Big hadith card for detail views
 */
export const BigHadithCard = ({ prayer }) => (
  <View style={styles.bigCard}>
    <Text style={styles.bigIcon}>📿</Text>
    <Text style={styles.bigText}>{prayer.hadith}</Text>
    <Text style={styles.bigReference}>— {prayer.reference}</Text>
  </View>
);

/**
 * Reference hadith card for References screen
 */
export const ReferenceHadithCard = ({ hadith, index }) => (
  <View key={index} style={styles.referenceCard}>
    <View style={styles.referenceHeader}>
      <Text style={styles.referenceTitle}>{hadith.title}</Text>
      <View style={styles.rewardBadge}>
        <Text style={styles.rewardBadgeText}>{hadith.reward}</Text>
      </View>
    </View>
    <Text style={styles.referenceHadith}>{hadith.hadith}</Text>
    <View style={styles.referenceFooter}>
      <Text style={styles.referenceReference}>📚 {hadith.reference}</Text>
    </View>
  </View>
);

const styles = StyleSheet.create({
  // Small card styles
  smallCard: {
    backgroundColor: colors.background.tertiary,
    borderRadius: borderRadius.md,
    padding: spacing.md,
    marginBottom: spacing.sm,
    borderLeftWidth: 3,
    borderLeftColor: colors.primary,
  },
  
  smallIcon: {
    fontSize: fontSize.base,
    marginBottom: spacing.xs,
  },
  
  smallTitle: {
    fontSize: fontSize.md,
    fontWeight: fontWeight.semibold,
    color: colors.text.primary,
    marginBottom: spacing.xs,
  },
  
  smallReward: {
    fontSize: fontSize.sm,
    fontWeight: fontWeight.bold,
    color: colors.primary,
    marginBottom: spacing.xs / 2,
  },
  
  smallReference: {
    fontSize: fontSize.xs,
    color: colors.text.secondary,
    fontStyle: 'italic',
  },
  
  // Big card styles
  bigCard: {
    backgroundColor: colors.background.primary,
    borderRadius: borderRadius.lg,
    padding: spacing.xl,
    marginBottom: spacing.xl,
    borderLeftWidth: 4,
    borderLeftColor: colors.fasting,
  },
  
  bigIcon: {
    fontSize: fontSize.xxl,
    textAlign: 'center',
    marginBottom: spacing.md,
  },
  
  bigText: {
    fontSize: fontSize.md + 1,
    color: colors.text.secondary,
    fontStyle: 'italic',
    lineHeight: 24,
    marginBottom: spacing.md,
  },
  
  bigReference: {
    fontSize: fontSize.sm,
    color: colors.text.secondary,
    textAlign: 'right',
    fontWeight: fontWeight.semibold,
  },
  
  // Reference card styles
  referenceCard: {
    backgroundColor: colors.background.primary,
    borderRadius: borderRadius.lg,
    padding: spacing.lg,
    marginBottom: spacing.lg,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
  },
  
  referenceHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: spacing.md,
  },
  
  referenceTitle: {
    fontSize: fontSize.base,
    fontWeight: fontWeight.bold,
    color: colors.text.primary,
    flex: 1,
    marginRight: spacing.md,
  },
  
  rewardBadge: {
    backgroundColor: '#d1fae5',
    borderRadius: borderRadius.sm,
    paddingVertical: spacing.xs,
    paddingHorizontal: spacing.sm,
  },
  
  rewardBadgeText: {
    fontSize: fontSize.xs,
    fontWeight: fontWeight.bold,
    color: '#065f46',
  },
  
  referenceHadith: {
    fontSize: fontSize.md,
    color: colors.text.secondary,
    lineHeight: 22,
    fontStyle: 'italic',
    marginBottom: spacing.md,
  },
  
  referenceFooter: {
    borderTopWidth: 1,
    borderTopColor: colors.background.tertiary,
    paddingTop: spacing.sm,
  },
  
  referenceReference: {
    fontSize: fontSize.sm,
    color: colors.text.secondary,
    fontWeight: fontWeight.semibold,
  },
});