import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

// Import Screens
import ShortPomodoros from './src/screens/ShortPomodoros'
import LongPomodoros from './src/screens/LongPomodoros'

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
