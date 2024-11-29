import React from 'react';
import './NotificationPage.css';

export const NotificationPage = () => {
  function ActionBarTitle() {
    return (
      <div className="action-bar">
          <div className="title-bar">
            <span className="title">Notification</span>
         </div>
      </div>
    );
  }

  function NotificationItem({ name, action, time }) {
    return (
      <div className="notification-item">
        <img
          src="images/female.png"
          alt="User Avatar"
          className="avatar"
        />
        <div className="notification-content">
          <div className="notification-header">
            <span className="user-name">{name}</span>
            <span className="action-text">{action}</span>
          </div>
          <div className="time">{time}</div>
        </div>
      </div>
    );
  }

  function ActionButtons({ hasButtons }) {
    return hasButtons ? (
      <div className="group-container">
        <div className="reject-group">
          <span className="reject-text">Reject</span>
        </div>
        <div className="accept-group">
          <span className="accept-text">Accept</span>
        </div>
      </div>
    ) : null;
  }

  const notifications = [
    { name: 'David Silbia', action: 'Invite Jo Malone London’s Mother’s', time: 'Just now', hasButtons: true },
    { name: 'Adnan Safi', action: 'Started following you', time: '5 min ago', hasButtons: false },
    { name: 'Joan Baker', action: 'Invite A virtual Evening of Smooth Jazz', time: '20 min ago', hasButtons: true },
    { name: 'Ronald C. Kinch', action: 'Like your events', time: '1 hr ago', hasButtons: false },
    { name: 'Clara Tolson', action: 'Join your Event Gala Music Festival', time: '9 hr ago', hasButtons: false },
    { name: 'Jennifer Fritz', action: 'Invite you International Kids Safe', time: 'Tue, 5:10 pm', hasButtons: true },
    { name: 'Eric G. Prickett', action: 'Started following you', time: 'Wed, 3:30 pm', hasButtons: false }
  ];

  return (
    <div className="app">
      <ActionBarTitle />
      {notifications.map((notification, index) => (
        <div key={index} className="notification-item-container">
          <NotificationItem
            name={notification.name}
            action={notification.action}
            time={notification.time}
          />
          <ActionButtons hasButtons={notification.hasButtons} />
        </div>
      ))}
    </div>
  );
};

export default NotificationPage;


