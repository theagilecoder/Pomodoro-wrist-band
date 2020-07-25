import React, {useState} from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import Collapsible from 'react-native-collapsible';

const About = () => {
  const [collapsed, setCollapsed] = useState(true);
  const toggleCollapse = () => setCollapsed(!collapsed);

  return (
    <View>
      <TouchableOpacity onPress={toggleCollapse}>
        <View style={styles.header}>
          <Text style={styles.headerText}>Instructions</Text>
        </View>
      </TouchableOpacity>
      <Collapsible collapsed={collapsed}>
        <View style={styles.description}>
          <Text style={{textAlign: 'center'}}>
            1 Pomodoro = 25 mins and Rest = 5 mins. If you want to work for 2
            hours, select 4 Pomodoros. Notifications will be sent at the start
            of each Pomodoro and Rest period. Add the app to your Wrist Band to
            get vibrating notifications and improve your productivity!
          </Text>
        </View>
      </Collapsible>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#F1E9F5',
    padding: 10,
    marginTop: 20,
  },
  headerText: {
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold',
  },
  description: {
    paddingBottom: 10,
    paddingHorizontal: 25,
    backgroundColor: '#F1E9F5',
  },
});

export default About;
