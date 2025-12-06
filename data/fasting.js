// data/fasting.js
// Fasting types with icons and IDs

export const fastingTypes = [
  { id: 'ramadan', name: 'Ramadan', icon: '🌙' },
  { id: 'monday', name: 'Monday', icon: '📅' },
  { id: 'thursday', name: 'Thursday', icon: '📅' },
  { id: 'white-days', name: 'White Days (13-15)', icon: '⚪' },
  { id: 'arafah', name: 'Day of Arafah', icon: '🕋' },
  { id: 'ashura', name: 'Day of Ashura', icon: '🌟' },
  { id: 'shawwal', name: 'Shawwal (6 days)', icon: '🌸' },
  { id: 'other', name: 'Other Voluntary', icon: '✨' },
];

// Get reward for fasting type
export const getFastingReward = (fastingType) => {
  const rewards = {
    'arafah': '2 years sins forgiven',
    'ashura': '1 year sins forgiven',
    'shawwal': 'Full year reward',
    'ramadan': 'All past sins forgiven',
    'monday': '70 years from Fire',
    'thursday': '70 years from Fire',
    'white-days': '70 years from Fire',
    'other': '70 years from Fire'
  };
  
  return rewards[fastingType] || '70 years from Fire';
};