import React from 'react';
import './LandingPage';

export const LandingPage = () => {
  return (
    <div className="app">
      <header className="header">
        <h1 className="logo">TicketMaster</h1>
        <nav className="nav">
          <ul>
            <li>Home</li>
            <li>Events</li>
            <li>About Us</li>
            <li>Contact</li>
          </ul>
        </nav>
      </header>
      <main className="main-content">
        <section className="hero">
          <h2>Find Your Next Adventure!</h2>
          <p>Discover the best events happening near you.</p>
          <button className="cta-button">Browse Events</button>
        </section>
        <section className="events">
          <h2>Upcoming Events</h2>
          <div className="event-card">
            <h3>Concert in the Park</h3>
            <p>Date: July 15, 2023</p>
            <p>Location: Central Park</p>
            <button className="cta-button">Buy Tickets</button>
          </div>
          <div className="event-card">
            <h3>Art Expo</h3>
            <p>Date: August 20, 2023</p>
            <p>Location: Downtown Gallery</p>
            <button className="cta-button">Buy Tickets</button>
          </div>
          <div className="event-card">
            <h3>Food Festival</h3>
            <p>Date: September 10, 2023</p>
            <p>Location: City Square</p>
            <button className="cta-button">Buy Tickets</button>
          </div>
        </section>
      </main>
      <footer className="footer">
        <p>&copy; 2023 TicketMaster. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default LandingPage;

