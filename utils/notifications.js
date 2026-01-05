// utils/notifications.js
// Notification setup and scheduling

import * as Notifications from 'expo-notifications';
import { Platform } from 'react-native';
import { getRandomTip, getEncouragingMessage } from '../data/motivationalTips';

// Configure notification behavior
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    // Use new flags to avoid deprecation warnings
    shouldShowBanner: true,
    shouldShowList: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

// Request notification permissions
export const registerForPushNotifications = async () => {
  try {
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;

    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }

    if (finalStatus !== 'granted') {
      console.log('Failed to get push token for push notification!');
      return false;
    }

    // Configure notification channel for Android
    if (Platform.OS === 'android') {
      await Notifications.setNotificationChannelAsync('daily-reminder', {
        name: 'Daily Hasanat Reminder',
        importance: Notifications.AndroidImportance.HIGH,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: '#2563eb',
      });
    }

    return true;
  } catch (error) {
    console.error('Error requesting notifications permission:', error);
    return false;
  }
};

// Count hasanat for today
// export const getTodayHasanatCount = (hasanat) => {
//   const today = new Date();
//   today.setHours(0, 0, 0, 0);

//   return hasanat.filter(entry => {
//     const entryDate = new Date(entry.date);
//     entryDate.setHours(0, 0, 0, 0);
//     return entryDate.getTime() === today.getTime();
//   }).length;
// };







export const getTodayHasanatCount = (entries) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  return entries.reduce((total, entry) => {
    const entryDate = new Date(entry.date);
    entryDate.setHours(0, 0, 0, 0);

    if (entryDate.getTime() !== today.getTime()) {
      return total;
    }

    switch (entry.type) {
      case 'charity':{
        // Ensure count is a valid number
        const count = Number(entry.count);
        return total + (isNaN(count) ? 1 : count) * 700;
      }
      case 'dhikr':
        return total + (Number(entry.rewordValue) || 0);

      case 'salah':
        return total + (Number(entry.rewordValue) || 0);

      case 'kindness':
        return total + 700;

      case 'fasting':
        return total + 1;
      case 'quran':
        return total + (Number(entry.rewordValue) || 0);

      default:
        return total;
    }
  }, 0);
};

// Schedule daily notification at 9 PM
export const scheduleDailyNotification = async (hasanat) => {
  try {
    // Cancel all previous notifications
    await Notifications.cancelAllScheduledNotificationsAsync();

    // Get today's hasanat count
    const todayCount = getTodayHasanatCount(hasanat);

    // Get a random motivational tip
    const tip = getRandomTip();

    // Get encouraging message based on count
    const encouragingMsg = getEncouragingMessage(todayCount);

    // Create notification content
    const content = {
      title: `📿 Today's Hasanat: ${todayCount}`,
      body: `${encouragingMsg}\n\n💡 ${tip.tip}`,
      data: { tip, count: todayCount },
      sound: true,
      priority: Notifications.AndroidNotificationPriority.HIGH,
    };

    // Schedule for 9 PM daily
    const trigger = {
      hour: 21, // 9 PM
      minute: 0,
      repeats: true,
      channelId: 'daily-reminder', // required on Android 13+ for scheduled notifications
    };

    await Notifications.scheduleNotificationAsync({
      content,
      trigger,
    });

    console.log('Daily notification scheduled for 9 PM');
    return true;
  } catch (error) {
    console.error('Error scheduling notification:', error);
    return false;
  }
};

// Update the daily notification (call this whenever hasanat changes)
export const updateDailyNotification = async (hasanat) => {
  await scheduleDailyNotification(hasanat);
};

// Send immediate test notification (for testing)
export const sendTestNotification = async (hasanat) => {
  try {
    const todayCount = getTodayHasanatCount(hasanat);
    const tip = getRandomTip();
    const encouragingMsg = getEncouragingMessage(todayCount);

    await Notifications.scheduleNotificationAsync({
      content: {
        title: `📿 Today's Hasanat: ${todayCount}`,
        body: `${encouragingMsg}\n\n💡 ${tip.tip}`,
        data: { tip, count: todayCount },
        sound: true,
      },
      trigger: {
        seconds: 2,
        channelId: 'daily-reminder',
      },
    });

    console.log('Test notification sent');
    return true;
  } catch (error) {
    console.error('Error sending test notification:', error);
    return false;
  }
};
