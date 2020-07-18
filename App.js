import React, {useState, useRef, useCallback} from 'react';
import {StyleSheet, Text, View, Button} from 'react-native';

const useCounter = (initialValue, ms) => {
  const [count, setCount] = useState(initialValue);
  const intervalRef = useRef(null);

  const start = useCallback(() => {
    if (intervalRef.current !== null) {
      return;
    }
    intervalRef.current = setInterval(() => {
      setCount((c) => c + 1);
    }, ms);
  }, []);

  const stop = useCallback(() => {
    if (intervalRef.current === null) {
      return;
    }
    clearInterval(intervalRef.current);
    intervalRef.current = null;
  }, []);

  const reset = useCallback(() => {
    setCount(0);
  }, []);

  return {count, start, stop, reset};
};

const App = () => {
  const {count, start, stop, reset} = useCounter(0, 500);

  return (
    <View>
      <Text>Current Count: {count}</Text>
      <Button title="Start" onPress={start} />
      <Button title="Stop" onPress={stop} />
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
