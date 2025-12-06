// utils/dateHelpers.js
// Date formatting and filtering functions

/**
 * Format date as relative string (Today, Yesterday, X days ago, etc.)
 * @param {string} dateString - ISO date string
 * @returns {string} Formatted date string
 */
export const formatDate = (dateString) => {
  const date = new Date(dateString);
  const now = new Date();
  const diffTime = Math.abs(now - date);
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
  
  if (diffDays === 0) return 'Today';
  if (diffDays === 1) return 'Yesterday';
  if (diffDays < 7) return `${diffDays} days ago`;
  if (diffDays < 30) {
    const weeks = Math.floor(diffDays / 7);
    return `${weeks} ${weeks === 1 ? 'week' : 'weeks'} ago`;
  }
  return date.toLocaleDateString();
};

/**
 * Filter entries by date range
 * @param {Array} entries - Array of hasanat entries
 * @param {string} filter - Filter type ('all', 'today', 'week', 'month', 'custom')
 * @returns {Array} Filtered entries
 */
export const filterByDate = (entries, filter) => {
  const now = new Date();
  
  return entries.filter(entry => {
    const entryDate = new Date(entry.date);
    
    switch (filter) {
      case 'today':
        return entryDate.toDateString() === now.toDateString();
        
      case 'week':
        const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
        return entryDate >= weekAgo;
        
      case 'month':
        return entryDate.getMonth() === now.getMonth() && 
               entryDate.getFullYear() === now.getFullYear();
        
      case 'all':
      default:
        return true;
    }
  });
};

/**
 * Group entries by date
 * @param {Array} entries - Array of hasanat entries
 * @returns {Object} Entries grouped by date string
 */
export const groupByDate = (entries) => {
  return entries.reduce((groups, entry) => {
    const date = new Date(entry.date).toLocaleDateString();
    if (!groups[date]) {
      groups[date] = [];
    }
    groups[date].push(entry);
    return groups;
  }, {});
};

/**
 * Check if date is today
 * @param {string} dateString - ISO date string
 * @returns {boolean} True if date is today
 */
export const isToday = (dateString) => {
  const date = new Date(dateString);
  const now = new Date();
  return date.toDateString() === now.toDateString();
};

/**
 * Check if date is within last N days
 * @param {string} dateString - ISO date string
 * @param {number} days - Number of days
 * @returns {boolean} True if within range
 */
export const isWithinDays = (dateString, days) => {
  const date = new Date(dateString);
  const now = new Date();
  const diffTime = Math.abs(now - date);
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
  return diffDays <= days;
};

/**
 * Get start of day
 * @param {Date} date - Date object
 * @returns {Date} Start of day
 */
export const getStartOfDay = (date = new Date()) => {
  const start = new Date(date);
  start.setHours(0, 0, 0, 0);
  return start;
};

/**
 * Get end of day
 * @param {Date} date - Date object
 * @returns {Date} End of day
 */
export const getEndOfDay = (date = new Date()) => {
  const end = new Date(date);
  end.setHours(23, 59, 59, 999);
  return end;
};