import React from 'react';
import './FloatingActionButton.css';
import downarrow from '/src/assets/down-arrow.svg';

const FloatingActionButton = () => {
  return (
    <div className="fab">
      <img src={downarrow} alt="Down Arrow" className="fab-icon" />
    </div>
  );
};

export default FloatingActionButton;
