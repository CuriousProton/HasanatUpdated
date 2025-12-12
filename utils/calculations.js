// utils/calculations.js
// All reward calculation functions

/**
 * Calculate Quran reading reward based on letter count
 * @param {Object} surah - Surah object with letters property
 * @param {string} fromAyah - Starting ayah number
 * @param {string} toAyah - Ending ayah number
 * @returns {string} Formatted reward string
 */
export const calculateQuranReward = (surah, fromAyah, toAyah) => {
  if (!surah) return null;

  // If reading full surah
  if (!fromAyah && !toAyah) {
    const estimatedHasanat = surah.letters * 10;
    return `~${estimatedHasanat.toLocaleString()} hasanat minimum (10 per letter)`;
  }

  // If reading specific ayahs
  const from = parseInt(fromAyah) || 1;
  const to = parseInt(toAyah) || surah.ayahs;

  // Validate ayah range
  if (from > to) {
    return `Invalid range (from ${from} to ${to})`;
  }

  if (from < 1 || to > surah.ayahs) {
    return `Invalid range (surah has ${surah.ayahs} ayahs)`;
  }

  const ayahCount = to - from + 1;
  const avgLettersPerAyah = Math.floor(surah.letters / surah.ayahs);
  const estimatedLetters = ayahCount * avgLettersPerAyah;
  const estimatedHasanat = estimatedLetters * 10;

  return `~${estimatedHasanat.toLocaleString()} hasanat minimum (10 per letter)`;
};

/**
 * Calculate Salah reward with mosque multiplier
 * @param {Object} prayer - Prayer object
 * @param {boolean} atMosque - Whether prayed at mosque
 * @returns {string} Formatted reward string
 */
export const calculateSalahReward = (prayer, atMosque) => {
  if (!prayer) return null;
  
  if (atMosque) {
    return `27x reward (${prayer.quantified} × 27 for congregation)`;
  }
  return prayer.quantified;
};

/**
 * Calculate Dhikr reward based on count
 * @param {Object} dhikr - Dhikr object
 * @param {number} count - Number of times recited
 * @returns {string|null} Reward string or null
 */
export const calculateDhikrReward = (dhikr, count) => {
  if (!dhikr || !count) return null;
  
  // SubhanAllah 100 times = 1000 hasanat
  if (count >= 100 && dhikr.id === 1) {
    return '1,000 hasanat + 1,000 sins erased';
  }
  
  // SubhanAllahi wa bihamdihi 100 times = complete forgiveness
  if (count >= 100 && dhikr.id === 5) {
    return 'Complete forgiveness of sins';
  }
  
  // La ilaha illallah 100 times morning = 100 hasanat + 10 slaves freed
  if (count >= 100 && dhikr.id === 4) {
    return '100 hasanat + 10 slaves freed + protection';
  }
  
  return null;
};

/**
 * Format large numbers with commas
 * @param {number} num - Number to format
 * @returns {string} Formatted number string
 */
export const formatNumber = (num) => {
  return num.toLocaleString();
};

/**
 * Calculate total hasanat from history
 * @param {Array} hasanat - Array of hasanat entries
 * @returns {number} Total estimated hasanat
 */
export const calculateTotalHasanat = (hasanat) => {
  // This is a simplified calculation
  // In reality, only Allah knows the true reward
  return hasanat.length * 10; // Placeholder
};