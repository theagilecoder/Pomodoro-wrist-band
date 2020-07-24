import React, {useState, useRef, useCallback} from 'react';
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

  const stop = useCallback(() => {
    if (intervalRef.current === null) {
      return;
    }
    BackgroundTimer.clearInterval(intervalRef.current);
    intervalRef.current = null;
  }, []);

  const reset = useCallback(() => {
    setCount(0);
  }, []);

  const timeout = (ms) => {
    BackgroundTimer.setTimeout(() => {
      stop();
      reset();
    }, ms);
  };

  return {count, start, stop, reset, timeout};
};

export default useCounter;
