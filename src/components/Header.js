import React from 'react';
import {Text, View, StyleSheet, Alert, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const Header = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>
        <Text style={{fontSize: 25}}>1 Page </Text>
        <Text style={{color: 'blue'}}>P</Text>
        <Text style={{color: 'red'}}>o</Text>
        <Text style={{color: 'orange'}}>m</Text>
        <Text style={{color: 'green'}}>o</Text>
        <Text style={{color: 'blue'}}>d</Text>
        <Text style={{color: 'red'}}>o</Text>
        <Text style={{color: 'orange'}}>r</Text>
        <Text style={{color: 'green'}}>o</Text>
      </Text>
      <TouchableOpacity onPress={showAlert} style={styles.icon}>
        <Icon name="info-circle" size={25} color="black" />
      </TouchableOpacity>
    </View>
  );
};

const showAlert = () =>
  Alert.alert(
    'Instructions',
    'IMPORTANT: The app works when it is minimized but it does not work if the phone Screen is locked. So, set the Screen to never turn off in Phone Settings. \n\n1 Pomodoro = 25 mins & Rest = 5 mins. So, if you want to work for 2 hours, select 4 Pomodoros. Notifications will be sent at the start of each Pomodoro and Rest period. \n\nThis App has been built to work with Smart Wrist Bands. Just add the app to your Wrist Band to get vibrating notifications and improve your productivity! \n\nYou can turn on/off Floating notifications and Sound on your phone in Settings -> Apps -> Pomodoro -> Notifications',
    [{text: 'OKAY, I Understand'}],
  );

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  text: {
    textAlign: 'center',
    fontSize: 25,
    marginTop: 20,
    flex: 6,
  },
  icon: {
    marginTop: 25,
    flex: 1,
  },
});

export default Header;
