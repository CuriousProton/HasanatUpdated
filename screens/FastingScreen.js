// screens/FastingScreen.js
// Fasting tracking with types and rewards

import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, TextInput, StyleSheet, Alert } from 'react-native';
import { Header } from '../components/Header';
import { fastingTypes, getFastingReward } from '../data/fasting';
import { fastingHadiths } from '../data/hadiths';
import { colors, spacing, fontSize, fontWeight, borderRadius, shadows } from '../styles/theme';
import { commonStyles } from '../styles/commonStyles';

export const FastingScreen = ({ onBack, onRecord, onNavigate }) => {
  const [selectedType, setSelectedType] = useState(null);
  const [notes, setNotes] = useState('');

  const handleRecord = () => {
    if (!selectedType) {
      Alert.alert('Select Fast Type', 'Please select what type of fast you observed');
      return;
    }

    const reward = getFastingReward(selectedType.id);

    onRecord({
      type: 'fasting',
      details: `${selectedType.name}${notes ? ` - ${notes}` : ''}`,
      estimatedReward: reward,
    });

    Alert.alert(
      '☀️ Fast Recorded!',
      `May Allah accept your ${selectedType.name} fast!\n\nReward: ${reward}`,
      [{ text: 'Alhamdulillah!' }]
    );

    // Reset
    setSelectedType(null);
    setNotes('');
  };

  return (
    <View style={commonStyles.container}>
      <Header title="☀️ Fasting" showBack onBack={onBack} />

      <ScrollView contentContainerStyle={commonStyles.scrollContent}>
        {/* Main Hadith - Always visible */}
        <View style={styles.mainHadithSection}>
          {/* Main Hadith Card - About rewards of fasting */}
          <View style={styles.mainHadithCard}>
            <Text style={styles.mainHadithTitle}>☀️ Reward of Fasting</Text>
            <Text style={styles.mainHadithText}>
              "{fastingHadiths[0].hadith}"
            </Text>
            <View style={styles.mainHadithFooter}>
              <Text style={styles.mainHadithReward}>🎁 {fastingHadiths[0].reward}</Text>
              <Text style={styles.mainHadithReference}>— {fastingHadiths[0].reference}</Text>
            </View>
          </View>

          {/* Navigate to Rewards Screen */}
          {onNavigate && (
            <TouchableOpacity
              style={styles.rewardsSectionHeader}
              onPress={() => onNavigate('fasting-rewards')}
              activeOpacity={0.7}
            >
              <Text style={styles.rewardsSectionTitle}>
                📚 More Rewards of Fasting
              </Text>
              <Text style={styles.navigateIcon}>→</Text>
            </TouchableOpacity>
          )}
        </View>

        {/* Fasting Type Selection */}
        <Text style={commonStyles.label}>What did you fast?</Text>
        {fastingTypes.map((type) => (
          <TouchableOpacity
            key={type.id}
            style={[
              styles.fastCard,
              selectedType?.id === type.id && styles.fastCardSelected,
            ]}
            onPress={() => setSelectedType(type)}
          >
            <Text style={styles.fastIcon}>{type.icon}</Text>
            <View style={styles.fastInfo}>
              <Text style={styles.fastName}>{type.name}</Text>
              <Text style={styles.fastReward}>
                🎁 {getFastingReward(type.id)}
              </Text>
            </View>
            {selectedType?.id === type.id && (
              <Text style={styles.checkmark}>✓</Text>
            )}
          </TouchableOpacity>
        ))}

        {/* Notes (Optional) */}
        {selectedType && (
          <>
            <Text style={commonStyles.label}>
              Notes (Optional)
            </Text>
            <TextInput
              style={commonStyles.textArea}
              placeholder="Any reflections or notes about your fast..."
              value={notes}
              onChangeText={setNotes}
              multiline
              numberOfLines={4}
            />
          </>
        )}

        {/* Reward Display */}
        {selectedType && (
          <View style={styles.rewardBox}>
            <Text style={styles.rewardIcon}>🎁</Text>
            <Text style={styles.rewardTitle}>Your Reward:</Text>
            <Text style={styles.rewardValue}>
              {getFastingReward(selectedType.id)}
            </Text>
            {selectedType.id === 'arafah' && (
              <Text style={styles.rewardNote}>
                Expiates sins of 2 years!
              </Text>
            )}
            {selectedType.id === 'ashura' && (
              <Text style={styles.rewardNote}>
                Expiates sins of 1 year!
              </Text>
            )}
            {selectedType.id === 'ramadan' && (
              <Text style={styles.rewardNote}>
                When done with faith & seeking reward
              </Text>
            )}
          </View>
        )}

        {/* Record Button */}
        <TouchableOpacity
          style={[
            commonStyles.button,
            !selectedType && commonStyles.buttonDisabled,
          ]}
          onPress={handleRecord}
          disabled={!selectedType}
        >
          <Text style={commonStyles.buttonText}>
            ✅ Record Fast
          </Text>
        </TouchableOpacity>

        {/* Reminders */}
        <View style={styles.reminder}>
          <Text style={styles.reminderIcon}>💡</Text>
          <Text style={styles.reminderText}>
            "Fasting is a shield from the Fire" - Sahih al-Bukhari 1894
          </Text>
        </View>

        <View style={styles.reminder}>
          <Text style={styles.reminderIcon}>🤲</Text>
          <Text style={styles.reminderText}>
            The fasting person has a supplication that will not be rejected when breaking the fast!
          </Text>
        </View>

        {/* Fasting Tips */}
        <View style={styles.tipsBox}>
          <Text style={styles.tipsTitle}>💫 Voluntary Fasting Days:</Text>
          <Text style={styles.tipItem}>📅 Mondays & Thursdays</Text>
          <Text style={styles.tipItem}>⚪ White Days (13th, 14th, 15th of Islamic month)</Text>
          <Text style={styles.tipItem}>🕋 Day of Arafah (9th Dhul Hijjah)</Text>
          <Text style={styles.tipItem}>🌟 Day of Ashura (10th Muharram)</Text>
          <Text style={styles.tipItem}>🌸 6 Days of Shawwal</Text>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  // Main Hadith Section
  mainHadithSection: {
    marginBottom: spacing.xl,
  },

  // Main Hadith Card
  mainHadithCard: {
    backgroundColor: colors.background.primary,
    borderRadius: borderRadius.lg,
    padding: spacing.lg,
    marginBottom: spacing.md,
    borderLeftWidth: 4,
    borderLeftColor: colors.fasting,
    ...shadows.medium,
  },

  mainHadithTitle: {
    fontSize: fontSize.lg,
    fontWeight: fontWeight.bold,
    color: colors.fasting,
    marginBottom: spacing.md,
  },

  mainHadithText: {
    fontSize: fontSize.base,
    color: colors.text.primary,
    lineHeight: 22,
    fontStyle: 'italic',
    marginBottom: spacing.md,
  },

  mainHadithFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap',
  },

  mainHadithReward: {
    fontSize: fontSize.base,
    color: colors.fasting,
    fontWeight: fontWeight.bold,
  },

  mainHadithReference: {
    fontSize: fontSize.sm,
    color: colors.text.tertiary,
    fontStyle: 'italic',
  },

  // Navigate to Rewards Section
  rewardsSectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: colors.background.primary,
    borderRadius: borderRadius.lg,
    padding: spacing.lg,
    marginBottom: spacing.md,
    borderWidth: 2,
    borderColor: colors.fasting,
    ...shadows.small,
  },

  rewardsSectionTitle: {
    fontSize: fontSize.base,
    fontWeight: fontWeight.bold,
    color: colors.fasting,
    flex: 1,
  },

  navigateIcon: {
    fontSize: fontSize.xl,
    color: colors.fasting,
    fontWeight: fontWeight.bold,
  },

  // Fast Card
  fastCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.background.primary,
    borderRadius: borderRadius.lg,
    padding: spacing.lg,
    marginBottom: spacing.md,
    borderWidth: 2,
    borderColor: colors.border.light,
  },

  fastCardSelected: {
    borderColor: colors.fasting,
    backgroundColor: '#f5f3ff',
  },

  fastIcon: {
    fontSize: 40,
    marginRight: spacing.md,
  },

  fastInfo: {
    flex: 1,
  },

  fastName: {
    fontSize: fontSize.lg,
    fontWeight: fontWeight.bold,
    color: colors.text.primary,
    marginBottom: spacing.xs,
  },

  fastReward: {
    fontSize: fontSize.sm,
    color: colors.fasting,
    fontWeight: fontWeight.semibold,
  },

  checkmark: {
    fontSize: 24,
    color: colors.fasting,
    fontWeight: fontWeight.bold,
  },

  // Reward Box
  rewardBox: {
    backgroundColor: '#f5f3ff',
    borderRadius: borderRadius.lg,
    padding: spacing.xl,
    alignItems: 'center',
    marginBottom: spacing.xl,
    borderWidth: 2,
    borderColor: colors.fasting,
  },

  rewardIcon: {
    fontSize: 48,
    marginBottom: spacing.md,
  },

  rewardTitle: {
    fontSize: fontSize.md,
    color: '#5b21b6',
    marginBottom: spacing.xs,
  },

  rewardValue: {
    fontSize: fontSize.xxl,
    fontWeight: fontWeight.bold,
    color: colors.fasting,
    textAlign: 'center',
    marginBottom: spacing.sm,
  },

  rewardNote: {
    fontSize: fontSize.sm,
    color: '#7c3aed',
    textAlign: 'center',
    fontStyle: 'italic',
  },

  // Reminders
  reminder: {
    backgroundColor: colors.background.primary,
    borderRadius: borderRadius.lg,
    padding: spacing.lg,
    marginTop: spacing.lg,
    flexDirection: 'row',
    alignItems: 'center',
  },

  reminderIcon: {
    fontSize: 24,
    marginRight: spacing.md,
  },

  reminderText: {
    flex: 1,
    fontSize: fontSize.sm,
    color: colors.text.secondary,
    lineHeight: 20,
  },

  // Tips Box
  tipsBox: {
    backgroundColor: colors.background.primary,
    borderRadius: borderRadius.lg,
    padding: spacing.lg,
    marginTop: spacing.lg,
  },

  tipsTitle: {
    fontSize: fontSize.base,
    fontWeight: fontWeight.bold,
    color: colors.text.primary,
    marginBottom: spacing.md,
  },

  tipItem: {
    fontSize: fontSize.sm,
    color: colors.text.secondary,
    marginBottom: spacing.sm,
    lineHeight: 20,
  },
});