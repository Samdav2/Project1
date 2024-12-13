import React, { useState, useEffect } from 'react';
import './Calendar.css';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { deepPurple } from '@mui/material/colors';
import Avatar from '@mui/material/Avatar';
import PaidEvents from '../User/PaidEvents';
import PastEvents from '../User/PastEvent';
import { EventCard } from '../User/EventCard';

const Calender = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [events, setEvents] = useState([]);
  const [paidEvents, setPaidEvents] = useState([]);
  const [error, setError] = useState(null);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showPopup, setShowPopup] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);

  const fetchAllEvents = async () => {
    try {
      const response = await axios.get('https://tick-dzls.onrender.com/event/getAllEvent');
      return response.data.event || [];
    } catch (err) {
      setError(err);
      return [];
    }
  };

  const fetchPaidEvents = async () => {
    if (user?.user_id) {
      try {
        const response = await axios.get(`https://tick-dzls.onrender.com/event/getAttendedEvents?userId=${user.user_id}`);
        setPaidEvents(response.data || []);
      } catch (err) {
        setError(err);
      }
    }
  };

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const allEvents = await fetchAllEvents();
      setEvents(allEvents);
      await fetchPaidEvents();
    } catch (error) {
      setError(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (location.state) {
      const { name, email, user_id } = location.state;
      const userData = { user_id, name: name || 'Unknown', email: email || 'Not Provided' };
      setUser(userData);
      localStorage.setItem('user', JSON.stringify(userData));
    } else {
      const savedUser = localStorage.getItem('user');
      if (savedUser) {
        setUser(JSON.parse(savedUser));
      } else {
        navigate('/login');
      }
    }
  }, [location.state, navigate]);

  useEffect(() => {
    if (user?.user_id) {
      fetchData();
    }
  }, [user]);

  const handleDateChange = (newDate) => {
    setSelectedDate(newDate);
  };

  const handleEventClick = (eventId, isPaid, eventAddress) => {
    const eventDetails = events.find(event => event.id === eventId);
    setSelectedEvent(eventDetails);
    setShowPopup(true);
  };

  const handleClosePopup = () => {
    setShowPopup(false);
  };

  const handleTicketPurchase = () => {
    if (selectedEvent) {
      navigate('/get-ticket', { state: { eventId: selectedEvent.id, user_id: user.user_id } });
    }
  };

  const handleMapView = () => {
    if (selectedEvent) {
      navigate('/map', { state: { eventId: selectedEvent.id, eventAddress: selectedEvent.event_address } });
    }
  };

  const formatEventDate = (date) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(date).toLocaleDateString('en-US', options);
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="dashboard">
       <main className="content-board">
        <h1 className="main-header1">My Calendar</h1>

        {/* Calendar Section */}
        <section id="calendar">
         
          <Calendar
            onChange={handleDateChange}
            value={selectedDate}
            tileClassName={({ date, view }) => {
              const eventDate = date.toDateString();
              const hasEvent = events.some(event => new Date(event.date).toDateString() === eventDate);
              return hasEvent ? 'has-events' : null;
            }}
            onClickDay={(date) => {
              const event = events.find(event => new Date(event.date).toDateString() === date.toDateString());
              if (event) {
                handleEventClick(event.id, paidEvents.some(p => p.id === event.id), event.event_address);
              }
            }}
          />
        </section>
       <h3>Upcoming Events</h3>
        {/* Display Events */}
        <section id="events">

          <div className="event-cards">
            {events.length === 0 ? (
              <p>No upcoming events found.</p>
            ) : (
              events.map((event) => (
                <EventCard
                  key={event.id}
                  event={event}
                  onClick={() => handleEventClick(event.id, paidEvents.some(p => p.id === event.id), event.event_address)}
                />
              ))
            )}
          </div>
        </section>

        
      </main>

      {/* Popup Dialog for Event Details */}
      {showPopup && selectedEvent && (
        <>
          <div className="backdrop" onClick={handleClosePopup}></div>
          <div className="event-popup">
          {selectedEvent.picture && <img src={selectedEvent.picture} alt={selectedEvent.name} className="event-image" />}
            <h3>{selectedEvent.name}</h3>
            <p><strong>Date:</strong> {formatEventDate(selectedEvent.date)}</p>
            <p><strong>Location:</strong> {selectedEvent.event_address}</p>
            <p><strong>Description:</strong> {selectedEvent.summary}</p>
            <p><strong>Price:</strong> {selectedEvent.price ? `NGN${selectedEvent.price}` : 'Free'}</p>
            <div>
              {!paidEvents.some(p => p.id === selectedEvent.id) ? (
                <button onClick={handleTicketPurchase}>Buy Ticket</button>
              ) : (
                <button onClick={handleMapView}>View Map</button>
              )}
            </div>
            <button onClick={handleClosePopup} style={{ marginTop: 10 }}>Close</button>
          </div>
        </>
      )}
    </div>
  );
};

export default Calender;
