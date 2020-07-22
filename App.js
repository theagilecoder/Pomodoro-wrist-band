import React, {useState, useRef, useCallback} from 'react';
import {StyleSheet, Text, View, Button} from 'react-native';
import BackgroundTimer from 'react-native-background-timer';
import PushNotification from 'react-native-push-notification';

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

  const testPush = () => {
    PushNotification.localNotification({
      title: 'My Notification Title', // (optional)
      message: 'My Notification Message', // (required)
    });
  };

  return (
    <View>
      <Text style={styles.text}>Current Count: {count}</Text>
      <View style={styles.buttonWrapper}>
        <View style={styles.button}>
          <Button title="Start" onPress={start} />
        </View>
        <View style={styles.button}>
          <Button title="Pause" onPress={pause} />
        </View>
        <View style={styles.button}>
          <Button title="Reset" onPress={reset} />
        </View>
      </View>
      <Button title="Notif" onPress={testPush} />
    </View>
  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: 25,
    margin: 20,
  },
  buttonWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  button: {
    width: 90,
  },
});

export default App;
