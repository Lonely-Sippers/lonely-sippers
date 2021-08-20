import React from 'react';

export const Quantity = ({ setquant, quant }) => {
  const options = new Array(10).fill('').map((val, idx) => {
    return (
      <option key={idx + 1} value={idx + 1}>
        Qty: {idx + 1}
      </option>
    );
  });

  const onChange = (evt) => {
    setquant(evt.target.value);
  };

  return (
    <select value={quant} onChange={onChange}>
      {options}
    </select>
  );
};
