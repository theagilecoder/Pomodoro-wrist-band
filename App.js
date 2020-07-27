import React from 'react';
import {View, ScrollView, StyleSheet} from 'react-native';
import PushNotification from 'react-native-push-notification';
import LinearGradient from 'react-native-linear-gradient';

import Header from './src/components/Header';
import Pomodoro1 from './src/components/Pomodoro1';
import Pomodoro2 from './src/components/Pomodoro2';
import Pomodoro3 from './src/components/Pomodoro3';
import Pomodoro4 from './src/components/Pomodoro4';
import Pomodoro5 from './src/components/Pomodoro5';
import Pomodoro6 from './src/components/Pomodoro6';
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
    <View style={styles.container}>
      <LinearGradient
        colors={['#09203f', '#537895']}
        style={styles.linearGradient}
        start={{x: 0, y: 0}}
        end={{x: 1, y: 0}}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <Header />
          <Pomodoro1 />
          <Pomodoro2 />
          <Pomodoro3 />
          <Pomodoro4 />
          <Pomodoro5 />
          <Pomodoro6 />
          <About />
        </ScrollView>
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  linearGradient: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default App;
