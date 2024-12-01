import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './TicketingForm.css';

export const TicketingForm = () => {
    const [events, setEvents] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    const navigate = useNavigate();
    const location = useLocation();

    // Extract event and user data from location.state
    const eventId = location.state?.eventId || null;
    const [userData, setUserData] = useState({
        firstName: location.state.name,
        email: location.state.email,
        user_id: location.state.user_id,
       //ticketType: '',  // Ticket type will be selected in the form
    });

    // Fetch events from the API with retry mechanism
    const fetchData = async (maxRetries = 5, retryDelay = 2000) => {
        let attempt = 0;
        const axiosConfig = { timeout: 5000 };

        while (attempt < maxRetries) {
            try {
                console.log(`Attempt ${attempt + 1} to fetch data...`);
                const response = await axios.get(`https://tick-dzls.onrender.com/event/getEvent?eventId=${eventId}`);
                console.log('Data fetched successfully:', response.data);
                setEvents(response.data.event);
                setLoading(false);
                return;
            } catch (err) {
                attempt += 1;
                setError(err);
                console.error(`Attempt ${attempt} failed:`, err.message);

                if (err.code === 'ECONNABORTED' || err.message === 'Network Error') {
                    console.log('Network issue detected. Retrying...');
                } else if (err.response) {
                    console.error('Server error or bad response:', err.response.status);
                    setLoading(false);
                    return;
                } else {
                    console.error('Unknown error:', err.message);
                }

                if (attempt < maxRetries) {
                    const delay = retryDelay * Math.pow(2, attempt);
                    console.log(`Retrying in ${delay}ms...`);
                    await new Promise((resolve) => setTimeout(resolve, delay));
                } else {
                    console.log('Max retries reached. Stopping attempts.');
                    setLoading(false);
                }
            }
        }
    };

    useEffect(() => {
        fetchData(); // Fetch data when component mounts
    }, []); // Empty dependency array ensures it runs once

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    const displayEvents = events.length > 0 ? events : [];

    // Handle form submission
    const handleSubmit = (event) => {
        event.preventDefault();

        // Ensure that the ticket type is selected
        const { firstName, email, user_id} = userData;

        if (firstName && email) {
            // Send the form data and event data to the /ticket page
            navigate('/ticket', {
                state: {
                    eventId: eventId,               // Pass the event ID
                    eventName: displayEvents[0]?.event_name, // Event name
                    name: firstName,                 // Full name from userData
                    email,
                    user_id                          // Email from userData
                }
            });
        } else {
            setError('Please fill out all required fields.');
        }
    };

    // Handle input changes in the form
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUserData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    return (
        <div className="body">
            {/* Event Display Section */}
            <div>
                {displayEvents.map((event, index) => {
                    const { event_name, event_address, time_in, summary, picture, price, date } = event;
                    const formattedDate = new Date(date).toLocaleDateString();
                    const formattedTime = new Date(`1970-01-01T${time_in}`).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
                    return (
                        <div className="event-section" key={index}>
                            <div className="event-card">
                                <img src={`https://tick-dzls.onrender.com/${picture}`} alt={event_name} className="event-image" />
                                <div className="event-info">
                                    <h4 className="event-title">{event_name}</h4>
                                    <p className="event-address">{event_address}</p>
                                    <p className="event-summary">{summary}</p>
                                    <p className="event-price">Price: ${parseFloat(price).toFixed(2)}</p>
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

            <h1 className="form-title">Event Registration Form</h1>
            <h2 className="section-title">Attendee Information</h2>
            <p className="instruction">Please fill in the correct information</p>

            {/* Registration Form */}
            <form onSubmit={handleSubmit}>
                <div className="form-section">
                    <div className="form-group">
                        <label>Full Name</label>
                        <input
                            type="text"
                            placeholder="Full Name"
                            name="firstName"
                            value={userData.firstName}
                            onChange={handleInputChange}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label>Email Address</label>
                        <input
                            type="email"
                            placeholder="Email"
                            name="email"
                            value={userData.email}
                            onChange={handleInputChange}
                            required
                        />
                    </div>

                   {/* <div className="form-group">
                        <label>Ticket Type</label>
                        <select
                            name="ticketType"
                            value={userData.ticketType}
                            onChange={handleInputChange}
                            required
                        >
                            <option value="">Select Type</option>
                            <option value="Regular">Regular</option>
                            <option value="VIP">VIP</option>
                            <option value="VVIP">VVIP</option>
                        </select>
                    </div> */}

                    <button type="submit" className="submit-button">Submit</button>
                </div>
            </form>
        </div>
    );
};

export default TicketingForm;
