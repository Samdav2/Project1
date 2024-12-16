import React, { useState, useEffect } from 'react';
import './Calendar.css';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { deepPurple } from '@mui/material/colors';
import Avatar from '@mui/material/Avatar';
import { EventCard } from '../User/EventCard';
import { toast } from 'react-toastify';
import BackButton from "/src/components/Ui/BackArrow.jsx"
import Footer from "/src/components/Dashboard/Footer.jsx"
import dotenv from "dotenv"

const Calender = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const { name, email, user_id } = location.state;

  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState({
    name:name
  });
  const [events, setEvents] = useState([]);
  const [paidEvents, setPaidEvents] = useState([]);
  const [error, setError] = useState(null);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showPopup, setShowPopup] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);

  const allEvent = import.meta.env.VITE_GET_ALL_EVENT
  const userEvent = import.meta.env.VITE_GET_ATTENDED_EVENT
  // Fetching all events
  const fetchAllEvents = async () => {
    try {
      const response = await axios.get(allEvent);
      return response.data.event || [];
    } catch (err) {
      setError(err);
      return [];
    }
  };
const fetchPaidEvents = async () => {
  if (user?.user_id) {
    try {
      const response = await axios.get(`${userEvent}${user.user_id}`);
      console.log("Error Message", response.data.message);
      
      if (response.data.message === "User has not attended any event") {
        console.log("Error Message", response.data.message)
        toast.error("You have not paid for any event")
        setPaidEvents([]); 
        setError("You have no paid active event at the moment");
        return([]);
      } else if (response.status === 200 && response.data.length > 0) {
        setPaidEvents(response.data || []);
        setError(""); 
      } else {
        setError(`Unexpected response: ${response.status}`);
        return([]);
      }
    } catch (err) {
      setPaidEvents([]);  
      setError("Failed to load paid events");  
      console.error("Error loading paid events:", err);
    }
  } else {
    setError("User not found or user_id is missing.");
  }
};

const getInitials = (name = '') => {
    const nameParts = name.split(' ');
    return `${nameParts[0]?.[0]?.toUpperCase() || ''}${nameParts[1]?.[0]?.toUpperCase() || ''}`;
  };

  const initials = user ? getInitials(user.name) : '';

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

  // Handling event click
  const handleEventClick = (eventId) => {
    const eventDetails = events.find(event => event.id === eventId);
    setSelectedEvent(eventDetails);
    setShowPopup(true);
  };

  const handleClosePopup = () => {
    setShowPopup(false);
  };

  const handleTicketPurchase = () => {
    if (selectedEvent) {
      navigate(`/get-ticket/${selectedEvent.id}`, { state: { eventId: selectedEvent.id, user_id: user.user_id, name: user.name, email: user.email } });
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

  if (isLoading) return <div style={{color:"black"}}>Loading...</div>;
  if (error) return <div style={{color: 'black'}}> Network Error... Please Reload the Page </div>

  // Add events to calendar tiles
  const tileClassName = ({ date, view }) => {
    const eventDate = date.toDateString();
    const hasEvent = events.some(event => new Date(event.date).toDateString() === eventDate);
    return hasEvent ? 'has-events' : null;
  };

  return (
    <div className="dashboard">
      <main className="content-board">
      <BackButton />
      <Avatar sx={{ bgcolor: deepPurple[700] }}>{initials}</Avatar>
        <h1 className="main-header1">My Calendar</h1>

        {/* Calendar Section */}
        <section id="calendar">
          <Calendar
            onChange={handleDateChange}
            value={selectedDate}
            tileClassName={tileClassName}
            onClickDay={(date) => {
              const event = events.find(event => new Date(event.date).toDateString() === date.toDateString());
              if (event) {
                handleEventClick(event.id);
              }
            }}
          />
        </section>

        {/* Display Upcoming Events */}
        <h3>Upcoming Events</h3>
        <section id="events">
          <div className="event-cards">
            {events.length === 0 ? (
              <p>No upcoming events found.</p>
            ) : (
              events.map((event) => (
                <EventCard
                  key={event.id}
                  event={event}
                  onClick={() => handleEventClick(event.id)}
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
            {selectedEvent.picture && <img src={`ttp://app.swiftjobs.com.ng/${selectedEvent.picture}`} alt={selectedEvent.event_name} className="event-image" />}
            <h3>{selectedEvent.event_name}</h3>
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
      <Footer />
    </div>
  );
};

export default Calender;
