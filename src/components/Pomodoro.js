import React from 'react';
import {StyleSheet, Text, View, Button} from 'react-native';
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

const Pomodoro = () => {
  const sendNotification = () => {
    // Send notification at start of Pomodoro
    PushNotification.localNotification({
      title: 'Pomodoro for Wrist band',
      message: 'Pomodoro Counter Started',
    });

    // Send notification at end of Pomodoro
    PushNotification.localNotificationSchedule({
      title: 'Pomodoro for Wrist band',
      message: 'Pomodoro Counter Finished',
      date: new Date(Date.now() + 1 * 5 * 1000),
    });
  };

  const cancelNotfication = () => {
    // PushNotification.removeAllDeliveredNotifications();
    PushNotification.cancelAllLocalNotifications();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>1 Pomodoro</Text>
      <View style={styles.buttonWrapper}>
        <View style={styles.button}>
          <Button title="Start" onPress={sendNotification} />
        </View>
        <View style={styles.button}>
          <Button title="Abort" onPress={cancelNotfication} />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // backgroundColor: 'grey',
    margin: 10,
    borderRadius: 15,
  },
  text: {
    fontSize: 22,
    marginBottom: 20,
  },
  buttonWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  button: {
    width: 150,
  },
});

export default Pomodoro;
