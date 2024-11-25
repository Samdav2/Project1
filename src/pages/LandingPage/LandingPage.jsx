import React from 'react';
import './LandingPage.css';

export const LandingPage = () => {
  // Sample event data, with one additional event
  const events = [
    {
      title: "Annual Conference 2024",
      date: "2024-12-15",
      time: "9:00 AM",
      image: "/images/annual.png", // Example event image
    },
    {
      title: "Networking Meetup",
      date: "2024-11-25",
      time: "6:00 PM",
      image: "/images/meetup.png", // Example event image
    },
    {
      title: "Charity Gala",
      date: "2024-11-30",
      time: "7:30 PM",
      image: "/images/charity.png", // Example event image
    },
    {
      title: "Block Party 2024",
      date: "2024-12-20",
      time: "8:00 PM",
      image: "/images/block.png", // Example event image
    }
  ];

  return (
    <div className="homepage">
      {/* Header Section */}
      <header className="header">
        <div className="logo">
          <h1>TheOwl_Initiators</h1>
        </div>
        <nav className="navigation">
          <ul>
            <li><a href="#home">Home</a></li>
            <li><a href="#services">Services</a></li>
            <li><a href="#events">Events</a></li>
            <li><a href="#signUp">SignUp</a></li>
            <li><a href="#about">About Us</a></li>
            <li><a href="#contact">Contact</a></li>
          </ul>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="hero">
        <h2>Welcome to TheOwl_Initiators</h2>
        <p>Your trusted partner in innovation and event management</p>
        <button className="cta-button">Get Started</button>
      </section>

      {/* Services Section */}
      <section className="services" id="services">
        <h3>Our Services</h3>
        <div className="service-cards">
          <div className="service-card">
            <h4>Event Planning</h4>
            <p>Expert event management services for seamless experiences.</p>
          </div>
          <div className="service-card">
            <h4>Consulting</h4>
            <p>Professional consulting services to bring your ideas to life.</p>
          </div>
          <div className="service-card">
            <h4>Brand Strategy</h4>
            <p>Develop your brand with our proven strategies for success.</p>
          </div>
        </div>
      </section>

      {/* Upcoming Events Section */}
      <section className="events" id="events">
        <h3>Upcoming Events</h3>
        <div className="event-cards">
          {events.map((event, index) => (
            <div key={index} className="event-card">
              <img src={event.image} alt={event.title} className="event-image" />
              <div className="event-info">
                <h4 className="event-title">{event.title}</h4>
                <p className="event-date-time">
                  <span className="event-date">{event.date}</span> | 
                  <span className="event-time">{event.time}</span>
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* About Us Section */}
      <section className="about" id="about">
        <h3>About Us</h3>
        <p>TheOwl_Initiators is a leader in event management and consulting. We focus on delivering high-quality solutions and ensuring every project runs smoothly.</p>
      </section>

      {/* Contact Section */}
      <section className="contact" id="contact">
        <h3>Contact Us</h3>
        <p>Have any questions? Reach out to us for more information.</p>
        <form className="contact-form">
          <input type="text" placeholder="Your Name" required />
          <input type="email" placeholder="Your Email" required />
          <textarea placeholder="Your Message" required></textarea>
          <button type="submit">Send Message</button>
        </form>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="social-links">
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">Facebook</a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">Twitter</a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">Instagram</a>
          <a href="https://WhatApp.com" target="_blank" rel="noopener noreferrer">WhatApp</a>
        </div>
        <p>&copy; 2024 TheOwl_Initiators. All Rights Reserved.</p>
      </footer>
    </div>
  );
};

export default LandingPage;
