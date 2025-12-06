// screens/QuranScreen.js
// Quran reading tracking with reward calculator

import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, TextInput, StyleSheet, Alert } from 'react-native';
import { Header } from '../components/Header';
import { SmallHadithCard } from '../components/HadithCard';
import { surahs } from '../data/surahs';
import { quranHadithCards } from '../data/hadiths';
import { calculateQuranReward } from '../utils/calculations';
import { colors, spacing, fontSize, fontWeight, borderRadius } from '../styles/theme';
import { commonStyles } from '../styles/commonStyles';

export const QuranScreen = ({ onBack, onRecord }) => {
  const [selectedSurah, setSelectedSurah] = useState(null);
  const [fromAyah, setFromAyah] = useState('');
  const [toAyah, setToAyah] = useState('');
  const [showSurahList, setShowSurahList] = useState(true);

  const handleRecord = () => {
    if (!selectedSurah) {
      Alert.alert('Select Surah', 'Please select which surah you read');
      return;
    }

    const reward = calculateQuranReward(selectedSurah, fromAyah, toAyah);
    const ayahRange = fromAyah && toAyah 
      ? ` (Ayah ${fromAyah}-${toAyah})`
      : ' (Full Surah)';

    onRecord({
      type: 'quran',
      details: `${selectedSurah.name}${ayahRange}`,
      estimatedReward: reward,
    });

    Alert.alert(
      '📖 Quran Recorded!',
      `May Allah reward you for reciting ${selectedSurah.name}!\n\n${reward}`,
      [{ text: 'Alhamdulillah!' }]
    );

    // Reset
    setSelectedSurah(null);
    setFromAyah('');
    setToAyah('');
    setShowSurahList(true);
  };

  const handleSurahSelect = (surah) => {
    setSelectedSurah(surah);
    setShowSurahList(false);
    setFromAyah('');
    setToAyah('');
  };

  return (
    <View style={commonStyles.container}>
      <Header title="📖 Quran Reading" showBack onBack={onBack} />

      <ScrollView contentContainerStyle={commonStyles.scrollContent}>
        {/* Hadith Cards */}
        {showSurahList && (
          <View style={styles.hadithSection}>
            {quranHadithCards.map((hadith, index) => (
              <SmallHadithCard key={index} hadith={hadith} index={index} />
            ))}
          </View>
        )}

        {/* Surah Selection */}
        {showSurahList ? (
          <>
            <Text style={commonStyles.label}>Select Surah</Text>
            {surahs.map((surah) => (
              <TouchableOpacity
                key={surah.number}
                style={styles.surahCard}
                onPress={() => handleSurahSelect(surah)}
              >
                <View style={styles.surahNumber}>
                  <Text style={styles.surahNumberText}>{surah.number}</Text>
                </View>
                <View style={styles.surahInfo}>
                  <Text style={styles.surahName}>{surah.name}</Text>
                  <Text style={styles.surahArabic}>{surah.arabic}</Text>
                  <Text style={styles.surahDetails}>
                    {surah.ayahs} ayahs • {surah.letters.toLocaleString()} letters
                  </Text>
                  {surah.specialHadith && (
                    <Text style={styles.specialBadge}>✨ {surah.specialHadith}</Text>
                  )}
                </View>
                <View style={styles.rewardPreview}>
                  <Text style={styles.rewardPreviewText}>
                    ~{(surah.letters * 10).toLocaleString()}
                  </Text>
                  <Text style={styles.rewardPreviewLabel}>hasanat</Text>
                </View>
              </TouchableOpacity>
            ))}
          </>
        ) : (
          <>
            {/* Selected Surah Details */}
            <View style={styles.selectedSurahCard}>
              <TouchableOpacity
                style={styles.changeButton}
                onPress={() => setShowSurahList(true)}
              >
                <Text style={styles.changeButtonText}>← Change Surah</Text>
              </TouchableOpacity>

              <View style={styles.selectedHeader}>
                <Text style={styles.selectedNumber}>{selectedSurah.number}</Text>
                <View style={styles.selectedInfo}>
                  <Text style={styles.selectedName}>{selectedSurah.name}</Text>
                  <Text style={styles.selectedArabic}>{selectedSurah.arabic}</Text>
                </View>
              </View>

              <View style={styles.selectedStats}>
                <View style={styles.stat}>
                  <Text style={styles.statValue}>{selectedSurah.ayahs}</Text>
                  <Text style={styles.statLabel}>Ayahs</Text>
                </View>
                <View style={styles.stat}>
                  <Text style={styles.statValue}>{selectedSurah.letters.toLocaleString()}</Text>
                  <Text style={styles.statLabel}>Letters</Text>
                </View>
                <View style={styles.stat}>
                  <Text style={styles.statValue}>{(selectedSurah.letters * 10).toLocaleString()}</Text>
                  <Text style={styles.statLabel}>Min Hasanat</Text>
                </View>
              </View>
            </View>

            {/* Ayah Range (Optional) */}
            <Text style={commonStyles.label}>Did you read specific ayahs? (Optional)</Text>
            <Text style={styles.helpText}>
              Leave blank if you read the full surah
            </Text>

            <View style={styles.ayahInputs}>
              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>From Ayah</Text>
                <TextInput
                  style={commonStyles.input}
                  placeholder="1"
                  keyboardType="numeric"
                  value={fromAyah}
                  onChangeText={setFromAyah}
                  maxLength={3}
                />
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>To Ayah</Text>
                <TextInput
                  style={commonStyles.input}
                  placeholder={selectedSurah.ayahs.toString()}
                  keyboardType="numeric"
                  value={toAyah}
                  onChangeText={setToAyah}
                  maxLength={3}
                />
              </View>
            </View>

            {/* Reward Calculator */}
            <View style={styles.calculatorBox}>
              <Text style={styles.calculatorIcon}>🎁</Text>
              <Text style={styles.calculatorLabel}>Estimated Reward:</Text>
              <Text style={styles.calculatorValue}>
                {calculateQuranReward(selectedSurah, fromAyah, toAyah)}
              </Text>
              <Text style={styles.calculatorNote}>
                Based on the hadith: 10 hasanat per letter
              </Text>
            </View>

            {/* Record Button */}
            <TouchableOpacity
              style={commonStyles.button}
              onPress={handleRecord}
            >
              <Text style={commonStyles.buttonText}>
                ✅ Record Quran Reading
              </Text>
            </TouchableOpacity>

            {/* Reminder */}
            <View style={styles.reminder}>
              <Text style={styles.reminderIcon}>💡</Text>
              <Text style={styles.reminderText}>
                The actual reward is known only to Allah. This is a minimum estimate!
              </Text>
            </View>
          </>
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  hadithSection: {
    marginBottom: spacing.lg,
  },

  // Surah List Styles
  surahCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.background.primary,
    borderRadius: borderRadius.lg,
    padding: spacing.md,
    marginBottom: spacing.md,
    borderWidth: 1,
    borderColor: colors.border.light,
  },

  surahNumber: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.quran,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.md,
  },

  surahNumberText: {
    fontSize: fontSize.md,
    fontWeight: fontWeight.bold,
    color: colors.text.white,
  },

  surahInfo: {
    flex: 1,
  },

  surahName: {
    fontSize: fontSize.base,
    fontWeight: fontWeight.bold,
    color: colors.text.primary,
    marginBottom: spacing.xs / 2,
  },

  surahArabic: {
    fontSize: fontSize.lg,
    color: colors.text.secondary,
    marginBottom: spacing.xs / 2,
  },

  surahDetails: {
    fontSize: fontSize.xs,
    color: colors.text.tertiary,
  },

  specialBadge: {
    fontSize: fontSize.xs,
    color: colors.quran,
    fontWeight: fontWeight.semibold,
    marginTop: spacing.xs / 2,
  },

  rewardPreview: {
    alignItems: 'flex-end',
  },

  rewardPreviewText: {
    fontSize: fontSize.base,
    fontWeight: fontWeight.bold,
    color: colors.quran,
  },

  rewardPreviewLabel: {
    fontSize: fontSize.xs,
    color: colors.text.tertiary,
  },

  // Selected Surah Styles
  selectedSurahCard: {
    backgroundColor: colors.background.primary,
    borderRadius: borderRadius.lg,
    padding: spacing.lg,
    marginBottom: spacing.xl,
    borderWidth: 2,
    borderColor: colors.quran,
  },

  changeButton: {
    alignSelf: 'flex-start',
    marginBottom: spacing.md,
  },

  changeButtonText: {
    fontSize: fontSize.sm,
    color: colors.quran,
    fontWeight: fontWeight.semibold,
  },

  selectedHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.lg,
  },

  selectedNumber: {
    fontSize: fontSize.huge,
    fontWeight: fontWeight.bold,
    color: colors.quran,
    marginRight: spacing.md,
  },

  selectedInfo: {
    flex: 1,
  },

  selectedName: {
    fontSize: fontSize.xxl,
    fontWeight: fontWeight.bold,
    color: colors.text.primary,
    marginBottom: spacing.xs,
  },

  selectedArabic: {
    fontSize: fontSize.xl,
    color: colors.text.secondary,
  },

  selectedStats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingTop: spacing.lg,
    borderTopWidth: 1,
    borderTopColor: colors.border.light,
  },

  stat: {
    alignItems: 'center',
  },

  statValue: {
    fontSize: fontSize.xl,
    fontWeight: fontWeight.bold,
    color: colors.quran,
    marginBottom: spacing.xs / 2,
  },

  statLabel: {
    fontSize: fontSize.xs,
    color: colors.text.secondary,
  },

  // Ayah Input Styles
  helpText: {
    fontSize: fontSize.sm,
    color: colors.text.tertiary,
    marginBottom: spacing.md,
    fontStyle: 'italic',
  },

  ayahInputs: {
    flexDirection: 'row',
    gap: spacing.md,
    marginBottom: spacing.xl,
  },

  inputGroup: {
    flex: 1,
  },

  inputLabel: {
    fontSize: fontSize.sm,
    fontWeight: fontWeight.semibold,
    color: colors.text.secondary,
    marginBottom: spacing.sm,
  },

  // Calculator Box
  calculatorBox: {
    backgroundColor: '#d1fae5',
    borderRadius: borderRadius.lg,
    padding: spacing.xl,
    alignItems: 'center',
    marginBottom: spacing.xl,
  },

  calculatorIcon: {
    fontSize: 40,
    marginBottom: spacing.sm,
  },

  calculatorLabel: {
    fontSize: fontSize.sm,
    color: '#065f46',
    marginBottom: spacing.xs,
  },

  calculatorValue: {
    fontSize: fontSize.xxl,
    fontWeight: fontWeight.bold,
    color: '#065f46',
    textAlign: 'center',
    marginBottom: spacing.sm,
  },

  calculatorNote: {
    fontSize: fontSize.xs,
    color: '#059669',
    textAlign: 'center',
    fontStyle: 'italic',
  },

  // Reminder
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