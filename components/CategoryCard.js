// components/CategoryCard.js
// Category card for home screen - Full width with Hadith

import React from 'react';
import { TouchableOpacity, Text, View, StyleSheet } from 'react-native';
import { colors, spacing, borderRadius, fontSize, fontWeight, shadows } from '../styles/theme';

export const CategoryCard = ({ category, onPress }) => (
  <TouchableOpacity
    style={styles.card}
    onPress={onPress}
    activeOpacity={0.7}
  >
    {/* Top colored bar */}
    <View style={[styles.topBar, { backgroundColor: category.color }]} />

    {/* Content */}
    <View style={styles.content}>
      {/* Icon and Title Row */}
      <View style={styles.header}>
        <View style={[styles.iconCircle, { backgroundColor: category.color + '20' }]}>
          <Text style={styles.icon}>{category.icon}</Text>
        </View>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>{category.title}</Text>
          <Text style={styles.tapText}>Tap to record</Text>
        </View>
      </View>

      {/* Hadith Quote */}
      <View style={styles.hadithContainer}>
        <Text style={styles.quoteIcon}>💬</Text>
        <Text style={styles.hadithText}>"{category.hadith}"</Text>
        <Text style={styles.hadithReference}>— {category.reference}</Text>
      </View>
    </View>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.background.primary,
    borderRadius: borderRadius.lg,
    marginBottom: spacing.lg,
    overflow: 'hidden',
    ...shadows.medium,
  },

  topBar: {
    height: 4,
    width: '100%',
  },

  content: {
    padding: spacing.lg,
  },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.md,
  },

  iconCircle: {
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.md,
  },

  icon: {
    fontSize: 28,
  },

  titleContainer: {
    flex: 1,
  },

  title: {
    fontSize: fontSize.xl,
    fontWeight: fontWeight.bold,
    color: colors.text.primary,
    marginBottom: 2,
  },

  tapText: {
    fontSize: fontSize.sm,
    color: colors.text.secondary,
  },

  hadithContainer: {
    backgroundColor: colors.background.tertiary,
    borderRadius: borderRadius.md,
    padding: spacing.md,
    borderLeftWidth: 3,
    borderLeftColor: colors.border.medium,
  },

  quoteIcon: {
    fontSize: 16,
    marginBottom: spacing.xs,
  },

  hadithText: {
    fontSize: fontSize.md,
    color: colors.text.primary,
    lineHeight: 20,
    fontStyle: 'italic',
    marginBottom: spacing.xs,
  },

  hadithReference: {
    fontSize: fontSize.xs,
    color: colors.text.secondary,
    textAlign: 'right',
    marginTop: spacing.xs,
  },
});