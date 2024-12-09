import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { EventCard } from './EventCard'; // Import the EventCard from the new file
import './PastEvent.css'

const PastEvents = ({ userId, allEvents }) => {
  const [activeTab, setActiveTab] = useState('all'); // Tab to show all or paid events
  const [pastEvents, setPastEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const currentDate = new Date();

  // Filter events into past and upcoming events based on current date
  const filterPastEvents = (events) => {
    return events.filter((event) => {
      const eventDate = new Date(event.date);
      return eventDate < currentDate;
    });
  };

  // Fetch paid events
  const getPaidEvents = async () => {
    if (!userId) return;

    try {
      const response = await axios.get(`https://tick-dzls.onrender.com/event/getAttendedEvents?userId=${userId}`);
      return response.data || [];
    } catch (err) {
      setError(err);
      return [];
    }
  };

  // Tab switch handler
  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  // Fetch events when component mounts
  useEffect(() => {
    if (allEvents) {
      setPastEvents(filterPastEvents(allEvents)); // Get past events
      setIsLoading(false);
    }
  }, [allEvents]);

  if (isLoading) return <div>Loading past events...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <section className="events">
      {/* Tab buttons */}
      <div className="tabs">
        <button onClick={() => handleTabChange('all')} className={activeTab === 'all' ? 'active' : ''}>
          All Past Events
        </button>
        <button onClick={() => handleTabChange('paid')} className={activeTab === 'paid' ? 'active' : ''}>
          Paid Past Events
        </button>
      </div>

      <h3>{activeTab === 'all' ? 'Past Events' : 'Paid Past Events'}</h3>

      <div className="event-cards">
        {activeTab === 'all' ? (
          pastEvents.length > 0 ? (
            pastEvents.map((event, index) => (
              <EventCard key={index} event={event} onClick={() => console.log(`Event clicked: ${event.id}`)} />
            ))
          ) : (
            <p>No past events found.</p>
          )
        ) : (
          pastEvents.filter(event => event.isPaid).map((event, index) => (
            <EventCard key={index} event={event} onClick={() => console.log(`Paid event clicked: ${event.id}`)} />
          ))
        )}
      </div>
    </section>
  );
};

export default PastEvents;
