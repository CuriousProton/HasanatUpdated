// screens/KindnessScreen.js
// Kindness and good deeds tracking

import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, TextInput, StyleSheet, Alert } from 'react-native';
import { Header } from '../components/Header';
import { SmallHadithCard } from '../components/HadithCard';
import { kindnessHadithCards } from '../data/hadiths';
import { colors, spacing, fontSize, fontWeight, borderRadius } from '../styles/theme';
import { commonStyles } from '../styles/commonStyles';

export const KindnessScreen = ({ onBack, onRecord }) => {
  const [selectedKindness, setSelectedKindness] = useState(null);
  const [customDescription, setCustomDescription] = useState('');

  const kindnessTypes = [
    { 
      id: 'help-person', 
      name: 'Helped Someone', 
      icon: '🤝',
      reward: 'Allah will help you in your time of need'
    },
    { 
      id: 'good-word', 
      name: 'Kind Words', 
      icon: '💬',
      reward: 'A good word is charity'
    },
    { 
      id: 'remove-harm', 
      name: 'Removed Harm', 
      icon: '🧹',
      reward: 'Full charity reward'
    },
    { 
      id: 'help-animal', 
      name: 'Helped Animal', 
      icon: '🐾',
      reward: 'In every living being there is reward'
    },
    { 
      id: 'visit-sick', 
      name: 'Visited Sick', 
      icon: '🏥',
      reward: 'Angels pray for you'
    },
    { 
      id: 'family-ties', 
      name: 'Family Ties', 
      icon: '👨‍👩‍👧‍👦',
      reward: 'Blessed with long life'
    },
    { 
      id: 'teach', 
      name: 'Taught Someone', 
      icon: '📚',
      reward: 'Continuous reward'
    },
    { 
      id: 'other', 
      name: 'Other Good Deed', 
      icon: '✨',
      reward: 'Allah knows best'
    },
  ];

  const handleRecord = () => {
    if (!selectedKindness) {
      Alert.alert('Select Deed', 'Please select what kind deed you performed');
      return;
    }

    const details = customDescription 
      ? `${selectedKindness.name}: ${customDescription}`
      : selectedKindness.name;

    onRecord({
      type: 'kindness',
      details: details,
      estimatedReward: selectedKindness.reward,
    });

    Alert.alert(
      '👥 Kindness Recorded!',
      `May Allah accept your good deed!\n\n${selectedKindness.reward}`,
      [{ text: 'Alhamdulillah!' }]
    );

    // Reset
    setSelectedKindness(null);
    setCustomDescription('');
  };

  return (
    <View style={commonStyles.container}>
      <Header title="👥 Kindness" showBack onBack={onBack} />

      <ScrollView contentContainerStyle={commonStyles.scrollContent}>
        {/* Hadith Cards */}
        <View style={styles.hadithSection}>
          {kindnessHadithCards.map((hadith, index) => (
            <SmallHadithCard key={index} hadith={hadith} index={index} />
          ))}
        </View>

        {/* Kindness Type Selection */}
        <Text style={commonStyles.label}>What good deed did you do?</Text>
        <View style={styles.kindnessGrid}>
          {kindnessTypes.map((type) => (
            <TouchableOpacity
              key={type.id}
              style={[
                styles.kindnessCard,
                selectedKindness?.id === type.id && styles.kindnessCardSelected,
              ]}
              onPress={() => setSelectedKindness(type)}
            >
              <Text style={styles.kindnessIcon}>{type.icon}</Text>
              <Text style={[
                styles.kindnessName,
                selectedKindness?.id === type.id && styles.kindnessNameSelected,
              ]}>
                {type.name}
              </Text>
              {selectedKindness?.id === type.id && (
                <View style={styles.kindnessCheckmark}>
                  <Text style={styles.checkmarkText}>✓</Text>
                </View>
              )}
            </TouchableOpacity>
          ))}
        </View>

        {/* Description */}
        {selectedKindness && (
          <>
            <Text style={commonStyles.label}>
              Tell us more (Optional)
            </Text>
            <TextInput
              style={commonStyles.textArea}
              placeholder="What did you do? Who did you help?"
              value={customDescription}
              onChangeText={setCustomDescription}
              multiline
              numberOfLines={4}
            />
          </>
        )}

        {/* Reward Display */}
        {selectedKindness && (
          <View style={styles.rewardBox}>
            <Text style={styles.rewardIcon}>🎁</Text>
            <Text style={styles.rewardTitle}>Your Reward:</Text>
            <Text style={styles.rewardValue}>
              {selectedKindness.reward}
            </Text>
          </View>
        )}

        {/* Record Button */}
        <TouchableOpacity
          style={[
            commonStyles.button,
            !selectedKindness && commonStyles.buttonDisabled,
          ]}
          onPress={handleRecord}
          disabled={!selectedKindness}
        >
          <Text style={commonStyles.buttonText}>
            ✅ Record Good Deed
          </Text>
        </TouchableOpacity>

        {/* Daily Reminder */}
        <View style={styles.dailyBox}>
          <Text style={styles.dailyTitle}>💫 Daily Opportunities:</Text>
          <Text style={styles.dailyText}>
            "Every joint of a person must perform a charity each day that the sun rises"
          </Text>
          <Text style={styles.dailyReference}>— Sahih al-Bukhari 2989</Text>
          
          <View style={styles.opportunitiesList}>
            <Text style={styles.opportunityItem}>• Judge justly between people</Text>
            <Text style={styles.opportunityItem}>• Help someone mount their ride</Text>
            <Text style={styles.opportunityItem}>• Speak a good word</Text>
            <Text style={styles.opportunityItem}>• Every step to prayer</Text>
            <Text style={styles.opportunityItem}>• Remove harmful objects from the road</Text>
          </View>
          
          <Text style={styles.dailyNote}>
            That's 360 opportunities for charity every day! ✨
          </Text>
        </View>

        {/* Reminder */}
        <View style={styles.reminder}>
          <Text style={styles.reminderIcon}>💡</Text>
          <Text style={styles.reminderText}>
            Remember: Even the smallest acts of kindness count. Your smile is charity!
          </Text>
        </View>

        <View style={styles.reminder}>
          <Text style={styles.reminderIcon}>🤲</Text>
          <Text style={styles.reminderText}>
            "Whoever relieves a Muslim of a burden, Allah will relieve him of a burden on the Day of Resurrection"
          </Text>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  hadithSection: {
    marginBottom: spacing.lg,
  },

  // Kindness Grid
  kindnessGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.md,
    marginBottom: spacing.xl,
  },

  kindnessCard: {
    width: '47%',
    backgroundColor: colors.background.primary,
    borderRadius: borderRadius.lg,
    padding: spacing.lg,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: colors.border.light,
    position: 'relative',
    minHeight: 120,
    justifyContent: 'center',
  },

  kindnessCardSelected: {
    borderColor: colors.kindness,
    backgroundColor: '#ecfeff',
  },

  kindnessIcon: {
    fontSize: 40,
    marginBottom: spacing.sm,
  },

  kindnessName: {
    fontSize: fontSize.sm,
    fontWeight: fontWeight.semibold,
    color: colors.text.primary,
    textAlign: 'center',
  },

  kindnessNameSelected: {
    color: colors.kindness,
  },

  kindnessCheckmark: {
    position: 'absolute',
    top: spacing.sm,
    right: spacing.sm,
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: colors.kindness,
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
    backgroundColor: '#cffafe',
    borderRadius: borderRadius.lg,
    padding: spacing.xl,
    alignItems: 'center',
    marginBottom: spacing.xl,
    borderWidth: 2,
    borderColor: colors.kindness,
  },

  rewardIcon: {
    fontSize: 48,
    marginBottom: spacing.md,
  },

  rewardTitle: {
    fontSize: fontSize.md,
    color: '#0e7490',
    marginBottom: spacing.xs,
  },

  rewardValue: {
    fontSize: fontSize.xl,
    fontWeight: fontWeight.bold,
    color: colors.kindness,
    textAlign: 'center',
  },

  // Daily Box
  dailyBox: {
    backgroundColor: colors.background.primary,
    borderRadius: borderRadius.lg,
    padding: spacing.lg,
    marginTop: spacing.lg,
  },

  dailyTitle: {
    fontSize: fontSize.lg,
    fontWeight: fontWeight.bold,
    color: colors.text.primary,
    marginBottom: spacing.md,
  },

  dailyText: {
    fontSize: fontSize.sm,
    color: colors.text.secondary,
    fontStyle: 'italic',
    lineHeight: 20,
    marginBottom: spacing.xs,
  },

  dailyReference: {
    fontSize: fontSize.xs,
    color: colors.text.tertiary,
    marginBottom: spacing.lg,
  },

  opportunitiesList: {
    backgroundColor: colors.background.tertiary,
    borderRadius: borderRadius.md,
    padding: spacing.md,
    marginBottom: spacing.md,
  },

  opportunityItem: {
    fontSize: fontSize.sm,
    color: colors.text.primary,
    marginBottom: spacing.xs,
    lineHeight: 20,
  },

  dailyNote: {
    fontSize: fontSize.sm,
    fontWeight: fontWeight.semibold,
    color: colors.kindness,
    textAlign: 'center',
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