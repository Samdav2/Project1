import React, { useState, useEffect } from 'react';
import QRCode from 'qrcode';
import axios from 'axios';
import './TicketGeneration.css';
import { useLocation } from 'react-router-dom';

const TicketGenerator = () => {
  const [ticketToken, setTicketToken] = useState('');
  const [qrCodeUrl, setQrCodeUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [error, setError] = useState(null);
  const [message, setMessage] = useState('');

  const location = useLocation();

  // Destructure values from location.state
  const { name, email: userEmail, eventName } = location.state || {};

  useEffect(() => {
    // If email is not provided through location.state, use input field
    if (!userEmail) {
      setEmail('');
    }
  }, [userEmail]);

  // Generate a unique ticket token based on the user's name and event name
  const generateTicketToken = () => {
    if (!name || !eventName) {
      setError('Invalid name or event name');
      return '';
    }

    const firstLetter = name.charAt(0).toUpperCase();
    const brandPrefix = eventName.substring(0, 5).toUpperCase();
    const randomNumbers = Math.floor(100 + Math.random() * 900); // Generates a 3-digit random number
    return firstLetter + brandPrefix + randomNumbers;
  };

  // Generate a QR code for the ticket token
  const generateQRCode = async (ticketToken) => {
    if (!ticketToken) {
      setError('Ticket token is invalid');
      return;
    }

    try {
      const url = await QRCode.toDataURL(ticketToken);
      setQrCodeUrl(url);
    } catch (error) {
      setError('Error generating QR code: ' + error.message);
      console.error('Error generating QR code:', error);
    }
  };

  // Handle form submission to generate the ticket and send it via email
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    setError(null);  // Reset any previous error

    try {
      // If the email is not provided via location, use the input field
      const userEmailToUse = email || userEmail;

      if (!userEmailToUse) {
        setError('Email is required');
        return;
      }

      const generatedToken = generateTicketToken();
      if (!generatedToken) {
        setError('Invalid ticket token');
        return;
      }

      setTicketToken(generatedToken);
      await generateQRCode(generatedToken);

      // Send the ticket data to the backend API for email processing
      const formData = {
        email: userEmailToUse,
        ticketToken: generatedToken,
        qrCodeUrl,
      };

      const response = await axios.post('https://your-backend-api.com/send-ticket', formData);
      setMessage('Ticket has been sent to your email!');
    } catch (error) {
      setError('Error sending ticket: ' + error.message);
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="ticket-generator-container">
      <h2>Generate Event Ticket</h2>

      {/* Form for entering email if not passed through location */}
      <form className="ticket-form" onSubmit={handleSubmit}>
        {!userEmail && (
          <input
            type="email"
            placeholder="Your Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        )}

        <button type="submit" disabled={loading}>
          {loading ? 'Generating Ticket...' : 'Generate Ticket'}
        </button>
      </form>

      {/* Display Ticket Information */}
      {ticketToken && (
        <div className="ticket-token-container">
          <p><strong>Your Ticket Token: {ticketToken}</strong></p>
          {qrCodeUrl && (
            <div className="qr-code-container">
              <img src={qrCodeUrl} alt="QR Code" />
            </div>
          )}
        </div>
      )}

      {/* Display Messages */}
      {message && <div className="message">{message}</div>}
      {error && <div className="error">{error}</div>}
    </div>
  );
};

export default TicketGenerator;
