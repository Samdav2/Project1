import React, { useState, useEffect } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './TicketingForm.css';
import BackButton from '/src/components/Ui/BackArrow.jsx';
import Footer from '/src/components/Dashboard/Footer.jsx';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const TicketingForm = () => {
    const [events, setEvents] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const [showLoginModal, setShowLoginModal] = useState(false);
    const [selectedTicket, setSelectedTicket] = useState({ type: '', price: '' });

    const navigate = useNavigate();
    const location = useLocation();
    const { eventId: paramEventId } = useParams();

    const getEvent = import.meta.env.VITE_GET_EVENT_DETAILS;

    const savedUsers = JSON.parse(localStorage.getItem('userData1'));
    const eventId = location.state?.eventId || paramEventId;

    const [userData, setUserData] = useState({
        firstName: location.state?.name || savedUsers?.firstName || '',
        email: location.state?.email || savedUsers?.email || '',
        user_id: location.state?.user_id || savedUsers?.user_id || '',
        ticketType: '',
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${getEvent}${eventId}`);
                setEvents(response.data.event || []);
                setLoading(false);
            } catch (err) {
                setError(err);
                setLoading(false);
            }
        };

        fetchData();
    }, [getEvent, eventId]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUserData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleTicketChange = (e) => {
        const ticketType = e.target.value;
        const event = events[0] || {};
        const price =
            ticketType === 'Regular' ? event.price :
            ticketType === 'VIP' ? event.vip_price :
            ticketType === 'VVIP' ? event.vvip_price :
            ticketType === 'Regular-Free' ? '0' : '';

        setSelectedTicket({ type: ticketType, price });
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        if (!userData.user_id) {
            toast.error('You must log in to buy a ticket.');
            setShowLoginModal(true);
            return;
        }

        if (userData.firstName && userData.email && selectedTicket.type) {
            navigate('/ticket', {
                state: {
                    eventId,
                    eventName: events[0]?.event_name,
                    accountName: events[0]?.account_name,
                    accountNumber: events[0]?.account_number,
                    bank: events[0]?.bank,
                    ...userData,
                    ticketType: selectedTicket.type,
                    price: selectedTicket.price,
                },
            });
        } else {
            setError('Please fill out all required fields.');
        }
    };

    const handleLogin = () => {
        navigate('/login', { state: { eventId: paramEventId } });
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div style={{ color: 'black' }}>Network Error... Please Reload the Page</div>;

    const displayEvents = events.length > 0 ? events : [];

    return (
        <div className="body">
            <BackButton />
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
                                    <p>Regular Price: NGN{parseFloat(price || 0).toFixed(2)}</p>
                                    <p>VIP Price: NGN{parseFloat(vip_price || 0).toFixed(2)}</p>
                                    <p>VVIP Price: NGN{parseFloat(vvip_price || 0).toFixed(2)}</p>
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

            <form onSubmit={handleSubmit} className="ticketForm">
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
                            {displayEvents[0]?.price > 0 && <option value="Regular">Regular</option>}
                            {displayEvents[0]?.vip_price > 0 && <option value="VIP">VIP</option>}
                            {displayEvents[0]?.vvip_price > 0 && <option value="VVIP">VVIP</option>}
                            {displayEvents[0]?.price <= 0 &&
                                displayEvents[0]?.vip_price <= 0 &&
                                displayEvents[0]?.vvip_price <= 0 && (
                                    <>
                                        <option value="Regular-Free">Regular (Free)</option>
                                        <option value="VIP">VIP (Free)</option>
                                        <option value="VVIP">VVIP (Free)</option>
                                    </>
                                )}
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
