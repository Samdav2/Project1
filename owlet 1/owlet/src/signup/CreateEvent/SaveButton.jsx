import React from 'react';
import './SaveButton.css';

function SaveButton() {
  return (
    <button className="save-button">
      <span className="save-button-text">SAVE</span>
      <img 
        src="https://placeholder.pics/svg/30x30" 
        alt="arrow"
        className="save-button-icon"
      />
    </button>
  );
}

export default SaveButton;
