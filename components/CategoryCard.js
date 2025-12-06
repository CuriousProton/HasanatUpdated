// components/CategoryCard.js
// Category card for home screen

import React from 'react';
import { TouchableOpacity, Text, StyleSheet, Dimensions } from 'react-native';
import { colors, spacing, borderRadius, fontSize, fontWeight, shadows } from '../styles/theme';

const { width } = Dimensions.get('window');

export const CategoryCard = ({ category, onPress }) => (
  <TouchableOpacity 
    style={[styles.card, { borderLeftColor: category.color }]}
    onPress={onPress}
    activeOpacity={0.7}
  >
    <Text style={styles.icon}>{category.icon}</Text>
    <Text style={styles.title}>{category.title}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  card: {
    width: (width - 48) / 2, // Two columns with padding
    backgroundColor: colors.background.primary,
    borderRadius: borderRadius.lg,
    padding: spacing.xl,
    marginBottom: spacing.lg,
    alignItems: 'center',
    borderLeftWidth: 4,
    ...shadows.medium,
  },
  
  icon: {
    fontSize: 40,
    marginBottom: spacing.sm,
  },
  
  title: {
    fontSize: fontSize.base,
    fontWeight: fontWeight.bold,
    color: colors.text.primary,
    textAlign: 'center',
  },
});