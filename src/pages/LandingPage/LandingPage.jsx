import React, { useState, useEffect } from 'react';
import './LandingPage.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

export const LandingPage = () => {
  const [events, setEvents] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isOpen, setIsOpen] = useState(false);

  const openNav = () => {
    setIsOpen(!isOpen);
  };

  const closeNav = () => {
    setIsOpen(false);
  };
  


  const navigate = useNavigate();  // Initialize navigate hook for routing
  const location = useLocation();

  const userId = location.state?.user_id || null; // If id is not in location.state, fallback to null
  const userName = location.state?.name || '';  // Get user name if available
  const userEmail = location.state?.email || '';
  const phoneNo = location.state?.phoneNo || '';
  const [user, setUser] = useState({
    user_id: userId,
    name: userName,
    email: userEmail,
    phoneNo: phoneNo
  });

  // Fetch events from the API
  const fetchData = async (maxRetries = 5, retryDelay = 2000) => {
    let attempt = 0;
    const axiosConfig = { timeout: 5000 };

    while (attempt < maxRetries) {
      try {
        console.log(`Attempt ${attempt + 1} to fetch data...`);
        const response = await axios.get('https://tick-dzls.onrender.com/event/getAllEvent', axiosConfig);
        console.log('Data fetched successfully:', response.data);
        setEvents(response.data.event); // Set events from API response
        setLoading(false);
        return;
      } catch (err) {
        attempt += 1;
        setError(err);
        console.error(`Attempt ${attempt} failed:`, err.message);

        if (err.code === 'ECONNABORTED' || err.message === 'Network Error') {
          console.log('Network issue detected. Retrying...');
        } else if (err.response) {
          console.error('Server error or bad response:', err.response.status);
          setLoading(false);
          return;
        } else {
          console.error('Unknown error:', err.message);
        }

        if (attempt >= maxRetries) {
          console.log('Max retries reached. Stopping attempts.');
          setLoading(false);
          return;
        }

        const delay = retryDelay * Math.pow(2, attempt);
        console.log(`Retrying in ${delay}ms...`);
        await new Promise((resolve) => setTimeout(resolve, delay));
      }
    }
  };

  useEffect(() => {
    fetchData(); // Fetch data on component mount
  }, []);

  if (loading) {
    return <div style={{color: 'black'}}>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  const displayEvents = events.length > 0 ? events : [];

  // Handle event card click
  const handleEventClick = (eventId, price) => {
    console.log("Clicked eventId:", eventId); // Log eventId for debugging
    console.log("Clicked price:", price); // Log price for debugging

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
    <div className="homepage">
      {/* Header Section */}
      <header className="header">
        <div className="logo">
          <h1>TheOwl_Initiators</h1>
          <span className="openNav" id='Toggle-icon' role='button' onClick={openNav}>
            {isOpen ?  (<svg viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" fill="#fff"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path fill="#fff" d="M195.2 195.2a64 64 0 0 1 90.496 0L512 421.504 738.304 195.2a64 64 0 0 1 90.496 90.496L602.496 512 828.8 738.304a64 64 0 0 1-90.496 90.496L512 602.496 285.696 828.8a64 64 0 0 1-90.496-90.496L421.504 512 195.2 285.696a64 64 0 0 1 0-90.496z"></path></g></svg>) : (<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="#fff"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <title></title> <g id="Complete"> <g id="align-justify"> <g> <polygon fill="#ffffff" points="20 18 4 18 4 18 20 18 20 18" stroke="#fff" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"></polygon> <polygon fill="#ffffff" points="20 14 4 14 4 14 20 14 20 14" stroke="#fff" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"></polygon> <polygon fill="#ffffff" points="20 10 4 10 4 10 20 10 20 10" stroke="#fff" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"></polygon> <polygon fill="#ffffff" points="20 6 4 6 4 6 20 6 20 6" stroke="#fff" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"></polygon> </g> </g> </g> </g></svg>)}
          </span>
        </div>

        <nav className="largeNav navigation">
        <ul>
            <li><a href="#home">Home</a></li>
            <li><a href="#services">Services</a></li>
            <li><a href="#events">Events</a></li>

            {/* Conditionally render SignUp or Dashboard based on user authentication */}
            {user.user_id ? (
              <div>
                <li>
                  <a href="#dashboard" onClick={() => navigate('/user-dashboard', {
                      state: { name: user.name, user_id: user.user_id, email: user.email }
                    })}>
                    Dashboard
                  </a>
                </li>
              </div>
            ) : (
              <>
                <li><a href='/sign-up'>Sign Up</a></li>
                <li><a href='/login'>Log in</a></li>
              </>
            )}

            <li><a href="#about">About Us</a></li>
            <li><a href="#contact">Contact</a></li>
          </ul>
        </nav>
        <nav className="navigation" style={{display: isOpen ? 'flex' : 'none'}} id="navigation">
          <ul>
            <li><a href="#home">Home</a></li>
            <li><a href="#services">Services</a></li>
            <li><a href="#events">Events</a></li>

            {/* Conditionally render SignUp or Dashboard based on user authentication */}
            {user.user_id ? (
              <div>
                <li>
                  <a href="#dashboard" onClick={() => navigate('/user-dashboard', {
                      state: { name: user.name, user_id: user.user_id, email: user.email }
                    })}>
                    Dashboard
                  </a>
                </li>
              </div>
            ) : (
              <>
                <li><a href='/sign-up'>Sign Up</a></li>
                <li><a href='/login'>Log in</a></li>
              </>
            )}

            <li><a href="#about">About Us</a></li>
            <li><a href="#contact">Contact</a></li>
          </ul>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="hero">
        <h2>Welcome to TheOwl_Initiators</h2>
        <p>Your trusted partner in innovation and event management</p>
       <a href='/sign-up'> <button className="cta-button">Get Started</button> </a>
      </section>

      {/* Upcoming Events Section */}
      <section className="events">
        <h1>Upcoming Events</h1>
        <div className="event-cards">
          {displayEvents.map((event, index) => {
            const { event_name, event_address, time_in, summary, picture, price, date, id } = event; // use 'id' here
            const formattedDate = new Date(date).toLocaleDateString();
            const formattedTime = new Date(`1970-01-01T${time_in}`).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

            return (
              <div
                key={index}
                className="event-card"
                onClick={() => handleEventClick(id, price)} // Pass both id and price to the handler
              >
                <img src={`https://tick-dzls.onrender.com/${picture}`} alt={event_name} className="event-image" />
                <div className="event-info">
                  <h4 className="event-title">{event_name}</h4>
                  <p className="event-address">{event_address}</p>
                  <p className="event-summary">{summary}</p>
                  <p className="event-price">Price: NGN{parseFloat(price).toFixed(2)}</p>
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

      {/* About Us Section */}
      <section id="about" className="about-us">
        <h1 className="ab">About Us</h1>
        <p className="owls"> TheOwl_Initiators is an Online Ticketing And Event Managing Platform leading In event management specializing in corporate events, weddings, concerts, and more. We pride ourselves on delivering exceptional and personalized services that cater to all types of events. Our experienced team ensures every detail is executed perfectly to create memorable experiences for our clients.</p>
      </section>

      {/* Services Section */}
      <section id="services" className="services">
        <h3>Our Services</h3>
        <div className="service-cards">
          <div className="service-card">
            <h4>Corporate Events</h4>
            <p>Seamless planning for conferences, seminars, and team-building activities.</p>
          </div>
          <div className="service-card">
            <h4>Birthday Parties</h4>
            <p>Exciting themes and unique celebrations for all ages.</p>
          </div>
          <div className="service-card free-service">
            <h4>Free Event Service</h4>
            <p>Enjoy a complimentary event service for eligible community events.</p>
          </div>
          <div className="service-card">
            <h4>Concerts and Shows</h4>
            <p>Expert management for concerts, live shows, and theatrical events.</p>
          </div>
          <div className="service-card">
            <h4>Event Staffing Services For Seamless Experience</h4>
            <p> Simplify your event planning with our reliable and skilled staffing solutions.</p>
          </div>
        </div>
      </section>

       {/* Contact Us Section */}
      <section id="contact" className="contact-us">
        <h3>Contact Us</h3>
        <p className="bla">If you have any questions or would like to learn more about our services, feel free to reach out. We'd love to hear from you!</p>
        <div className="contact-us form">
          <form>
            <div>
              <label htmlFor="name">Name</label>
              <input type="text" id="name" placeholder="Your Name" className="inputs" required />
            </div>
            <div>
              <label htmlFor="email">Email</label>
              <input type="email" id="email" placeholder="Your Email" required />
            </div>
            <div>
              <label htmlFor="message">Message</label>
              <textarea id="message" placeholder="Your Message" required></textarea>
            </div>
            <button type="submit" className="cta-button">Send Message</button>
          </form>
3        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="social-links">
          <a href="https://www.facebook.com/profile.php?id=61567055525143&mibextid=ZbWKwL" target="_blank" rel="noopener noreferrer">Facebook</a>
          <a href="https://x.com/TheOWL_life?t=Nla3mQ2usqUWhBPaSyteUQ&s=09" target="_blank" rel="noopener noreferrer">Twitter</a>
          <a href="https://www.instagram.com/owl_initiator/profilecard/?igsh=MXcycmRzdXQ5cnNwcg==" target="_blank" rel="noopener noreferrer">Instagram</a>
          {/* <a href="https://WhatApp.com" target="_blank" rel="noopener noreferrer">WhatApp</a> */}
        </div>
        <p>&copy; 2024 TheOwl_Initiators. All Rights Reserved.</p>
      </footer>
    </div>
  );
};

export default LandingPage;
