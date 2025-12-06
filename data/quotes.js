// data/quotes.js
// Motivational quotes and intention reminders

export const motivationalQuotes = [
  { quote: "Every small deed counts! Keep going!", icon: "⭐" },
  { quote: "Your consistency is beautiful!", icon: "💫" },
  { quote: "Allah sees your efforts!", icon: "🌟" },
  { quote: "You're building Paradise, brick by brick!", icon: "🏗️" },
  { quote: "Small actions, huge rewards!", icon: "🎁" },
];

export const intentionReminders = [
  "Remember: Intention makes it worship! 🎯",
  "Renew your intention for Allah's sake 💚",
  "Pure intention = Maximum reward! ✨",
  "Make it for Allah alone 🤲",
  "Sincerity is the key to acceptance 🔑",
];

// Get random quote
export const getRandomQuote = () => {
  return motivationalQuotes[Math.floor(Math.random() * motivationalQuotes.length)];
};

// Get random intention reminder
export const getRandomIntentionReminder = () => {
  return intentionReminders[Math.floor(Math.random() * intentionReminders.length)];
};