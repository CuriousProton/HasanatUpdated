// data/motivationalTips.js
// Motivational tips and suggestions for daily notifications

export const motivationalTips = [
  {
    tip: "Read Surah Al-Mulk before sleeping tonight",
    benefit: "It protects from the punishment of the grave",
    reference: "Sunan At-Tirmidhi 2891"
  },
  {
    tip: "Go to bed in a state of Wudu",
    benefit: "The angels will make dua for you throughout the night",
    reference: "Sahih Al-Bukhari 247"
  },
  {
    tip: "Recite Ayatul Kursi after each prayer",
    benefit: "Nothing will prevent you from entering Paradise except death",
    reference: "Sunan An-Nasa'i 9928"
  },
  {
    tip: "Give charity, even if it's small",
    benefit: "Charity extinguishes sins like water extinguishes fire",
    reference: "Sunan At-Tirmidhi 2616"
  },
  {
    tip: "Make dua in the last third of the night",
    benefit: "Allah descends to the lowest heaven and responds to supplications",
    reference: "Sahih Al-Bukhari 1145"
  },
  {
    tip: "Recite 'SubhanAllah' 33 times after each prayer",
    benefit: "Followed by 'Alhamdulillah' and 'Allahu Akbar' for immense reward",
    reference: "Sahih Muslim 597"
  },
  {
    tip: "Smile at your brother or sister",
    benefit: "Smiling in the face of your brother is charity",
    reference: "Sunan At-Tirmidhi 1956"
  },
  {
    tip: "Pray two Rak'ahs before Fajr",
    benefit: "The Sunnah of Fajr is better than the world and all it contains",
    reference: "Sahih Muslim 725"
  },
  {
    tip: "Send Salawat upon the Prophet ﷺ",
    benefit: "Allah will send blessings upon you tenfold",
    reference: "Sahih Muslim 408"
  },
  {
    tip: "Help someone in need today",
    benefit: "Allah will help you in your time of need",
    reference: "Sahih Muslim 2699"
  },
  {
    tip: "Recite the morning and evening adhkar",
    benefit: "Protection from harm and blessings throughout the day",
    reference: "Sahih al-Bukhari 6307, Sahih Muslim 2704"
  },
  {
    tip: "Read at least one page of Quran",
    benefit: "Each letter is rewarded 10 times minimum",
    reference: "Sunan At-Tirmidhi 2910"
  },
  {
    tip: "Make sincere Tawbah (repentance)",
    benefit: "Allah loves those who constantly repent",
    reference: "Quran 2:222"
  },
  {
    tip: "Visit a sick person or check on them",
    benefit: "70,000 angels will pray for you",
    reference: "Sahih Muslim 2568"
  },
  {
    tip: "Perform Tahajjud prayer tonight",
    benefit: "The best prayer after the obligatory prayers",
    reference: "Sahih Muslim 1163"
  }
];

// Get a random motivational tip
export const getRandomTip = () => {
  const randomIndex = Math.floor(Math.random() * motivationalTips.length);
  return motivationalTips[randomIndex];
};

// Encouraging messages based on hasanat count
export const getEncouragingMessage = (count) => {
  if (count === 0) {
    return "Don't worry! Tomorrow is a new day to earn rewards 🌟";
  } else if (count === 1) {
    return "Great start! Every good deed counts 🌱";
  } else if (count <= 3) {
    return "Masha'Allah! You're building good habits ⭐";
  } else if (count <= 5) {
    return "Excellent work! Keep the momentum going 🚀";
  } else if (count <= 10) {
    return "Subhan'Allah! You're doing amazing! 🌟";
  } else {
    return "Alhamdulillah! What an incredible day! 🎉";
  }
};
