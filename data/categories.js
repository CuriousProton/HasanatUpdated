// data/categories.js
// Category configuration for home screen cards

export const categories = [
  {
    id: 'salah',
    title: 'Salah',
    icon: '🕌',
    color: '#2563eb',
    lightColor: '#eff6ff',
    hadith: 'The first matter that the slave will be brought to account for on the Day of Judgment is the prayer.',
    reference: 'Sunan an-Nasa\'i 465'
  },
  {
    id: 'quran',
    title: 'Quran',
    icon: '📖',
    color: '#059669',
    lightColor: '#ecfdf5',
    hadith: 'The best among you are those who learn the Quran and teach it.',
    reference: 'Sahih al-Bukhari 5027'
  },
  {
    id: 'charity',
    title: 'Charity',
    icon: '💰',
    color: '#f59e0b',
    lightColor: '#fffbeb',
    hadith: 'Charity does not decrease wealth.',
    reference: 'Sahih Muslim 2588'
  },
  {
    id: 'dhikr',
    title: 'Dhikr',
    icon: '✨',
    color: '#db2777',
    lightColor: '#fdf2f8',
    hadith: 'The remembrance of Allah is the greatest act of worship.',
    reference: 'Quran 29:45'
  },
  {
    id: 'fasting',
    title: 'Fasting',
    icon: '☀️',
    color: '#7c3aed',
    lightColor: '#faf5ff',
    hadith: 'Every deed of the son of Adam is for him except fasting; it is for Me and I will reward for it.',
    reference: 'Sahih al-Bukhari 1904'
  },
  {
    id: 'kindness',
    title: 'Kindness',
    icon: '👥',
    color: '#0891b2',
    lightColor: '#f0fdfa',
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