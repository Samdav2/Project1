import React from 'react';
import './NotificationComponent.css';

const NotificationComponent = () => {
    return (
        <div className="notification-container">
            <div className="notification-action-bar">
                <div className="notification-status">
                    <div className="back-icon"></div>
                    <div className="notification-title-bar">Notification</div>
                </div>
                <div className="notification-icons">
                    <img src="https://placeholder.pics/svg/22x22" alt="More Options" />
                </div>
            </div>
            <div className="artwork">
                <img src="https://placeholder.pics/svg/177x219" alt="Notification Icon" className="bell-icon" />
                <div className="notification-count">0</div>
            </div>
            <div className="notification-title">No Notifications!</div>
            <div className="notification-description">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit sed do eiusmod tempor
            </div>
        </div>
    );
};

export default NotificationComponent;