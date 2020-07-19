import React, {useState, useRef, useCallback} from 'react';
import {StyleSheet, Text, View, Button} from 'react-native';
import BackgroundTimer from 'react-native-background-timer';

const useCounter = (initialValue, ms) => {
  const [count, setCount] = useState(initialValue);
  const intervalRef = useRef(null);

  const start = useCallback(() => {
    if (intervalRef.current !== null) {
      return;
    }
    intervalRef.current = BackgroundTimer.setInterval(() => {
      setCount((c) => c + 1);
    }, ms);
  }, []);

  const pause = useCallback(() => {
    if (intervalRef.current === null) {
      return;
    }
    BackgroundTimer.clearInterval(intervalRef.current);
    intervalRef.current = null;
  }, []);

  const reset = useCallback(() => {
    setCount(0);
  }, []);

  return {count, start, pause, reset};
};

const App = () => {
  const {count, start, pause, reset} = useCounter(0, 500);

  return (
    <View>
      <Text style={styles.textStyle}>Current Count: {count}</Text>
      <Button title="Start" onPress={start} />
      <Button title="Pause" onPress={pause} />
      <Button title="Reset" onPress={reset} />
    </View>
  );
};

const styles = StyleSheet.create({
  textStyle: {
    fontSize: 30,
  },
});

export default App;
