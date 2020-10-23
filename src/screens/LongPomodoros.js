import React from 'react';
import { View, ScrollView } from 'react-native';

// Custom Components
import Header from '../components/Header';
import Pomodoro1 from '../components/long_pomodoros/Pomodoro1';
import Pomodoro2 from '../components/long_pomodoros/Pomodoro2';
import Pomodoro3 from '../components/long_pomodoros/Pomodoro3';
import Pomodoro4 from '../components/long_pomodoros/Pomodoro4';

// Screen with 0.5 Hour Pomodoros
const LongPomodoros = () => {
  return (
    <View style={{ flex: 1}}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Header />
        <Pomodoro1 />
        <Pomodoro2 />
        <Pomodoro3 />
        <Pomodoro4 />
      </ScrollView>
    </View>
  );
};

export default LongPomodoros;