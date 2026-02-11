import React, { useState } from 'react';

const NumberOfEvents = ({ setCurrentNOE, setErrorAlert }) => {
  const [number, setNumber] = useState(32);

const handleChange = (e) => {
  const val = e.target.value;

  if (/^\d*$/.test(val)) {
    setNumber(val === '' ? '' : Number(val));

    const numericValue = Number(val);

    if (val === '' || numericValue <= 0) {
      setErrorAlert("Please enter a valid positive number");
    } else {
      setErrorAlert("");
      setCurrentNOE(numericValue);
    }
  }
};

  return (
    <div id="number-of-events">
      <label htmlFor="events-number-input">Number of events</label>
      <input
        id="events-number-input"
        aria-label="Number of events"
        role="textbox"
        value={number}
        onChange={handleChange}
        type="text"
      />
    </div>
  );
};

export default NumberOfEvents;