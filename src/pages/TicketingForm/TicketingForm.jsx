import React, { useState, useEffect } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './TicketingForm.css';
import BackButton from "/src/components/Ui/BackArrow.jsx"
import Footer from "/src/components/Dashboard/Footer.jsx"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import dotenv from "dotenv"



export const TicketingForm = () => {
    const [events, setEvents] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const [showLoginModal, setShowLoginModal] = useState(false)

    const navigate = useNavigate();
    const location = useLocation();


    const eventid = useParams();

    const getEvent = import.meta.env.VITE_GET_EVENT_DETAILS


    const eventid2 = eventid?.eventId;

    const savedUsers = JSON.parse(localStorage.getItem('userData1'));

    const eventId = location.state?.eventId || eventid2;
    const [userData, setUserData] = useState({
        firstName: location.state?.name || savedUsers?.firstName,
        email: location.state?.email || savedUsers?.email,
        user_id: location.state?.user_id || savedUsers?.user_id,
        ticketType: "", 
    });

   
    console.log("UserData", userData);

    localStorage.setItem('userData1', JSON.stringify(userData));


    const [selectedTicket, setSelectedTicket] = useState({ type: "", price: "" });

    // Fetch events from the API with retry mechanism
    const fetchData = async (maxRetries = 5, retryDelay = 2000) => {
        let attempt = 0;

        while (attempt < maxRetries) {
            try {
                console.log(`Attempt ${attempt + 1} to fetch data...`);
                const response = await axios.get(`${getEvent}${eventId}`);
                console.log('Data fetched successfully:', response.data);
                setEvents(response.data.event);
                setError(null);
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
        return <div style={{color: 'black'}}> Network Error... Please Reload the Page </div>
    }

    const displayEvents = events.length > 0 ? events : [];

    // Handle form submission
    const handleSubmit = (event) => {
    event.preventDefault();

    const { firstName, email, user_id } = userData;

    if (!userData.user_id) {
        // Show error toast if user_id is null or undefined
        toast.error("You must be login to buy ticket");
        setShowLoginModal(true);
        return;  // Stop further execution
    }

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

    const handleLogin = () => {
    navigate('/login',  { state: { eventId: eventid2}})
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
        <BackButton />
            {/* Event Display Section */}
            <div>
                {displayEvents.map((event, index) => {
                    const { event_name, event_address, time_in, summary, picture, date, price, vip_price, vvip_price } = event;
                    const formattedDate = new Date(date).toLocaleDateString();
                    const formattedTime = new Date(`1970-01-01T${time_in}`).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
                    return (
                        <div className="event-section" key={index}>
                            <div className="event-card">
                                <img src={`http://app.swiftjobs.com.ng/${picture}`} alt={event_name} className="event-image" />
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
             <ToastContainer />

             {showLoginModal && (
        <div className="login-modal">
          <div className="modal-content">
            <h2>Login Required</h2>
            <p>You need to be logged in to buy a ticket.</p>
            <button onClick={handleLogin}>Login</button>
            <button onClick={() => setShowLoginModal(false)}>Cancel</button>
          </div>
        </div>
      )}

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
            <Footer />
        </div>
    );
};

export default TicketingForm;
