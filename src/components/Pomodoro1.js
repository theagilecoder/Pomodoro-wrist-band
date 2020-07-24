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

const Pomodoro1 = () => {
  const [collapsed, setCollapsed] = useState(true);
  const toggleCollapse = () => setCollapsed(!collapsed);
  const {count, start, stop, reset} = useCounter(0, 1000);

  const sendNotification = () => {
    // Send notification at start of Pomodoro
    PushNotification.localNotification({
      title: 'Pomodoro for Wrist band',
      message: 'Pomodoro Counter Started',
    });

    // Start the Counter
    start();

    // Send notification at end of Pomodoro
    PushNotification.localNotificationSchedule({
      title: 'Pomodoro for Wrist band',
      message: 'Pomodoro Counter Finished',
      date: new Date(Date.now() + 1 * 5 * 1000),
    });

    // Set Timeout for stopping Counter at end of Pomodoro
    BackgroundTimer.setTimeout(() => {
      stop();
      reset();
    }, 5 * 1000);
  };

  const cancelNotification = () => {
    // PushNotification.removeAllDeliveredNotifications();
    PushNotification.cancelAllLocalNotifications();
  };

  return (
    <View>
      <TouchableOpacity onPress={toggleCollapse}>
        <View style={styles.header}>
          <Text style={styles.headerText}>1 Pomodoro</Text>
          <Text style={styles.counter}>Work {count}s</Text>
        </View>
      </TouchableOpacity>
      <Collapsible collapsed={collapsed}>
        <View style={styles.buttonWrapper}>
          <View style={styles.button}>
            <Button title="Start" onPress={sendNotification} />
          </View>
          <View style={styles.button}>
            <Button
              title="Cancel"
              onPress={() => {
                cancelNotification();
                stop();
                reset();
              }}
            />
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
    padding: 10,
    backgroundColor: '#F1E9F5',
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  button: {
    width: 150,
  },
});

export default Pomodoro1;
