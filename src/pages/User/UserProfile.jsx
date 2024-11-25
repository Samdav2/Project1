import React from 'react';
import './UserProfile.css';
import { useLocation } from 'react-router-dom';

export const UserProfile = () => {
    const location = useLocation();
    const {name, email } = location.state || {};
    const user = {
        name: name,
        email: email,
        profilePicture: 'https://via.placeholder.com/100' // Placeholder image
    };

    const upcomingEvents = [
        { id: 1, title: 'Music Concert', date: '2023-12-15', location: 'City Hall', image: '/images/concert.jpeg' },
        { id: 2, title: 'Art Exhibition', date: '2023-11-20', location: 'Art Gallery', image: 'https://via.placeholder.com/200' }
    ];

    const pastEvents = [
        { id: 3, title: 'Tech Conference', date: '2023-10-10', location: 'Convention Center', image: 'https://via.placeholder.com/200' },
    { id: 4, title: 'Food Festival', date: '2023-09-05', location: 'Downtown Park', image: 'https://via.placeholder.com/200' }
    ];

    return (


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
                    <li><a href="#settings">Settings</a></li>
                    <li><button className="logout-btn">Logout</button></li>
                </ul>
            </aside>

            {/* Main Content */}
            <main className="content">
                <h1>Event Management Dashboard</h1>

                {/* Upcoming Events */}
                <section id="upcoming-events" className="events upcoming-events">
                    <h2>Upcoming Events</h2>
                    {upcomingEvents.length > 0 ? (
                        <ul>
                            {upcomingEvents.map(event => (
                                <li key={event.id}>
                                    <img src={event.image} alt={event.title} className="event-image" />
                                    <h3>{event.title}</h3>
                                    <p>Date: {new Date(event.date).toLocaleDateString()}</p>
                                    <p>Location: {event.location}</p>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p>No upcoming events.</p>
                    )}
                </section>

                {/* Past Events */}
                <section id="past-events" className="events past-events">
                    <h2>Past Events</h2>
                    {pastEvents.length > 0 ? (
                        <ul>
                            {pastEvents.map(event => (
                                <li key={event.id}>
                                    <img src={event.image} alt={event.title} className="event-image" />
                                    <h3>{event.title}</h3>
                                    <p>Date: {new Date(event.date).toLocaleDateString()}</p>
                                    <p>Location: {event.location}</p>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p>No past events.</p>
                    )}
                </section>
            </main>

            {/* Footer */}
            <footer className="footer">
                <p>&copy; 2024 TheOwl Initiators. All rights reserved.</p>
                <ul>
                    <li><a href="#privacy">Privacy Policy</a></li>
                    <li><a href="#terms">Terms of Service</a></li>
                    <li><a href="#contact">Contact Us</a></li>
                </ul>
            </footer>
        </div>
    );
};

export default UserProfile;
