import React, {useState, useRef, useCallback} from 'react';
import {StyleSheet, View} from 'react-native';
import BackgroundTimer from 'react-native-background-timer';
import PushNotification from 'react-native-push-notification';
import Header from './src/components/Header';
import Pomodoro1 from './src/components/Pomodoro1';

PushNotification.configure({
  onRegister: function (token) {
    console.log('TOKEN:', token);
  },
  onNotification: function (notification) {
    console.log('NOTIFICATION:', notification);
  },
  permissions: {
    alert: true,
    badge: true,
    sound: true,
  },
  popInitialNotification: true,
  requestPermissions: Platform.OS === 'ios',
});

const useCounter = (initialValue, ms) => {
  const [count, setCount] = useState(initialValue);
  const intervalRef = useRef(null);

  const start = useCallback(() => {
    if (intervalRef.current !== null) {
      return;
    }
    intervalRef.current = BackgroundTimer.setInterval(() => {
      setCount((c) => c + 1);
    }, ms);
  }, []);

  const pause = useCallback(() => {
    if (intervalRef.current === null) {
      return;
    }
    BackgroundTimer.clearInterval(intervalRef.current);
    intervalRef.current = null;
  }, []);

  const reset = useCallback(() => {
    setCount(0);
  }, []);

  return {count, start, pause, reset};
};

const App = () => {
  const {count, start, pause, reset} = useCounter(0, 500);

  const setNotification = () => {
    PushNotification.localNotificationSchedule({
      title: 'My Notification Title', // (optional)
      message: 'My Notification Message', // (required)
      date: new Date(Date.now() + 1 * 5 * 1000), // in x * 1 min
    });
  };

  const cancelNotfication = () => {
    PushNotification.removeAllDeliveredNotifications();
    // PushNotification.cancelAllLocalNotifications();
  };

  return (
    <View>
      <Header />
      <Pomodoro1 />
    </View>
  );
};

const styles = StyleSheet.create({});

export default App;
