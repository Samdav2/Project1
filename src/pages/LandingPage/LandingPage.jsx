import React from 'react';
import './LandingPage.css';

export const LandingPage = () => {
  return (
    <div className="homepage">
      {/* Header Section */}
      <header className="header">
        <div className="logo">
          <h1>TheOwl Initiators</h1>
        </div>
        <nav className="navigation">
          <ul>
            <li><a href="#home">Home</a></li>
            <li><a href="#services">Services</a></li>
            <li><a href="#about">About Us</a></li>
            <li><a href="#contact">Contact</a></li>
          </ul>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="hero">
        <h2>Welcome to TheOwl Initiators</h2>
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

      {/* About Us Section */}
      <section className="about" id="about">
        <h3>About Us</h3>
        <p>TheOwl Initiators is a leader in event management and consulting. We focus on delivering high-quality solutions and ensuring every project runs smoothly.</p>
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
        <p>&copy; 2024 TheOwl_Initiators. All Rights Reserved.</p>
      </footer>
    </div>
  );
};

export default LandingPage;
