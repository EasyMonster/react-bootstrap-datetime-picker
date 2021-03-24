import React, { useState } from 'react';
import './App.css';
import DateFormatter from './DateFormatter';

function App() {
  const [currentValue, setCurrentValue] = useState("");
  const onChange = (value) => {
    setCurrentValue(value);
  }
  return (
    <DateFormatter now={true} value={currentValue} onChange={value => onChange(value)} />
  );
}

export default App;
