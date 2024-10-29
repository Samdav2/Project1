import React from 'react';
import './styles/EventCard.css';

const EventCard = ({ title, date, description, imageUrl }) => {
  return (
    <div className="event-card">
      <img src={imageUrl} alt={title} className="event-image" />
      <div className="event-content">
        <h2 className="event-title">{title}</h2>
        <p className="event-date">{date}</p>
        <p className="event-description">{description}</p>
      </div>
    </div>
  );
};

export default EventCard;
