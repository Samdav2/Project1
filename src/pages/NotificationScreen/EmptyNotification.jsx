import React from 'react';
import './EmptyNotification.css';

export const EmptyNotification = () => {
    return (
        <div className="notification-container">
            <div className="notification-action-bar">
                <div className="notification-status">
                    <div className="notification-title-bar">Notification</div>
                </div>
                <div className="notification-icons">
<<<<<<< HEAD
                    
                    <img src="images/moreoption-icon.png" alt="More Options" />
=======

>>>>>>> main
                </div>
            </div>
            <div className="artwork">
                <img src="images/notification.png" alt="Notification Icon" className="bell-icon" />
                <div className="notification-count">0</div>
            </div>
            <div className="notification-title">No Notifications!</div>
            <div className="notification-description">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit sed do eiusmod tempor
            </div>
        </div>
    );
};

export default EmptyNotification;
