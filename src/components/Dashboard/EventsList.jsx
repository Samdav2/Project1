import React from "react";
import './EventsList.css'

const EventsList = () => {
  const events = [
    { id: 1, name: "Tech Conference 2024", date: "2024-12-01" },
    { id: 2, name: "Art Expo", date: "2024-12-10" },
  ];

  return (
    <div className="events-list">
      <h3>My Events</h3>
      <ul>
        {events.map((event) => (
          <li key={event.id}>
            {event.name} - {event.date}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default EventsList;
