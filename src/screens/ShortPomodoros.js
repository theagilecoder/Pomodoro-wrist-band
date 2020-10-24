import React from 'react';
import { View, ScrollView } from 'react-native';

// Custom Components
import Header from '../components/Header';
import Pomodoro1 from '../components/short_pomodoros/Pomodoro1';
import Pomodoro2 from '../components/short_pomodoros/Pomodoro2';
import Pomodoro3 from '../components/short_pomodoros/Pomodoro3';
import Pomodoro4 from '../components/short_pomodoros/Pomodoro4';
import Pomodoro5 from '../components/short_pomodoros/Pomodoro5';
import Pomodoro6 from '../components/short_pomodoros/Pomodoro6';
import SubHeading from '../components/short_pomodoros/SubHeading';

// Screen with 0.5 Hour Pomodoros
const ShortPomodoros = () => {
  return (
    <View style={{ flex: 1}}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Header />
        <SubHeading />
        <Pomodoro1 />
        <Pomodoro2 />
        <Pomodoro3 />
        <Pomodoro4 />
        <Pomodoro5 />
        <Pomodoro6 />
      </ScrollView>
    </View>
  );
};

export default ShortPomodoros;