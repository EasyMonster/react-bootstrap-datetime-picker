import React, { useState } from "react";
// import { Form, Col, Button, InputGroup } from 'react-bootstrap';
import ReactDatetimePicker from "./ReactDatetimePicker";

function App() {
  const [currentValue, setCurrentValue] = useState();
  const onChange = (value) => {
    setCurrentValue(value);
  }

  return (
    <div>
      <ReactDatetimePicker label="react datetime picker" now={true} value={currentValue} onChange={value => onChange(value)} />
    </div>
  );
}

export default App;
