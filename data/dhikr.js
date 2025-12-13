// data/dhikr.js
// Dhikr options with Arabic, transliteration, recommended counts, and specific hadiths

export const dhikrOptions = [
  { 
    id: 1, 
    arabic: 'سُبْحَانَ اللّٰهِ', 
    transliteration: 'SubhanAllah',
    meaning: 'Glory be to Allah',
    recommended: 100,
    hadith: '"Whoever says SubhanAllah (Glory be to Allah) 100 times, a thousand good deeds are recorded for him and a thousand bad deeds are wiped away."',
    hadithReference: 'Sahih Muslim 2073',
    reward: '1,000 hasanat + 1,000 sins erased',
    motivation: 'Every recitation brings you closer to Allah and erases your sins!'
  },
  { 
    id: 2, 
    arabic: 'الْحَمْدُ لِلّٰهِ', 
    transliteration: 'Alhamdulillah',
    meaning: 'All praise is for Allah',
    recommended: 100,
    hadith: '"The best remembrance is: La ilaha illallah (There is no god but Allah), and the best supplication is: Alhamdulillah (All praise is for Allah)."',
    hadithReference: 'Sunan Ibn Majah 3800 - Hasan',
    reward: 'Best supplication',
    motivation: 'Gratitude opens doors to blessings!'
  },
  { 
    id: 3, 
    arabic: 'اللّٰهُ أَكْبَر', 
    transliteration: 'Allahu Akbar',
    meaning: 'Allah is the Greatest',
    recommended: 100,
    hadith: '"Allahu Akbar fills what is between the heavens and the earth."',
    hadithReference: 'Sunan an-Nasa\'i 1350 - Sahih',
    reward: 'Fills heavens and earth',
    motivation: 'Magnify Allah and feel His greatness!'
  },
  { 
    id: 4, 
    arabic: 'لَا إِلٰهَ إِلَّا اللّٰهُ', 
    transliteration: 'La ilaha illallah',
    meaning: 'There is no god but Allah',
    recommended: 100,
    hadith: '"Whoever says \'La ilaha illallah wahdahu la sharika lah, lahul-mulku wa lahul-hamd, wa huwa ala kulli shay\'in qadir\' 10 times, will have the reward of freeing four slaves from the children of Ismail."',
    hadithReference: 'Sahih al-Bukhari 6403',
    reward: '4 slaves freed per 10',
    motivation: 'The declaration of faith - the most beloved words to Allah!'
  },
  { 
    id: 5, 
    arabic: 'سُبْحَانَ اللّٰهِ وَبِحَمْدِهِ', 
    transliteration: 'SubhanAllahi wa bihamdihi',
    meaning: 'Glory and praise be to Allah',
    recommended: 100,
    hadith: '"Whoever says \'SubhanAllahi wa bihamdihi\' (Glory and praise be to Allah) 100 times a day, his sins will be forgiven even if they are like the foam of the sea."',
    hadithReference: 'Sahih al-Bukhari 6405',
    reward: 'Complete forgiveness',
    motivation: 'Light on the tongue, heavy on the scales!'
  },
  { 
    id: 6, 
    arabic: 'لَا حَوْلَ وَلَا قُوَّةَ إِلَّا بِاللّٰهِ', 
    transliteration: 'La hawla wa la quwwata illa billah',
    meaning: 'There is no power except with Allah',
    recommended: 33,
    hadith: '"Whoever says \'La hawla wa la quwwata illa billah\' (There is no power and no strength except with Allah), it is a treasure from the treasures of Paradise."',
    hadithReference: 'Sahih al-Bukhari 4205',
    reward: 'Treasure in Paradise',
    motivation: 'A treasure from Paradise - keep going!'
  },
  { 
    id: 7, 
    arabic: 'أَسْتَغْفِرُ اللّٰهَ', 
    transliteration: 'Astaghfirullah',
    meaning: 'I seek forgiveness from Allah',
    recommended: 100,
    hadith: '"Allah is pleased with a servant who, when he commits a sin, says: \'O Allah, forgive my sin\', and Allah says: \'My servant knows that he has a Lord who forgives sins and punishes for them.\'"',
    hadithReference: 'Sahih al-Bukhari 6306',
    reward: 'Allah\'s pleasure',
    motivation: 'Seek forgiveness and feel Allah\'s mercy!'
  },
  { 
    id: 8, 
    arabic: 'سُبْحَانَ اللّٰهِ وَبِحَمْدِهِ سُبْحَانَ اللّٰهِ الْعَظِيم', 
    transliteration: 'SubhanAllahi wa bihamdihi SubhanAllahil-Azeem',
    meaning: 'Glory and praise be to Allah, Glory be to Allah the Almighty',
    recommended: 100,
    hadith: '"There are two phrases that are light on the tongue, heavy on the Scale, and beloved to the Most Merciful: \'SubhanAllahi wa bihamdihi, SubhanAllahil-Azeem\'"',
    hadithReference: 'Sahih al-Bukhari 6406',
    reward: 'Heavy on scales',
    motivation: 'Light words, heavy rewards!'
  },
  { 
    id: 9, 
    arabic: 'لَا إِلٰهَ إِلَّا اللّٰهُ وَحْدَهُ لَا شَرِيكَ لَهُ', 
    transliteration: 'La ilaha illallah wahdahu la sharika lah',
    meaning: 'There is no god but Allah, alone, without partner',
    recommended: 100,
    hadith: '"Whoever says \'La ilaha illallah wahdahu la sharika lah, lahul-mulku wa lahul-hamd, wa huwa ala kulli shay\'in qadir\' 100 times in the morning, will have the reward of freeing ten slaves, one hundred hasanat, and protection from Shaytan."',
    hadithReference: 'Sahih al-Bukhari 6403',
    reward: '100 hasanat + 10 slaves + protection',
    motivation: 'Complete protection and immense rewards!'
  },
  { 
    id: 10, 
    arabic: 'رَبِّ اغْفِرْ لِي', 
    transliteration: 'Rabbi ighfir li',
    meaning: 'O my Lord, forgive me',
    recommended: 100,
    hadith: '"And your Lord said: \'Call upon Me; I will respond to you.\' Indeed, those who disdain My worship will enter Hell [rendered] contemptible."',
    hadithReference: 'Quran 40:60',
    reward: 'Allah\'s response and forgiveness',
    motivation: 'Seek forgiveness with sincerity!'
  },
  { 
    id: 11, 
    arabic: 'حَسْبِيَ اللّٰهُ', 
    transliteration: 'Hasbunallahu wa ni\'mal wakeel',
    meaning: 'Allah is sufficient for us, and He is the best Disposer of affairs',
    recommended: 33,
    hadith: '"Whoever says \'Hasbunallahu wa ni\'mal wakeel\' (Allah is sufficient for us, and He is the best Disposer of affairs) when afflicted with a calamity, Allah will suffice him."',
    hadithReference: 'Sunan Ibn Majah 3806 - Hasan',
    reward: 'Allah\'s sufficiency',
    motivation: 'Allah is sufficient for you!'
  },
  { 
    id: 12, 
    arabic: 'سُبْحَانَ اللّٰهِ وَبِحَمْدِهِ عَدَدَ خَلْقِهِ', 
    transliteration: 'SubhanAllahi wa bihamdihi, \'adada khalqihi',
    meaning: 'Glory and praise be to Allah, as many as His creation',
    recommended: 100,
    hadith: '"Whoever says: \'SubhanAllahi wa bihamdihi, \'adada khalqihi, wa ridha nafsihi, wa zinata \'arshihi, wa midada kalimatihi\' (Glory and praise be to Allah, as many as His creation, as much as pleases Him, as heavy as His Throne, and as much as the ink of His words) in the morning and evening, will have said the best that anyone can say."',
    hadithReference: 'Sahih Muslim 2726',
    reward: 'Best remembrance',
    motivation: 'The best words you can say!'
  },
];