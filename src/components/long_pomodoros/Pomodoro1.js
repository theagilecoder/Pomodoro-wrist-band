import React, {useState, useRef} from 'react';
import {StyleSheet, Text, View, Button, TouchableOpacity} from 'react-native';
import Collapsible from 'react-native-collapsible';
import PushNotification from 'react-native-push-notification';
import BackgroundTimer from 'react-native-background-timer';
import useCounter from '../Counter';
import handleSeconds from '../HandleSeconds';

PushNotification.configure({
  requestPermissions: Platform.OS === 'ios',
});

const Pomodoro1 = () => {
  const [collapsed, setCollapsed] = useState(true);
  const toggleCollapse = () => setCollapsed(!collapsed);
  const {count, start, stop, reset} = useCounter(0, 1000);
  const [label, setLabel] = useState('');
  const buttonStatus = ['Work : ', 'Rest : '].includes(label) ? true : false;

  const timeoutRef = useRef(null); // Each setTimeout has a ref to store its ID

  const sendNotification = () => {
    // Start Counter & Send notification at start of 1st Pomodoro
    start();
    setLabel('Work : ');
    PushNotification.localNotification({
      message: 'Pomodoro started',
    });

    // Reset Counter & Send notification at end of 1st Pomodoro
    timeoutRef.current = BackgroundTimer.setTimeout(() => {
      stop();
      reset();
      setLabel('Finished');
      PushNotification.localNotification({
        message: 'Pomodoro finished',
      });
    }, 3000 * 1000);
  };

  const cancelNotification = () => {
    // Handle Notifications
    PushNotification.cancelAllLocalNotifications();

    // Handle Counter
    stop();
    reset();
    setLabel('');

    // Clear Timeouts
    BackgroundTimer.clearTimeout(timeoutRef.current);
  };

  return (
    <View>
      <TouchableOpacity onPress={toggleCollapse}>
        <View style={styles.header}>
          <Text style={styles.headerText}>1 Pomodoro</Text>
          <Text style={styles.counter}>{label + handleSeconds(count)}</Text>
        </View>
      </TouchableOpacity>
      <Collapsible collapsed={collapsed}>
        <View style={styles.buttonWrapper}>
          <View style={styles.button}>
            <Button
              title="Start"
              onPress={sendNotification}
              disabled={buttonStatus}
            />
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
    backgroundColor: '#D3EEFF',
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
    backgroundColor: '#D3EEFF',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    width: 150,
  },
});

export default Pomodoro1;
