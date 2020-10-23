import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

// Custom Components
import Header from './src/components/Header';
import Pomodoro1 from './src/components/Pomodoro1';
import Pomodoro2 from './src/components/Pomodoro2';
import Pomodoro3 from './src/components/Pomodoro3';
import Pomodoro4 from './src/components/Pomodoro4';
import Pomodoro5 from './src/components/Pomodoro5';
import Pomodoro6 from './src/components/Pomodoro6';

// 0.5 Hour Pomodoros Screen
const ShortPomodoros = () => {
  return (
    <View style={{ flex: 1}}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Header />
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

// 1 Hour Pomodoros Screen
const LongPomodoros = () => {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Long Pomodoros!</Text>
    </View>
  );
}

const Tab = createBottomTabNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator 
        tabBarOptions={{labelStyle: {fontSize: 15,}, tabStyle: {justifyContent: 'center'}}}
      >
        <Tab.Screen name="Short" component={ShortPomodoros} options={{tabBarLabel: "0.5 Hour Pomodoros"}} />
        <Tab.Screen name="Long" component={LongPomodoros} options={{tabBarLabel: "1 Hour Pomodoros"}} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

export default App;
