import React, { useState } from 'react';
import QRCode from 'qrcode';
import axios from 'axios';
import './TicketGeneration.css';

const TicketGenerator = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [brandName, setBrandName] = useState('');
  const [ticketToken, setTicketToken] = useState('');
  const [qrCodeUrl, setQrCodeUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [error, setError] = useState(null);
  const [message, setMessage] = useState('');

  const generateTicketToken = () => {
    const firstLetter = firstName.charAt(0).toUpperCase() + lastName.charAt(0).toUpperCase();
    const brandPrefix = brandName.substring(0, 5).toUpperCase();
    const randomNumbers = Math.floor(100 + Math.random() * 900); // Generates a 3 digit random number
    return firstLetter + brandPrefix + randomNumbers;
  };

  const generateQRCode = async (ticketToken) => {
    try {
      const url = await QRCode.toDataURL(ticketToken);
      setQrCodeUrl(url);
    } catch (error) {
      console.error('Error generating QR code:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      const generatedToken = generateTicketToken();
      setTicketToken(generatedToken);
      await generateQRCode(generatedToken);

      // Send the token and QR code to the backend API to handle email sending
      const formData = {
        email,
        ticketToken: generatedToken,
        qrCodeUrl,
      };

      const response = await axios.post('https://your-backend-api.com/send-ticket', formData);
      setMessage('Ticket has been sent to your email!');
    } catch (error) {
      setError('Error sending ticket');
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="ticket-generator-container">
      <h2>Generate Event Ticket</h2>
      <form className="ticket-form" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="First Name"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Last Name"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Brand Name"
          value={brandName}
          onChange={(e) => setBrandName(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="Your Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button type="submit" disabled={loading}>
          {loading ? 'Generating Ticket...' : 'Generate Ticket'}
        </button>
      </form>

      {ticketToken && (
        <div className="ticket-token-container">
          <p>Your Ticket Token: {ticketToken}</p>
          {qrCodeUrl && (
            <div className="qr-code-container">
              <img src={qrCodeUrl} alt="QR Code" />
            </div>
          )}
        </div>
      )}

      {message && <div className="message">{message}</div>}
      {error && <div className="error">{error}</div>}
    </div>
  );
};

export default TicketGenerator;
