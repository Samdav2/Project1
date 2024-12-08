import React, { useState, useEffect } from 'react';
import './UserProfile.css';
import { useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; // Ensure axios is imported

export const UserProfile = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const [isLoading, setIsLoading] = useState(true);
    const [user, setUser] = useState(null);
    const [events, setEvents] = useState([]);  // Initialize events state
    const [error, setError] = useState(null);  // Error state for catching any errors during the fetch

    // Default upcoming and past events (they might be placeholders)
    const upcomingEvents = [
        { id: 1, title: 'Music Concert', date: '2023-12-15', location: 'City Hall', image: '/images/concert.jpeg' },
        { id: 2, title: 'Art Exhibition', date: '2023-11-20', location: 'Art Gallery', image: '/images/art.png' }
    ];

    const pastEvents = [
        { id: 3, title: 'Tech Conference', date: '2023-10-10', location: 'Convention Center', image: '/images/tech.png' },
        { id: 4, title: 'Food Festival', date: '2023-09-05', location: 'Downtown Park', image: '/images/food.png' }
    ];

    // Fetch events from the API
    const fetchData = async (maxRetries = 5, retryDelay = 2000) => {
        let attempt = 0;
        const axiosConfig = { timeout: 5000 };

        while (attempt < maxRetries) {
            try {
                console.log(`Attempt ${attempt + 1} to fetch data...`);
                const response = await axios.get('https://tick-dzls.onrender.com/event/getAllEvent', axiosConfig);
                console.log('Data fetched successfully:', response.data);
                setEvents(response.data.event);  // Set events from the API response
                setIsLoading(false);
                return;
            } catch (err) {
                attempt += 1;
                setError(err);
                console.error(`Attempt ${attempt} failed:`, err.message);

                if (err.code === 'ECONNABORTED' || err.message === 'Network Error') {
                    console.log('Network issue detected. Retrying...');
                } else if (err.response) {
                    console.error('Server error or bad response:', err.response.status);
                    setIsLoading(false);
                    return;
                } else {
                    console.error('Unknown error:', err.message);
                }

                if (attempt >= maxRetries) {
                    console.log('Max retries reached. Stopping attempts.');
                    setIsLoading(false);
                    return;
                }

                const delay = retryDelay * Math.pow(2, attempt);
                console.log(`Retrying in ${delay}ms...`);
                await new Promise((resolve) => setTimeout(resolve, delay));
            }
        }
    };

    // Fetch user data from location.state if it exists
    useEffect(() => {
        if (location.state) {
            const { name, email, user_id } = location.state;
            setUser({
                user_id,
                name: name || 'Unknown',
                email: email || 'Not Provided',
                profilePicture: 'https://via.placeholder.com/100'
            });
            setIsLoading(false);
        }
    }, [location.state]); // This will only run when location.state changes

    // Use useEffect to fetch events once the component is mounted
    useEffect(() => {
        fetchData(); // Fetch data on component mount
    }, []);

    // If loading, show loading message
    if (isLoading) {
        return <div style={{ color: 'black' }}>Loading...</div>;
    }

    // If there's an error fetching, show the error message
    if (error) {
        return <div>Error: {error.message}</div>;
    }

    const displayEvents = events.length > 0 ? events : []; // Ensure this is correctly defined

    const handleEventClick = (eventId, price) => {
        console.log("Clicked eventId:", eventId);
        console.log("Clicked price:", price);

        if (user.user_id === null) {
            navigate('/login');
        } else {
            navigate("/get-ticket", {
                state: {
                    eventId: eventId,
                    user_id: user.user_id,
                    name: user.name,
                    email: user.email,
                    phoneNo: user.phoneNo,
                    price: price
                }
            });
        }
    };

    return (
        <>
            <div className="dashboard">
                {/* Sidebar */}
                <aside className="menubar">
                    <div className="profile-info">
                        <img src={user.profilePicture} alt="Profile" className="profile-pic" />
                        <h3>{user.name}</h3>
                        <p>{user.email}</p>
                    </div>
                    <ul>
                        <li><a href="#events">My Events</a></li>
                        <li><a href="#calender">Calender</a></li>
                        <li><a href="#notifications">Notifications</a></li>
                        <li><a href="#help">Help</a></li>
                        <li>
                            <Link to="/update-user-profile" state={{ user_id: user.user_id }}>
                                Settings
                            </Link>
                        </li>
                        <li><button className="logout-btn">Logout</button></li>
                    </ul>
                </aside>

                {/* Main Content */}
                <main className="content-board">
                    <h1 className='main-header'>My Profile</h1>

                    {/* Events */}
                    <section className="events">
                        <h3><span className='eventh3'>Upcoming Events</span></h3>
                        <div className="event-cards">
                            {displayEvents.map((event, index) => {
                                const { event_name, event_address, time_in, summary, picture, price, date, id } = event;
                                const formattedDate = new Date(date).toLocaleDateString();
                                const formattedTime = new Date(`1970-01-01T${time_in}`).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

                                return (
                                    <div
                                        key={index}
                                        className="event-card"
                                        onClick={() => handleEventClick(id, price)}
                                    >
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
                                );
                            })}
                        </div>
                    </section>
                </main>
            </div>

            {/* Footer */}
            <footer className="footer">
                <p>&copy; 2024 TheOwl Initiators. All rights reserved.</p>
                <ul>
                    <li><a href="#privacy">Privacy Policy</a></li>
                    <li><a href="#terms">Terms of Service</a></li>
                    <li><a href="#contact">Contact Us</a></li>
                </ul>
            </footer>
        </>
    );
};

export default UserProfile;
