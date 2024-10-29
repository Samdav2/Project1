import React from 'react';
import './styles/Header.css';

const Header = () => {
  return (
    <div className="header">
      <div className="status-bar">
        <span className="time-text">9:41</span>
        <div className="icons">
          <img
            src="https://placeholder.pics/svg/29x11"
            alt="Cellular Connection"
            className="icon"
          />
          <img src="https://placeholder.pics/svg/26x11" alt="WiFi" className="icon" />
          <img src="https://placeholder.pics/svg/24x11" alt="Battery" className="icon" />
        </div>
      </div>
      <div className="back-button">
        <img src="https://placeholder.pics/svg/20x20" alt="Back Button" className="back-icon" />
        <span className="back-text">Back</span>
      </div>
    </div>
  );
};

export default Header;
