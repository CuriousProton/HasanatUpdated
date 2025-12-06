// utils/storage.js
// AsyncStorage helper functions

import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY = 'hasanat';

/**
 * Load hasanat entries from storage
 * @returns {Promise<Array>} Array of hasanat entries
 */
export const loadHasanat = async () => {
  try {
    const stored = await AsyncStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    console.error('Error loading hasanat:', error);
    return [];
  }
};

/**
 * Save hasanat entries to storage
 * @param {Array} data - Array of hasanat entries to save
 * @returns {Promise<boolean>} Success status
 */
export const saveHasanat = async (data) => {
  try {
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    return true;
  } catch (error) {
    console.error('Error saving hasanat:', error);
    return false;
  }
};

/**
 * Clear all hasanat data
 * @returns {Promise<boolean>} Success status
 */
export const clearHasanat = async () => {
  try {
    await AsyncStorage.removeItem(STORAGE_KEY);
    return true;
  } catch (error) {
    console.error('Error clearing hasanat:', error);
    return false;
  }
};

/**
 * Add a single hasanah entry
 * @param {Array} currentData - Current hasanat array
 * @param {Object} entry - New entry to add
 * @returns {Promise<Array>} Updated hasanat array
 */
export const addHasanah = async (currentData, entry) => {
  const newEntry = {
    id: Date.now(),
    ...entry,
    date: new Date().toISOString(),
  };
  
  const updated = [newEntry, ...currentData];
  await saveHasanat(updated);
  return updated;
};

/**
 * Delete a hasanah entry
 * @param {Array} currentData - Current hasanat array
 * @param {number} id - ID of entry to delete
 * @returns {Promise<Array>} Updated hasanat array
 */
export const deleteHasanah = async (currentData, id) => {
  const updated = currentData.filter(entry => entry.id !== id);
  await saveHasanat(updated);
  return updated;
};