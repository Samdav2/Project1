import React, { useState } from 'react';
import './UserProfile.css';

export const UserProfile = () => {
  const [userInfo, setUserInfo] = useState({
    name: "Samuel David",
    email: "Samdav@example.com",
    profilePicture: "/images/profile.jpg",
    events: [
      {
        title: "Annual Conference",
        date: "2024-12-15",
        time: "9:00 AM",
        image: "/images/event1.jpg", // Example image URL
      },
      {
        title: "Networking Meetup",
        date: "2024-11-25",
        time: "6:00 PM",
        image: "/images/event2.jpg", // Example image URL
      }
    ]
  });

  return (
    <div className="profile-container">
      <div className="sidebar">
        <div className="profile-header">
          <img src={userInfo.profilePicture} alt="Profile" className="profile-picture" />
          <h2>{userInfo.name}</h2>
          <p>{userInfo.email}</p>
        </div>
        <ul className="profile-nav">
          <li><a href="#events">My Events</a></li>
          <li><a href="#calender">My Calender</a></li>
          <li><a href="#Messages">Messages</a></li>
          <li><a href="#Settings">Settings</a></li>
          <li><a href="#help">Help</a></li>
        </ul>
      </div>

      <div className="main-content">
        <h3>Upcoming Events</h3>
        <div className="events-container">
          {userInfo.events.map((event, index) => (
            <div key={index} className="event-card">
              <img src={event.image} alt={event.title} className="event-image" />
              <div className="event-info">
                <h4 className="event-title">{event.title}</h4>
                <p className="event-date-time">
                  <span className="event-date">{event.date}</span> | 
                  <span className="event-time">{event.time}</span>
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
