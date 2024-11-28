import React from 'react';
import './TicketingForm.css';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';

export const TicketingForm = () => {


    const [events, setEvents] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    const navigate = useNavigate();  // Initialize navigate hook for routing
    const location = useLocation();

    console.log(location.state.eventId);

    // Correcting the conditional state for user
    const userId = location.state?.user_id || null; // If id is not in location.state, fallback to null
    const [user, setUser] = useState({
      user_id: userId,
      eventId: location.state.eventId
    });

    // Fetch events from the API with retry mechanism
    const fetchData = async (maxRetries = 5, retryDelay = 2000) => {
      let attempt = 0;
      const axiosConfig = { timeout: 5000 }; // Set a timeout to handle server not responding

      while (attempt < maxRetries) {
        try {
            console.log(`Attempt ${attempt + 1} to fetch data...`);
            const response = await axios.get(`https://tick-dzls.onrender.com/event/getEvent?eventId=${user.eventId}`);
            console.log('Data fetched successfully:', response.data);
            setEvents(response.data.event); // Set events from API response (assuming the data is under 'event' key)
            setLoading(false);
          return; // Exit if successful
        } catch (err) {
          attempt += 1;
          setError(err);
          console.error(`Attempt ${attempt} failed:`, err.message);

          // Check if the error is network related
          if (err.code === 'ECONNABORTED' || err.message === 'Network Error') {
            console.log('Network issue detected. Retrying...');
          } else if (err.response) {
            // If it's a server error, stop retrying
            console.error('Server error or bad response:', err.response.status);
            setLoading(false);
            return;
          } else {
            console.error('Unknown error:', err.message);
          }

          // If retries are exhausted or the error isn't network related, stop retrying
          if (attempt >= maxRetries) {
            console.log('Max retries reached. Stopping attempts.');
            setLoading(false);
            return;
          }

          // Delay between retries
          const delay = retryDelay * Math.pow(2, attempt); // Optional exponential backoff
          console.log(`Retrying in ${delay}ms...`);
          await new Promise((resolve) => setTimeout(resolve, delay));
        }
      }
    };

    useEffect(() => {
      fetchData(); // Fetch data on component mount
    }, []); // Empty dependency array ensures it runs once

    // Show loading state
    if (loading) {
      return <div>Loading...</div>;
    }

    // Show error if it exists
    if (error) {
      return <div>Error: {error.message}</div>;
    }

    // Render events - If no events are fetched, fall back to an empty array or static data
    const displayEvents = events.length > 0 ? events : [];


    // Handle event card click

    return (
        <div className='body'>

<div>
          {displayEvents.map((event, index) => {
            const { event_name, event_address, time_in, summary, picture, price, date, event_id } = event; // Added event_id for the purchase link
            const formattedDate = new Date(date).toLocaleDateString(); // Format date
            const formattedTime = new Date(`1970-01-01T${time_in}`).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }); // Format time
            return (
              <div className='event-section'>
              <div
                key={index}
                className="event-card"
                //onClick={() => handleEventClick(event_id)} // Handle click on event card
              >
                <img src={`https://tick-dzls.onrender.com/${picture}`} alt={event_name} className="event-image" />
                <div className="event-info">
                  <h4 className="event-title">{event_name}</h4>
                  <p className="event-address">{event_address}</p>
                  <p className="event-summary">{summary}</p>
                  {/* Removed the category */}
                  <p className="event-price">Price: ${parseFloat(price).toFixed(2)}</p> {/* Displaying price with proper formatting */}
                  <p className="event-date-time">
                    <span className="event-date">{formattedDate}</span> |
                    <span className="event-time">{formattedTime}</span>
                  </p>
                </div>
              </div>
              </div>
            );
          })}
        </div>

        <div className="container">
            <h1 className="form-title">Event Registration Form</h1>
            <h2 className="section-title">Attendee Information</h2>
            <p className="instruction">Please fill in the correct information</p>
            <div className="form-section">
                <div className="form-group">
                    <label>Full Name</label>
                    <input type="text" placeholder="First Name" />
                    <input type="text" placeholder="Last Name" />
                </div>
                <div className="form-group">
                    <div className="check">
                        <label>Gender :-</label>
                        <span>   M</span>
                        <input type="checkbox" />
                        <span>  F</span>
                        <input type="checkbox" />
                    </div>

                </div>
                <div className="form-group">
                    <label>Email Address </label>
                    <input type="text" placeholder="enter your email here" />
                </div>
                <div className="form-group">
                    <label>Phone Number </label>
                    <input type="text" placeholder="(+234) 000 000" />
                    <p className="note">please enter a valid phone number</p>
                </div>
                <div className="form-group">
                  <label>Tickets </label>
                        <span className="label"></span>
                        <select name="" id="">
                            <option value=""> Select type</option>
                            <option value=""> Regular  </option>
                            <option value=""> VIP </option>
                            <option value="">VVIP</option>
                        </select>


                </div>
                <div className="form-group">
                    <p>Would you like to be updated about upcoming events?</p>
                    <label>
                        <input type="radio" name="updates" />
                        Yes
                    </label>
                    <label>
                        <input type="radio" name="updates" />
                        No
                    </label>
                </div>
            </div>
            <button className="submit-button">SUBMIT</button>

        </div>

    </div>
    );
};

export default TicketingForm;
