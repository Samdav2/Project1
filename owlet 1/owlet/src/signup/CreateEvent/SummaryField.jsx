import React from 'react';
import './SummaryField.css';

const SummaryField = ({ value, onChange }) => {
  return (
    <div className="summary-field-container">
      <label htmlFor="summary" className="summary-label">Summary:-</label>
      <textarea
        id="summary"
        className="summary-input"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Enter summary here"
      />
    </div>
  );
};

export default SummaryField;
