// data/categories.js
// Category configuration for home screen cards

export const categories = [
  {
    id: 'salah',
    title: 'Salah',
    icon: '🕌',
    color: '#3b82f6',
    hadith: 'The first matter that the slave will be brought to account for on the Day of Judgment is the prayer.',
    reference: 'Sunan an-Nasa\'i 465'
  },
  {
    id: 'quran',
    title: 'Quran',
    icon: '📖',
    color: '#10b981',
    hadith: 'The best among you are those who learn the Quran and teach it.',
    reference: 'Sahih al-Bukhari 5027'
  },
  {
    id: 'charity',
    title: 'Charity',
    icon: '💰',
    color: '#f59e0b',
    hadith: 'Charity does not decrease wealth.',
    reference: 'Sahih Muslim 2588'
  },
  {
    id: 'dhikr',
    title: 'Dhikr',
    icon: '✨',
    color: '#ec4899',
    hadith: 'The remembrance of Allah is the greatest act of worship.',
    reference: 'Quran 29:45'
  },
  {
    id: 'fasting',
    title: 'Fasting',
    icon: '☀️',
    color: '#8b5cf6',
    hadith: 'Every deed of the son of Adam is for him except fasting; it is for Me and I will reward for it.',
    reference: 'Sahih al-Bukhari 1904'
  },
  {
    id: 'kindness',
    title: 'Kindness',
    icon: '👥',
    color: '#06b6d4',
    hadith: 'The merciful will be shown mercy by the Most Merciful.',
    reference: 'Sunan Abu Dawud 4941'
  }
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