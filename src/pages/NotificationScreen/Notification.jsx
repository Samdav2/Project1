import React from 'react';
import './Notification.css';

const Notification = () => {
    return (
        <div className="notification-screen">
            <div className="status-bar">
                <img src="https://placeholder.pics/svg/375x44" alt="Status Bar" />
            </div>
            <div className="action-bar">
                <img src="https://placeholder.pics/svg/22x22" alt="Back Arrow" className="back-arrow" />
                <span className="title">Notification</span>
                <img src="https://placeholder.pics/svg/22x22" alt="More" className="more-icon" />
            </div>
            <div className="notification-list">
                {notifications.map((notification, index) => (
                    <div key={index} className="notification-item">
                        <img src={`https://placeholder.pics/svg/45x45?text=Avatar+${index+1}`} alt="Avatar" className="avatar" />
                        <div className="notification-text">
                            <span className="notification-content">{notification.content}</span>
                            <span className="notification-time">{notification.time}</span>
                        </div>
                        {notification.showActions && (
                            <div className="notification-actions">
                                <button className="reject-button">Reject</button>
                                <button className="accept-button">Accept</button>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

const notifications = [
    { content: "David Silbia Invite Jo Malone London’s Mother’s", time: "Just now", showActions: true },
    { content: "Adnan Safi Started following you", time: "5 min ago", showActions: false },
    { content: "Joan Baker Invite A virtual Evening of Smooth Jazz", time: "20 min ago", showActions: true },
    { content: "Ronald C. Kinch Like your events", time: "1 hr ago", showActions: false },
    { content: "Clara Tolson Join your Event Gala Music Festival", time: "9 hr ago", showActions: false },
    { content: "Jennifer Fritz Invite you International Kids Safe", time: "Tue, 5:10 pm", showActions: true },
    { content: "Eric G. Prickett Started following you", time: "Wed, 3:30 pm", showActions: false },
];

export default Notification;
