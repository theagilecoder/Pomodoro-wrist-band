import React from 'react';
import {Text, StyleSheet} from 'react-native';

const Header = () => {
  return (
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
  );
};

const styles = StyleSheet.create({
  text: {
    textAlign: 'center',
    fontSize: 25,
    margin: 15,
  },
});

export default Header;
