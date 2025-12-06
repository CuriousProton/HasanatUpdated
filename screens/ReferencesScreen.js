// screens/ReferencesScreen.js
// Browse all hadiths by category

import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { Header } from '../components/Header';
import { ReferenceHadithCard } from '../components/HadithCard';
import { allHadiths } from '../data/hadiths';
import { colors, spacing, fontSize, fontWeight, borderRadius } from '../styles/theme';
import { commonStyles } from '../styles/commonStyles';

export const ReferencesScreen = ({ onBack }) => {
  const [selectedCategory, setSelectedCategory] = useState('salah');

  const categories = [
    { id: 'salah', name: 'Salah', icon: '🕌', color: colors.salah },
    { id: 'quran', name: 'Quran', icon: '📖', color: colors.quran },
    { id: 'charity', name: 'Charity', icon: '💰', color: colors.charity },
    { id: 'dhikr', name: 'Dhikr', icon: '✨', color: colors.dhikr },
    { id: 'fasting', name: 'Fasting', icon: '☀️', color: colors.fasting },
    { id: 'kindness', name: 'Kindness', icon: '👥', color: colors.kindness },
  ];

  const selectedHadiths = allHadiths[selectedCategory] || [];
  const totalHadiths = Object.values(allHadiths).reduce((sum, arr) => sum + arr.length, 0);

  return (
    <View style={commonStyles.container}>
      <Header title="📚 References" showBack onBack={onBack} />

      {/* Info Banner */}
      <View style={styles.infoBanner}>
        <Text style={styles.infoBannerIcon}>📿</Text>
        <View style={styles.infoBannerContent}>
          <Text style={styles.infoBannerTitle}>Authentic Hadiths</Text>
          <Text style={styles.infoBannerText}>
            {totalHadiths} hadiths from Sahih collections
          </Text>
        </View>
      </View>

      {/* Category Tabs */}
      <View style={styles.categoryTabs}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {categories.map((category) => (
            <TouchableOpacity
              key={category.id}
              style={[
                styles.categoryTab,
                selectedCategory === category.id && {
                  backgroundColor: category.color,
                  borderColor: category.color,
                },
              ]}
              onPress={() => setSelectedCategory(category.id)}
            >
              <Text style={styles.categoryIcon}>{category.icon}</Text>
              <Text
                style={[
                  styles.categoryText,
                  selectedCategory === category.id && styles.categoryTextActive,
                ]}
              >
                {category.name}
              </Text>
              <View
                style={[
                  styles.categoryBadge,
                  selectedCategory === category.id && styles.categoryBadgeActive,
                ]}
              >
                <Text
                  style={[
                    styles.categoryBadgeText,
                    selectedCategory === category.id && styles.categoryBadgeTextActive,
                  ]}
                >
                  {allHadiths[category.id]?.length || 0}
                </Text>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Hadiths List */}
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {selectedHadiths.length === 0 ? (
          <View style={commonStyles.emptyState}>
            <Text style={commonStyles.emptyStateIcon}>📚</Text>
            <Text style={commonStyles.emptyStateText}>No hadiths found</Text>
            <Text style={commonStyles.emptyStateSubtext}>
              Select a different category
            </Text>
          </View>
        ) : (
          <>
            {/* Category Header */}
            <View style={styles.categoryHeader}>
              <Text style={styles.categoryHeaderTitle}>
                {categories.find((c) => c.id === selectedCategory)?.icon}{' '}
                {categories.find((c) => c.id === selectedCategory)?.name} Hadiths
              </Text>
              <Text style={styles.categoryHeaderCount}>
                {selectedHadiths.length} {selectedHadiths.length === 1 ? 'hadith' : 'hadiths'}
              </Text>
            </View>

            {/* Hadiths */}
            {selectedHadiths.map((hadith, index) => (
              <ReferenceHadithCard key={index} hadith={hadith} index={index} />
            ))}

            {/* Bottom Note */}
            <View style={styles.bottomNote}>
              <Text style={styles.bottomNoteIcon}>💡</Text>
              <Text style={styles.bottomNoteText}>
                All hadiths are from authentic sources: Sahih al-Bukhari, Sahih Muslim, 
                Sunan al-Tirmidhi, Sunan al-Nasa'i, and the Quran.
              </Text>
            </View>
          </>
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  // Info Banner
  infoBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#d1fae5',
    padding: spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: '#a7f3d0',
  },

  infoBannerIcon: {
    fontSize: 32,
    marginRight: spacing.md,
  },

  infoBannerContent: {
    flex: 1,
  },

  infoBannerTitle: {
    fontSize: fontSize.base,
    fontWeight: fontWeight.bold,
    color: '#065f46',
    marginBottom: spacing.xs / 2,
  },

  infoBannerText: {
    fontSize: fontSize.sm,
    color: '#059669',
  },

  // Category Tabs
  categoryTabs: {
    backgroundColor: colors.background.primary,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: colors.border.light,
  },

  categoryTab: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.background.tertiary,
    borderRadius: borderRadius.lg,
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
    marginRight: spacing.md,
    borderWidth: 2,
    borderColor: colors.background.tertiary,
  },

  categoryIcon: {
    fontSize: fontSize.base,
    marginRight: spacing.xs,
  },

  categoryText: {
    fontSize: fontSize.sm,
    fontWeight: fontWeight.semibold,
    color: colors.text.secondary,
    marginRight: spacing.xs,
  },

  categoryTextActive: {
    color: colors.text.white,
  },

  categoryBadge: {
    backgroundColor: colors.background.primary,
    borderRadius: borderRadius.full,
    paddingHorizontal: spacing.xs,
    paddingVertical: 2,
    minWidth: 20,
    alignItems: 'center',
  },

  categoryBadgeActive: {
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
  },

  categoryBadgeText: {
    fontSize: fontSize.xs,
    fontWeight: fontWeight.bold,
    color: colors.text.primary,
  },

  categoryBadgeTextActive: {
    color: colors.text.white,
  },

  // Scroll Content
  scrollContent: {
    padding: spacing.lg,
  },

  // Category Header
  categoryHeader: {
    marginBottom: spacing.lg,
  },

  categoryHeaderTitle: {
    fontSize: fontSize.xl,
    fontWeight: fontWeight.bold,
    color: colors.text.primary,
    marginBottom: spacing.xs,
  },

  categoryHeaderCount: {
    fontSize: fontSize.sm,
    color: colors.text.tertiary,
  },

  // Bottom Note
  bottomNote: {
    backgroundColor: colors.background.primary,
    borderRadius: borderRadius.lg,
    padding: spacing.lg,
    marginTop: spacing.lg,
    flexDirection: 'row',
    alignItems: 'flex-start',
  },

  bottomNoteIcon: {
    fontSize: 24,
    marginRight: spacing.md,
    marginTop: spacing.xs / 2,
  },

  bottomNoteText: {
    flex: 1,
    fontSize: fontSize.sm,
    color: colors.text.secondary,
    lineHeight: 20,
  },
});