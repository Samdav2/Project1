import React from 'react';
import './styles/NavigationDots.css';

const NavigationDots = ({ total, currentIndex }) => {
  return (
    <div className="navigation-dots">
      {[...Array(total)].map((_, index) => (
        <span key={index} className={`dot ${index === currentIndex ? 'active' : ''}`} />
      ))}
    </div>
  );
};

export default NavigationDots;
