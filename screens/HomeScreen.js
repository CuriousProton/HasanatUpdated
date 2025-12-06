// screens/HomeScreen.js
// Main home screen with category cards

import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { CategoryCard } from '../components/CategoryCard';
import { categories } from '../data/categories';
import { colors, spacing, fontSize, fontWeight } from '../styles/theme';
import { commonStyles } from '../styles/commonStyles';

export const HomeScreen = ({ onNavigate }) => {
  return (
    <View style={commonStyles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>✨ Hasanat Tracker</Text>
        <Text style={styles.headerSubtitle}>Track your good deeds & rewards</Text>
      </View>

      {/* Categories Grid */}
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.grid}>
          {categories.map((category) => (
            <CategoryCard
              key={category.id}
              category={category}
              onPress={() => onNavigate(category.id)}
            />
          ))}
        </View>

        {/* Bottom Note */}
        <View style={styles.bottomNote}>
          <Text style={styles.noteIcon}>💡</Text>
          <Text style={styles.noteText}>
            Every deed is recorded. Keep going! 🌟
          </Text>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    backgroundColor: colors.background.primary,
    paddingVertical: spacing.xxl,
    paddingHorizontal: spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: colors.border.light,
    alignItems: 'center',
  },

  headerTitle: {
    fontSize: fontSize.xxxl,
    fontWeight: fontWeight.bold,
    color: colors.text.primary,
    marginBottom: spacing.xs,
  },

  headerSubtitle: {
    fontSize: fontSize.md,
    color: colors.text.secondary,
  },

  scrollContent: {
    padding: spacing.lg,
  },

  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },

  bottomNote: {
    backgroundColor: colors.background.primary,
    borderRadius: 12,
    padding: spacing.lg,
    marginTop: spacing.lg,
    alignItems: 'center',
  },

  noteIcon: {
    fontSize: 32,
    marginBottom: spacing.sm,
  },

  noteText: {
    fontSize: fontSize.md,
    color: colors.text.secondary,
    textAlign: 'center',
  },
});