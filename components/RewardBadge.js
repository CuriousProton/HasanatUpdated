// components/RewardBadge.js
// Reusable reward display badge

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors, spacing, borderRadius, fontSize, fontWeight } from '../styles/theme';

export const RewardBadge = ({ reward, icon = '🎁', style }) => (
  <View style={[styles.badge, style]}>
    <Text style={styles.icon}>{icon}</Text>
    <Text style={styles.text}>{reward}</Text>
  </View>
);

export const GreenRewardBadge = ({ reward }) => (
  <View style={styles.greenBadge}>
    <Text style={styles.greenIcon}>🎁</Text>
    <Text style={styles.greenText}>{reward}</Text>
  </View>
);

export const LargeRewardBadge = ({ reward }) => (
  <View style={styles.largeBadge}>
    <Text style={styles.largeIcon}>🎁</Text>
    <Text style={styles.largeTitle}>Reward</Text>
    <Text style={styles.largeReward}>{reward}</Text>
  </View>
);

const styles = StyleSheet.create({
  // Standard badge
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.background.tertiary,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: borderRadius.md,
  },
  
  icon: {
    fontSize: fontSize.base,
    marginRight: spacing.xs,
  },
  
  text: {
    fontSize: fontSize.sm,
    fontWeight: fontWeight.semibold,
    color: colors.text.primary,
  },
  
  // Green badge
  greenBadge: {
    backgroundColor: '#d1fae5',
    borderRadius: borderRadius.lg,
    padding: spacing.xl,
    marginBottom: spacing.xl,
    alignItems: 'center',
  },
  
  greenIcon: {
    fontSize: fontSize.xxxl,
    marginBottom: spacing.sm,
  },
  
  greenText: {
    fontSize: fontSize.lg,
    fontWeight: fontWeight.bold,
    color: '#065f46',
    textAlign: 'center',
  },
  
  // Large badge
  largeBadge: {
    backgroundColor: '#d1fae5',
    borderRadius: borderRadius.xl,
    padding: spacing.xxl,
    marginBottom: spacing.xl,
    alignItems: 'center',
  },
  
  largeIcon: {
    fontSize: fontSize.huge,
    marginBottom: spacing.sm,
  },
  
  largeTitle: {
    fontSize: fontSize.md,
    fontWeight: fontWeight.semibold,
    color: '#78350f',
    marginBottom: spacing.sm,
  },
  
  largeReward: {
    fontSize: fontSize.xxl,
    fontWeight: fontWeight.bold,
    color: '#d97706',
    textAlign: 'center',
  },
});