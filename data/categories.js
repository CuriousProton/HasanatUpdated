// data/categories.js
// Category configuration for home screen cards

export const categories = [
  { id: 'salah', title: 'Salah', icon: '🕌', color: '#3b82f6' },
  { id: 'quran', title: 'Quran', icon: '📖', color: '#10b981' },
  { id: 'charity', title: 'Charity', icon: '💰', color: '#f59e0b' },
  { id: 'dhikr', title: 'Dhikr', icon: '✨', color: '#ec4899' },
  { id: 'fasting', title: 'Fasting', icon: '☀️', color: '#8b5cf6' },
  { id: 'kindness', title: 'Kindness', icon: '👥', color: '#06b6d4' },
  { id: 'references', title: 'References', icon: '📚', color: '#059669' }
];

// Get category by ID
export const getCategoryById = (id) => {
  return categories.find(cat => cat.id === id);
};

// Get category color
export const getCategoryColor = (id) => {
  const category = getCategoryById(id);
  return category ? category.color : '#6b7280';
};