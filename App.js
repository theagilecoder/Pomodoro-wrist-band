import React from 'react';
import {View} from 'react-native';
import PushNotification from 'react-native-push-notification';
import Header from './src/components/Header';
import Pomodoro1 from './src/components/Pomodoro1';
import Pomodoro2 from './src/components/Pomodoro2';
import Pomodoro3 from './src/components/Pomodoro3';
import About from './src/components/About';

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

const App = () => {
  return (
    <View>
      <Header />
      <Pomodoro1 />
      <Pomodoro2 />
      <Pomodoro3 />
      <About />
    </View>
  );
};

export default App;
