import React, {useState} from 'react';
import {StyleSheet, Text, View, Button, TouchableOpacity} from 'react-native';
import Collapsible from 'react-native-collapsible';
import PushNotification from 'react-native-push-notification';
import BackgroundTimer from 'react-native-background-timer';
import useCounter from './Counter';

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

const Pomodoro2 = () => {
  const [collapsed, setCollapsed] = useState(true);
  const toggleCollapse = () => setCollapsed(!collapsed);
  const {count, start, stop, reset} = useCounter(0, 1000);

  const sendNotification = () => {
    // Send notification at start of 1st Pomodoro
    PushNotification.localNotification({
      message: '1st Pomodoro started',
    });

    // Send notification at end of 1st Pomodoro
    PushNotification.localNotificationSchedule({
      message: '1st Pomodoro finished - Take Rest',
      date: new Date(Date.now() + 1 * 5 * 1000),
    });

    // Send notification at end of 1st Rest
    PushNotification.localNotificationSchedule({
      message: 'Rest over - 2nd Pomodoro started',
      date: new Date(Date.now() + 1 * 10 * 1000),
    });

    // Send notification at end of 2nd Pomodoro
    PushNotification.localNotificationSchedule({
      message: '2nd Pomodoro finished',
      date: new Date(Date.now() + 1 * 15 * 1000),
    });

    // Start Counter at start of 1st Pomodoro
    start();

    // Reset Counter at end of 1st Pomodoro
    BackgroundTimer.setTimeout(() => {
      reset();
    }, 5 * 1000);

    // Reset Counter at end of 1st Rest
    BackgroundTimer.setTimeout(() => {
      reset();
    }, 10 * 1000);

    // Reset Counter at end of 2nd Pomodoro
    BackgroundTimer.setTimeout(() => {
      stop();
      reset();
    }, 15 * 1000);
  };

  const cancelNotification = () => {
    // Handle Notifications
    // PushNotification.removeAllDeliveredNotifications();
    PushNotification.cancelAllLocalNotifications();

    // Handle Counter
    stop();
    reset();
  };

  return (
    <View>
      <TouchableOpacity onPress={toggleCollapse}>
        <View style={styles.header}>
          <Text style={styles.headerText}>2 Pomodoros</Text>
          <Text style={styles.counter}>{5 - count}s</Text>
        </View>
      </TouchableOpacity>
      <Collapsible collapsed={collapsed}>
        <View style={styles.buttonWrapper}>
          <View style={styles.button}>
            <Button title="Start" onPress={sendNotification} />
          </View>
          <View style={styles.button}>
            <Button title="Cancel" onPress={cancelNotification} />
          </View>
        </View>
      </Collapsible>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#F1E9F5',
    padding: 10,
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  headerText: {
    fontSize: 16,
    fontWeight: 'bold',
    paddingLeft: 20,
  },
  counter: {
    fontSize: 16,
    paddingRight: 20,
  },
  buttonWrapper: {
    paddingVertical: 10,
    paddingHorizontal: 25,
    backgroundColor: '#F1E9F5',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    width: 150,
  },
});

export default Pomodoro2;
