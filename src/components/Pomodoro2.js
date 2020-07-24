import React, {useState} from 'react';
import {StyleSheet, Text, View, Button, TouchableOpacity} from 'react-native';
import Collapsible from 'react-native-collapsible';
import PushNotification from 'react-native-push-notification';
import BackgroundTimer from 'react-native-background-timer';
import useCounter from './Counter';
import handleSeconds from './HandleSeconds';

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
  const [label, setLabel] = useState('');

  const sendNotification = () => {
    // Start Counter & Send notification at start of 1st Pomodoro
    start();
    setLabel('Work : ');
    PushNotification.localNotification({
      message: '1st Pomodoro started',
    });

    // Reset Counter & Send notification at end of 1st Pomodoro
    BackgroundTimer.setTimeout(() => {
      reset();
      setLabel('Rest : ');
      PushNotification.localNotification({
        message: '1st Pomodoro finished - Take Rest',
      });
    }, 1500 * 1000);

    // Reset Counter & Send notification at end of 1st Rest
    BackgroundTimer.setTimeout(() => {
      reset();
      setLabel('Work : ');
      PushNotification.localNotification({
        message: 'Rest over - 2nd Pomodoro started',
      });
    }, 1800 * 1000);

    // Reset Counter & Send notification at end of 2nd Pomodoro
    BackgroundTimer.setTimeout(() => {
      stop();
      reset();
      setLabel('Finished');
      PushNotification.localNotification({
        message: '2nd Pomodoro finished',
      });
    }, 3300 * 1000);
  };

  const cancelNotification = () => {
    // Handle Notifications
    // PushNotification.removeAllDeliveredNotifications();
    PushNotification.cancelAllLocalNotifications();

    // Handle Counter
    stop();
    reset();
    setLabel('');
  };

  return (
    <View>
      <TouchableOpacity onPress={toggleCollapse}>
        <View style={styles.header}>
          <Text style={styles.headerText}>2 Pomodoros</Text>
          <Text style={styles.counter}>{label + handleSeconds(count)}</Text>
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
