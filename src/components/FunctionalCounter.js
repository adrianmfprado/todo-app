import { useCallback, useEffect, useRef, useState } from "react";

export const FunctionalCounter = (props) => {
  const [count, setCount] = useState(1);
  const [max, setMax] = useState(1);
  const [date, setDate] = useState(new Date());

  const mounted = useRef(false);

  useEffect(() => {
    if (count === 0) {
      console.log('counter zerado!');
    }
  }, [count])

  const incrementCounter = useCallback(() => {
    setCount(count + 1)
  }, [count])

  // mount, umount e update
  useEffect(() => {
    console.log('mounted');
    window.addEventListener('mousemove', incrementCounter)
    
    return () => {
      // mounted.current = false;
      // clearInterval(interval);
    }
  }, [])

  function increment() {
    const newValue = count + 1;
    setCount(newValue);

    if (max < newValue) {
      setMax(newValue);
    }
  }

  function reset() {
    setCount(0);
  }

  return (
    <div>
      <button onClick={increment}>Incrementar</button>
      <button onClick={reset}>Zerar Contador</button>
      <div>count: {count}</div>
      <div>max: {max}</div>

      <div>hora atual: {date.toDateString()} {date.toTimeString()}</div>
    </div>
  ); 
}