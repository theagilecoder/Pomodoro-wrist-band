import React from 'react';
import { Text, View, StyleSheet } from 'react-native';

const SubHeading = () => {
  return (
    <View style={styles.container} >
      <Text style={styles.text} >Here, a Pomodoro is 25 mins of work & 5 mins of rest. For example, Start 2 Pomodoros if you want to work for 1 hours.</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 10,
    paddingHorizontal: 30,
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  text: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default SubHeading;