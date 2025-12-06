// screens/HistoryScreen.js
// View all recorded hasanat with filters

import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { Header } from '../components/Header';
import { formatDate, filterByDate, groupByDate } from '../utils/dateHelpers';
import { getCategoryColor } from '../data/categories';
import { colors, spacing, fontSize, fontWeight, borderRadius } from '../styles/theme';
import { commonStyles } from '../styles/commonStyles';

export const HistoryScreen = ({ onBack, hasanat, onDelete }) => {
  const [filter, setFilter] = useState('all');

  const filters = [
    { id: 'all', name: 'All Time', icon: '📅' },
    { id: 'today', name: 'Today', icon: '📆' },
    { id: 'week', name: 'This Week', icon: '📊' },
    { id: 'month', name: 'This Month', icon: '🗓️' },
  ];

  const filteredHasanat = filterByDate(hasanat, filter);
  const groupedHasanat = groupByDate(filteredHasanat);

  const handleDelete = (id) => {
    Alert.alert(
      'Delete Entry',
      'Are you sure you want to delete this hasanah entry?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => onDelete(id),
        },
      ]
    );
  };

  const getCategoryIcon = (type) => {
    const icons = {
      salah: '🕌',
      quran: '📖',
      charity: '💰',
      dhikr: '✨',
      fasting: '☀️',
      kindness: '👥',
    };
    return icons[type] || '✨';
  };

  return (
    <View style={commonStyles.container}>
      <Header title="📜 History" showBack onBack={onBack} />

      {/* Filter Tabs */}
      <View style={styles.filterContainer}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {filters.map((f) => (
            <TouchableOpacity
              key={f.id}
              style={[
                styles.filterTab,
                filter === f.id && styles.filterTabActive,
              ]}
              onPress={() => setFilter(f.id)}
            >
              <Text style={styles.filterIcon}>{f.icon}</Text>
              <Text
                style={[
                  styles.filterText,
                  filter === f.id && styles.filterTextActive,
                ]}
              >
                {f.name}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Stats Summary */}
      <View style={styles.statsContainer}>
        <View style={styles.statCard}>
          <Text style={styles.statValue}>{filteredHasanat.length}</Text>
          <Text style={styles.statLabel}>Total Deeds</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statValue}>{Object.keys(groupedHasanat).length}</Text>
          <Text style={styles.statLabel}>Days Active</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statValue}>∞</Text>
          <Text style={styles.statLabel}>Rewards</Text>
        </View>
      </View>

      {/* History List */}
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {filteredHasanat.length === 0 ? (
          <View style={commonStyles.emptyState}>
            <Text style={commonStyles.emptyStateIcon}>📝</Text>
            <Text style={commonStyles.emptyStateText}>No deeds recorded yet</Text>
            <Text style={commonStyles.emptyStateSubtext}>
              Start tracking your good deeds!
            </Text>
          </View>
        ) : (
          Object.entries(groupedHasanat).map(([date, entries]) => (
            <View key={date} style={styles.dateGroup}>
              {/* Date Header */}
              <View style={styles.dateHeader}>
                <Text style={styles.dateText}>{date}</Text>
                <View style={styles.dateBadge}>
                  <Text style={styles.dateBadgeText}>{entries.length}</Text>
                </View>
              </View>

              {/* Entries for this date */}
              {entries.map((entry) => (
                <View
                  key={entry.id}
                  style={[
                    styles.entryCard,
                    { borderLeftColor: getCategoryColor(entry.type) },
                  ]}
                >
                  <View style={styles.entryHeader}>
                    <View style={styles.entryTypeContainer}>
                      <Text style={styles.entryIcon}>
                        {getCategoryIcon(entry.type)}
                      </Text>
                      <View style={styles.entryInfo}>
                        <Text style={styles.entryType}>
                          {entry.type.charAt(0).toUpperCase() + entry.type.slice(1)}
                        </Text>
                        <Text style={styles.entryTime}>
                          {formatDate(entry.date)}
                        </Text>
                      </View>
                    </View>
                    <TouchableOpacity
                      style={styles.deleteButton}
                      onPress={() => handleDelete(entry.id)}
                    >
                      <Text style={styles.deleteIcon}>🗑️</Text>
                    </TouchableOpacity>
                  </View>

                  <Text style={styles.entryDetails}>{entry.details}</Text>

                  {entry.estimatedReward && (
                    <View style={styles.rewardContainer}>
                      <Text style={styles.rewardIcon}>🎁</Text>
                      <Text style={styles.rewardText}>{entry.estimatedReward}</Text>
                    </View>
                  )}
                </View>
              ))}
            </View>
          ))
        )}

        {/* Bottom Padding */}
        {filteredHasanat.length > 0 && (
          <View style={styles.bottomNote}>
            <Text style={styles.bottomNoteIcon}>💡</Text>
            <Text style={styles.bottomNoteText}>
              Keep going! Every deed is recorded and rewarded by Allah.
            </Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  // Filter Tabs
  filterContainer: {
    backgroundColor: colors.background.primary,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: colors.border.light,
  },

  filterTab: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.background.tertiary,
    borderRadius: borderRadius.lg,
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.lg,
    marginRight: spacing.md,
  },

  filterTabActive: {
    backgroundColor: colors.primary,
  },

  filterIcon: {
    fontSize: fontSize.base,
    marginRight: spacing.xs,
  },

  filterText: {
    fontSize: fontSize.sm,
    fontWeight: fontWeight.semibold,
    color: colors.text.secondary,
  },

  filterTextActive: {
    color: colors.text.white,
  },

  // Stats
  statsContainer: {
    flexDirection: 'row',
    padding: spacing.lg,
    gap: spacing.md,
    backgroundColor: colors.background.primary,
  },

  statCard: {
    flex: 1,
    backgroundColor: colors.background.secondary,
    borderRadius: borderRadius.lg,
    padding: spacing.lg,
    alignItems: 'center',
  },

  statValue: {
    fontSize: fontSize.xxl,
    fontWeight: fontWeight.bold,
    color: colors.primary,
    marginBottom: spacing.xs / 2,
  },

  statLabel: {
    fontSize: fontSize.xs,
    color: colors.text.tertiary,
    textAlign: 'center',
  },

  // Scroll Content
  scrollContent: {
    padding: spacing.lg,
  },

  // Date Groups
  dateGroup: {
    marginBottom: spacing.xl,
  },

  dateHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.md,
  },

  dateText: {
    fontSize: fontSize.base,
    fontWeight: fontWeight.bold,
    color: colors.text.primary,
  },

  dateBadge: {
    backgroundColor: colors.primary,
    borderRadius: borderRadius.full,
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },

  dateBadgeText: {
    fontSize: fontSize.xs,
    fontWeight: fontWeight.bold,
    color: colors.text.white,
  },

  // Entry Cards
  entryCard: {
    backgroundColor: colors.background.primary,
    borderRadius: borderRadius.lg,
    padding: spacing.lg,
    marginBottom: spacing.md,
    borderLeftWidth: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },

  entryHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: spacing.md,
  },

  entryTypeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },

  entryIcon: {
    fontSize: 24,
    marginRight: spacing.sm,
  },

  entryInfo: {
    flex: 1,
  },

  entryType: {
    fontSize: fontSize.base,
    fontWeight: fontWeight.bold,
    color: colors.text.primary,
    marginBottom: spacing.xs / 2,
  },

  entryTime: {
    fontSize: fontSize.xs,
    color: colors.text.tertiary,
  },

  deleteButton: {
    padding: spacing.xs,
  },

  deleteIcon: {
    fontSize: 20,
  },

  entryDetails: {
    fontSize: fontSize.sm,
    color: colors.text.secondary,
    marginBottom: spacing.md,
    lineHeight: 20,
  },

  rewardContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.background.tertiary,
    borderRadius: borderRadius.md,
    padding: spacing.sm,
  },

  rewardIcon: {
    fontSize: fontSize.base,
    marginRight: spacing.xs,
  },

  rewardText: {
    fontSize: fontSize.sm,
    fontWeight: fontWeight.semibold,
    color: colors.text.primary,
  },

  // Bottom Note
  bottomNote: {
    backgroundColor: colors.background.primary,
    borderRadius: borderRadius.lg,
    padding: spacing.lg,
    marginTop: spacing.lg,
    flexDirection: 'row',
    alignItems: 'center',
  },

  bottomNoteIcon: {
    fontSize: 24,
    marginRight: spacing.md,
  },

  bottomNoteText: {
    flex: 1,
    fontSize: fontSize.sm,
    color: colors.text.secondary,
    lineHeight: 20,
  },
});