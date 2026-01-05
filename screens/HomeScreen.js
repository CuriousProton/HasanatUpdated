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
    backgroundColor: '#2563eb',
    paddingVertical: spacing.xl,
    paddingHorizontal: spacing.lg,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
  },

  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  headerTitle: {
    fontSize: fontSize.xxl,
    fontWeight: fontWeight.bold,
    color: colors.text.white,
    marginBottom: spacing.xs,
  },

  headerSubtitle: {
    fontSize: fontSize.md,
    color: '#dbeafe',
  },

  referencesButton: {
    backgroundColor: colors.background.primary,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: borderRadius.md,
    alignItems: 'center',
    minWidth: 60,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 3,
    elevation: 3,
  },

  referencesIcon: {
    fontSize: 24,
    marginBottom: 2,
  },

  referencesText: {
    fontSize: fontSize.xs,
    color: '#2563eb',
    fontWeight: fontWeight.bold,
  },

  scrollContent: {
    padding: spacing.lg,
  },

  historyButton: {
    backgroundColor: '#059669',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing.lg,
    borderRadius: borderRadius.lg,
    marginTop: spacing.md,
    marginBottom: spacing.lg,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 5,
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