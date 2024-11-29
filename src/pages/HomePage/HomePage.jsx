import React from 'react';
import './MainPage';
import owlLogo from './owl-1.svg';
import owlParty from './owl-party.svg';
import './HomePage.css';

 const MainPage = () => {
  return (
    <div className="main-page">
      {/* Header Section */}
      <header className="header">
        <img src={owlLogo} alt="Owl Logo" className="header-logo" />
        <nav className="header-nav">
          <a href="#home">Home</a>
          <a href="#profile">Profile</a>
          <a href="#event">Event</a>
          <a href="#about">About</a>
        </nav>
        <button className="header-button">Sign in / Sign up</button>
      </header>

      {/* Main Content */}
      <div className="main-content">
        <h1 className="main-title">The biggest campus ticketing website in Africa</h1>

        <div className="event-section">
          <h2>Upcoming Event</h2>
          <input type="text" placeholder="Search for events" className="event-search" />
          <button className="search-button">Search</button>

          <div className="event-info">
            <img src={owlParty} alt="Owl Party" className="event-image" />
            <div className="event-details">
              <h3>Xclusive nyte art</h3>
              <p>Friday, October 25th 2024<br/>
                 4:00 PM - 12:00 AM WAT<br/>
                 Eden Bodija
              </p>
              <p>Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old.</p>
              <button className="ticket-button">Get ticket</button>
              <button className="contact-button">Contact</button>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-content">
          <div className="footer-column">
            <p>Company</p>
            <a href="#aboutus">About us</a>
            <a href="#how-works">How owl works</a>
            <a href="#blog">Blog</a>
          </div>
          <div className="footer-column">
            <p>Follow Us</p>
            <a href="#instagram">Instagram</a>
            <a href="#tiktok">Tiktok</a>
            <a href="#twitter">X (Twitter)</a>
          </div>
          <p>
            Owl is an event ticketing platform for memorable experiences in Africa.
            Sign up to our newsletter to receive information about upcoming events.
          </p>
          <button className="subscribe-button">Subscribe</button>
        </div>
      </footer>
    </div>
  );
};

export default MainPage;
