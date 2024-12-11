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
        firstName: location.state.name || "",
        email: location.state.email || "",
        user_id: location.state.user_id || "",
        ticketType: "", // Ticket type to be selected by the user
    });

    const [selectedTicket, setSelectedTicket] = useState({ type: "", price: "" });

    // Fetch events from the API with retry mechanism
    const fetchData = async (maxRetries = 5, retryDelay = 2000) => {
        let attempt = 0;

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
    }, []);

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

        const { firstName, email, user_id } = userData;

        if (firstName && email && selectedTicket.type) {
            navigate('/ticket', {
                state: {
                    eventId,
                    eventName: displayEvents[0]?.event_name,
                    accountName: displayEvents[0]?.account_name,
                    accountNumber: displayEvents[0]?.account_number,
                    bank: displayEvents[0]?.bank,
                    name: firstName,
                    email,
                    user_id,
                    ticketType: selectedTicket.type,
                    price: selectedTicket.price,
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

    // Handle ticket selection
    const handleTicketChange = (e) => {
        const ticketType = e.target.value;
        let ticketPrice = "";

        if (ticketType === "Regular") {
            ticketPrice = displayEvents[0]?.price;
        } else if (ticketType === "VIP") {
            ticketPrice = displayEvents[0]?.vip_price;
        } else if (ticketType === "VVIP") {
            ticketPrice = displayEvents[0]?.vvip_price;
        }

        setSelectedTicket({ type: ticketType, price: ticketPrice });
    };

    return (
        <div className="body">
            {/* Event Display Section */}
            <div>
                {displayEvents.map((event, index) => {
                    const { event_name, event_address, time_in, summary, picture, date, price, vip_price, vvip_price } = event;
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
                                    <p>Regular Price: NGN{parseFloat(price).toFixed(2)}</p>
                                    <p>VIP Price: NGN{parseFloat(vip_price).toFixed(2)}</p>
                                    <p>VVIP Price: NGN{parseFloat(vvip_price).toFixed(2)}</p>
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

            {/* Registration Form */}
            <form onSubmit={handleSubmit} className='ticketForm'>


                <div className="form-section">

                    <h1 className="form-title">Event Registration Form</h1>
                    <h2 className="section-title">Attendee Information</h2>
                    <p className="instruction">Please fill in the correct information</p>
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

                    <div className="form-group">
                        <label>Ticket Type</label>
                        <select
                            name="ticketType"
                            value={selectedTicket.type}
                            onChange={handleTicketChange}
                            required
                        >
                            <option value="">Select Type</option>
                            <option value="Regular">Regular</option>
                            <option value="VIP">VIP</option>
                            <option value="VVIP">VVIP</option>
                        </select>
                    </div>

                    <button type="submit" className="submit-button">Submit</button>
                </div>
            </form>
        </div>
    );
};

export default TicketingForm;
