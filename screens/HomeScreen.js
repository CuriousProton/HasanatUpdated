// screens/HomeScreen.js
// Main home screen with category cards

import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { CategoryCard } from '../components/CategoryCard';
import { categories } from '../data/categories';
import { colors, spacing, fontSize, fontWeight, borderRadius } from '../styles/theme';
import { commonStyles } from '../styles/commonStyles';

export const HomeScreen = ({ onNavigate }) => {
  return (
    <View style={commonStyles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <View>
            <Text style={styles.headerTitle}>✨ Hasanat Tracker</Text>
            <Text style={styles.headerSubtitle}>Track your good deeds & rewards</Text>
          </View>

          {/* References Button */}
          <TouchableOpacity
            style={styles.referencesButton}
            onPress={() => onNavigate('references')}
            activeOpacity={0.7}
          >
            <Text style={styles.referencesIcon}>📚</Text>
            <Text style={styles.referencesText}>Refs</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Categories List - Single Column */}
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {categories.map((category) => (
          <CategoryCard
            key={category.id}
            category={category}
            onPress={() => onNavigate(category.id)}
          />
        ))}

        {/* History Button */}
        <TouchableOpacity
          style={styles.historyButton}
          onPress={() => onNavigate('history')}
          activeOpacity={0.7}
        >
          <Text style={styles.historyIcon}>📊</Text>
          <Text style={styles.historyText}>View History & Progress</Text>
        </TouchableOpacity>

        {/* Bottom Note */}
        <View style={styles.bottomNote}>
          <Text style={styles.noteText}>
            "Indeed, Allah does not allow the reward of the good-doers to be lost." — Quran 9:120
          </Text>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    backgroundColor: colors.background.primary,
    paddingVertical: spacing.lg,
    paddingHorizontal: spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: colors.border.light,
  },

  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  headerTitle: {
    fontSize: fontSize.xxl,
    fontWeight: fontWeight.bold,
    color: colors.text.primary,
    marginBottom: spacing.xs,
  },

  headerSubtitle: {
    fontSize: fontSize.md,
    color: colors.text.secondary,
  },

  referencesButton: {
    backgroundColor: colors.background.tertiary,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: borderRadius.md,
    alignItems: 'center',
    minWidth: 60,
  },

  referencesIcon: {
    fontSize: 24,
    marginBottom: 2,
  },

  referencesText: {
    fontSize: fontSize.xs,
    color: colors.text.primary,
    fontWeight: fontWeight.semibold,
  },

  scrollContent: {
    padding: spacing.lg,
  },

  historyButton: {
    backgroundColor: '#3b82f6',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing.lg,
    borderRadius: borderRadius.lg,
    marginTop: spacing.md,
    marginBottom: spacing.lg,
  },

  historyIcon: {
    fontSize: 24,
    marginRight: spacing.sm,
  },

  historyText: {
    fontSize: fontSize.lg,
    fontWeight: fontWeight.bold,
    color: colors.text.white,
  },

  bottomNote: {
    backgroundColor: colors.background.tertiary,
    borderRadius: borderRadius.md,
    padding: spacing.lg,
    marginTop: spacing.sm,
    borderLeftWidth: 3,
    borderLeftColor: colors.reward.green,
  },

  noteText: {
    fontSize: fontSize.sm,
    color: colors.text.secondary,
    textAlign: 'center',
    fontStyle: 'italic',
    lineHeight: 20,
  },
});