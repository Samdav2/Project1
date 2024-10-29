import React from 'react';
import './InputField.css';

function InputField({ label, value, onChange }) {
  return (
    <div className="input-container">
      <label className="label">{label}</label>
      <input 
        type="text" 
        value={value} 
        onChange={onChange} 
        className="input"
      />
    </div>
  );
}

export default InputField;
