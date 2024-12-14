import React, { useState, useEffect } from 'react';
import './UserProfile.css';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { deepPurple } from '@mui/material/colors';
import Avatar from '@mui/material/Avatar';
import PaidEvents from './PaidEvents'; // Import PaidEvents component
import PastEvents from './PastEvent'; // Import the PastEvents component

// Reusable EventCard component (now in a separate file)
export const EventCard = ({ event, onClick }) => (
  <div className="event-card" onClick={onClick}>
    <img src={`https://tick-dzls.onrender.com/${event.picture}`} alt={event.event_name} className="event-image" />
    <div className="event-info">
      <h4>{event.event_name}</h4>
      <p>{event.event_address}</p>
      <p>{event.summary}</p>
      <p>Price: NGN{parseFloat(event.price).toFixed(2)}</p>
      <p>
        {new Date(event.date).toLocaleDateString()} |{' '}
        {new Date(`1970-01-01T${event.time_in}`).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
      </p>
    </div>
  </div>
);

export const UserProfile = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [events, setEvents] = useState([]); // Defaulting to empty array
  const [error, setError] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false); // State for toggling menu visibility

  // Fetch all events
  const fetchAllEvents = async () => {
    try {
      console.log("Fetching all events...");
      const response = await axios.get('https://tick-dzls.onrender.com/event/getAllEvent', { timeout: 5000 });
      return response.data.event || [];
    } catch (err) {
      setError(err);
      return [];
    }
  };

  // Fetch events and update state
  const fetchData = async () => {
    setIsLoading(true);
    try {
      const allEvents = await fetchAllEvents();
      setEvents(allEvents);
    } catch (error) {
      setError(error);
    } finally {
      setIsLoading(false); // Once all events are fetched, set loading to false
    }
  };

  // Handle user data setup and event fetching
  useEffect(() => {
    if (location.state) {
      const { name, email, user_id } = location.state;
      const userData = {
        user_id,
        name: name || 'Unknown',
        email: email || 'Not Provided',
        profilePicture: 'https://via.placeholder.com/100',
      };
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

  // Fetch data when the user is set
  useEffect(() => {
    if (user?.user_id !== undefined) {
      fetchData(); // Fetch all events
    }
  }, [user]); // Trigger fetchData when user is set or changed

  // Loading state check
  if (isLoading) return <div style={{color:"black"}}>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  // Function to get user initials
  const getInitials = (name = '') => {
    const nameParts = name.split(' ');
    return `${nameParts[0]?.[0]?.toUpperCase() || ''}${nameParts[1]?.[0]?.toUpperCase() || ''}`;
  };

  const initials = user ? getInitials(user.name) : '';

  // Handle event card click
  const handleEventClick = (eventId, price) => {
    if (!user?.user_id) navigate('/login');
    else navigate('/get-ticket', { state: { eventId, user_id: user.user_id, name: user.name, email: user.email, price } });
  };

  // Handle user logout
  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('paidEvents');
    navigate('/login');
  };

  const toggleMenu = () => setMenuOpen(!menuOpen);
  console.log(user.name);

  return (
    <>
      <div className="dashboard">
        <aside className={`menubar ${menuOpen ? 'open' : ''}`}>
          <button className="menu-toggle close" onClick={toggleMenu}>✕</button>
          <div className="profile-info1">
            <Avatar sx={{ bgcolor: deepPurple[700] }}>{initials}</Avatar>
            <h3>{user?.name}</h3>
            <p>{user?.email}</p>
          <ul>
            <li><a href="#events">My Events</a></li>

            <li><Link to="/calendar" state={{ user_id: user?.user_id, name: user?.name }}>
                Calendar</Link></li>
            <li><a href="#notifications">Notifications</a></li>
            <li><a href="#help">Help</a></li>
            <li>
              <Link to="/update-user-profile" state={{ user_id: user?.user_id }}>
                Settings
              </Link>
            </li>
            <li>
              <button className="logout-btn" onClick={handleLogout}>Logout</button>
            </li>
          </ul>
          </div>
        </aside>

        {!menuOpen && ( // Conditionally render the open button
          <button className="menu-toggle open" onClick={toggleMenu}>☰</button>
        )}

        <main className="content-board">
          <h1 className="main-header">My Profile</h1>

          {/* Display Upcoming Events */}
          <section className="events">
            <h3>Upcoming Events</h3>
            <div className="event-cards">
              {events.length === 0 ? (
                <p>No upcoming events found.</p>
              ) : (
                events.map((event, index) => (
                  <EventCard key={index} event={event} onClick={() => handleEventClick(event.id, event.price)} />
                ))
              )}
            </div>
          </section>

          {/* Display Paid Events */}
          {user?.user_id && <PaidEvents userId={user.user_id} />}

          {/* Display Past Events */}
          <PastEvents userId={user?.user_id} allEvents={events} />
        </main>
      </div>
    </>
  );
};

export default UserProfile;
