// screens/CharityScreen.js
// Charity tracking with amount and type

import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, TextInput, StyleSheet, Alert } from 'react-native';
import { Header } from '../components/Header';
import { charityHadiths } from '../data/hadiths';
import { colors, spacing, fontSize, fontWeight, borderRadius, shadows } from '../styles/theme';
import { commonStyles } from '../styles/commonStyles';

export const CharityScreen = ({ onBack, onRecord, onNavigate }) => {
  const [charityType, setCharityType] = useState('');
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');

  const charityTypes = [
    { id: 'money', name: 'Money', icon: '💰' },
    { id: 'food', name: 'Food', icon: '🍞' },
    { id: 'clothes', name: 'Clothes', icon: '👕' },
    { id: 'time', name: 'Time/Help', icon: '⏰' },
    { id: 'smile', name: 'Smile', icon: '😊' },
    { id: 'knowledge', name: 'Knowledge', icon: '📚' },
    { id: 'other', name: 'Other', icon: '✨' },
  ];

  const handleRecord = () => {
    if (!charityType) {
      Alert.alert('Select Type', 'Please select what type of charity you gave');
      return;
    }

    const selectedType = charityTypes.find(t => t.id === charityType);
    const details = amount 
      ? `${selectedType.name}: ${amount}${description ? ` - ${description}` : ''}`
      : `${selectedType.name}${description ? `: ${description}` : ''}`;

    onRecord({
      type: 'charity',
      details: details,
      count: amount ? parseInt(amount) : 1,
      estimatedReward: '700x minimum multiplication',
    });

    Alert.alert(
      '💰 Charity Recorded!',
      `May Allah accept your charity and multiply it 700 times or more!\n\n"${details}"`,
      [{ text: 'Alhamdulillah!' }]
    );

    // Reset
    setCharityType('');
    setAmount('');
    setDescription('');
  };

  return (
    <View style={commonStyles.container}>
      <Header title="💰 Charity" showBack onBack={onBack} />

      <ScrollView contentContainerStyle={commonStyles.scrollContent}>
        {/* Main Hadith - Always visible */}
        <View style={styles.mainHadithSection}>
          {/* Main Hadith Card - About rewards of charity */}
          <View style={styles.mainHadithCard}>
            <Text style={styles.mainHadithTitle}>💰 Reward of Giving Charity</Text>
            <Text style={styles.mainHadithText}>
              "{charityHadiths[0].hadith}"
            </Text>
            <View style={styles.mainHadithFooter}>
              <Text style={styles.mainHadithReward}>🎁 {charityHadiths[0].reward}</Text>
              <Text style={styles.mainHadithReference}>— {charityHadiths[0].reference}</Text>
            </View>
          </View>

          {/* Navigate to Rewards Screen */}
          {onNavigate && (
            <TouchableOpacity
              style={styles.rewardsSectionHeader}
              onPress={() => onNavigate('charity-rewards')}
              activeOpacity={0.7}
            >
              <Text style={styles.rewardsSectionTitle}>
                📚 More Rewards of Charity
              </Text>
              <Text style={styles.navigateIcon}>→</Text>
            </TouchableOpacity>
          )}
        </View>

        {/* Charity Type Selection */}
        <Text style={commonStyles.label}>What did you give?</Text>
        <View style={styles.typeGrid}>
          {charityTypes.map((type) => (
            <TouchableOpacity
              key={type.id}
              style={[
                styles.typeCard,
                charityType === type.id && styles.typeCardSelected,
              ]}
              onPress={() => setCharityType(type.id)}
            >
              <Text style={styles.typeIcon}>{type.icon}</Text>
              <Text style={[
                styles.typeName,
                charityType === type.id && styles.typeNameSelected,
              ]}>
                {type.name}
              </Text>
              {charityType === type.id && (
                <View style={styles.typeCheckmark}>
                  <Text style={styles.checkmarkText}>✓</Text>
                </View>
              )}
            </TouchableOpacity>
          ))}
        </View>

        {/* Amount (Optional) */}
        {charityType && charityType !== 'smile' && (
          <>
            <Text style={commonStyles.label}>
              Amount (Optional)
            </Text>
            <TextInput
              style={commonStyles.input}
              placeholder={charityType === 'money' ? 'e.g., $10, 50 SAR' : 'e.g., 2 bags, 3 items'}
              value={amount}
              onChangeText={setAmount}
            />
          </>
        )}

        {/* Description (Optional) */}
        {charityType && (
          <>
            <Text style={commonStyles.label}>
              Description (Optional)
            </Text>
            <TextInput
              style={commonStyles.textArea}
              placeholder="Who did you help? What did you give?"
              value={description}
              onChangeText={setDescription}
              multiline
              numberOfLines={4}
            />
          </>
        )}

        {/* Reward Display */}
        {charityType && (
          <View style={styles.rewardBox}>
            <Text style={styles.rewardIcon}>🎁</Text>
            <Text style={styles.rewardTitle}>Minimum Reward:</Text>
            <Text style={styles.rewardValue}>700x Multiplication</Text>
            <Text style={styles.rewardQuote}>
              "Allah multiplies for whom He wills"
            </Text>
            <Text style={styles.rewardReference}>— Quran 2:261</Text>
          </View>
        )}

        {/* Record Button */}
        <TouchableOpacity
          style={[
            commonStyles.button,
            !charityType && commonStyles.buttonDisabled,
          ]}
          onPress={handleRecord}
          disabled={!charityType}
        >
          <Text style={commonStyles.buttonText}>
            ✅ Record Charity
          </Text>
        </TouchableOpacity>

        {/* Reminders */}
        <View style={styles.reminder}>
          <Text style={styles.reminderIcon}>💡</Text>
          <Text style={styles.reminderText}>
            Remember: Even your smile is charity! Every act of kindness counts.
          </Text>
        </View>

        <View style={styles.reminder}>
          <Text style={styles.reminderIcon}>🤲</Text>
          <Text style={styles.reminderText}>
            "Charity does not decrease wealth" - Sahih Muslim 2588
          </Text>
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
    borderLeftColor: colors.charity,
    ...shadows.medium,
  },

  mainHadithTitle: {
    fontSize: fontSize.lg,
    fontWeight: fontWeight.bold,
    color: colors.charity,
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
    color: colors.charity,
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
    borderColor: colors.charity,
    ...shadows.small,
  },

  rewardsSectionTitle: {
    fontSize: fontSize.base,
    fontWeight: fontWeight.bold,
    color: colors.charity,
    flex: 1,
  },

  navigateIcon: {
    fontSize: fontSize.xl,
    color: colors.charity,
    fontWeight: fontWeight.bold,
  },

  // Type Grid
  typeGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.md,
    marginBottom: spacing.xl,
  },

  typeCard: {
    width: '47%',
    backgroundColor: colors.background.primary,
    borderRadius: borderRadius.lg,
    padding: spacing.lg,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: colors.border.light,
    position: 'relative',
  },

  typeCardSelected: {
    borderColor: colors.charity,
    backgroundColor: '#fffbeb',
  },

  typeIcon: {
    fontSize: 40,
    marginBottom: spacing.sm,
  },

  typeName: {
    fontSize: fontSize.base,
    fontWeight: fontWeight.semibold,
    color: colors.text.primary,
  },

  typeNameSelected: {
    color: colors.charity,
  },

  typeCheckmark: {
    position: 'absolute',
    top: spacing.sm,
    right: spacing.sm,
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: colors.charity,
    justifyContent: 'center',
    alignItems: 'center',
  },

  checkmarkText: {
    fontSize: fontSize.sm,
    color: colors.text.white,
    fontWeight: fontWeight.bold,
  },

  // Reward Box
  rewardBox: {
    backgroundColor: '#fef3c7',
    borderRadius: borderRadius.lg,
    padding: spacing.xl,
    alignItems: 'center',
    marginBottom: spacing.xl,
  },

  rewardIcon: {
    fontSize: 48,
    marginBottom: spacing.md,
  },

  rewardTitle: {
    fontSize: fontSize.md,
    color: '#78350f',
    marginBottom: spacing.xs,
  },

  rewardValue: {
    fontSize: fontSize.xxl,
    fontWeight: fontWeight.bold,
    color: '#d97706',
    marginBottom: spacing.md,
  },

  rewardQuote: {
    fontSize: fontSize.base,
    color: '#92400e',
    fontStyle: 'italic',
    textAlign: 'center',
    marginBottom: spacing.xs / 2,
  },

  rewardReference: {
    fontSize: fontSize.sm,
    color: '#78350f',
    fontWeight: fontWeight.semibold,
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
});