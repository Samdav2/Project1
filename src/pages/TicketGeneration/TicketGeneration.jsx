import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { PaystackButton } from 'react-paystack';  // Using react-paystack for easier integration
import './TicketGeneration.css';
import { useLocation } from 'react-router-dom';
import { jsPDF } from "jspdf"; // Ensure jsPDF is installed

const TicketGenerator = () => {
  const [ticketToken, setTicketToken] = useState('');
  const [qrCodeUrl, setQrCodeUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState('');
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [phoneNo, setPhoneNo] = useState('');
  const [amount, setAmount] = useState(50000); // Example amount (50000 kobo = 500 NGN)
  const [publicKey] = useState('pk_live_9810a53b63cfa27714d35df2aa9049591825d065'); // Your Paystack public key

  const location = useLocation();
  const { name: locationName, email: locationEmail, user_id, eventName, phoneNo: locationPhoneNo, eventId } = location.state || {};

  const defaultQrCodeUrl = 'https://yourserver.com/default-qr-code.png';

  useEffect(() => {
    if (!locationEmail || !locationName) {
      setError('Email and name are required');
      return;
    }

    setEmail(locationEmail);
    setName(locationName);
    setPhoneNo(locationPhoneNo);
  }, [locationEmail, locationName, locationPhoneNo]);

  // Step 1: Initialize the Payment Transaction on the Backend
  const initiatePayment = async () => {
    try {
      setLoading(true);
      // Call your backend to initialize the payment and get the access_code
      const response = await axios.post('https://owipay-1.onrender.com/paystack/transaction/initialize', {
        email: email,
        amount: amount, // Amount in kobo (50000 kobo = 500 NGN)
      });

      const { access_code } = response.data;
      setAccessCode(access_code);
    } catch (error) {
      setError('Error initializing Paystack: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  // Step 2: Handle successful payment and generate ticket
  const handleSuccessfulPayment = async (reference) => {
    try {
      // Step 3: Verify the payment status on the backend
      const verificationResponse = await axios.get(`https://owipay-1.onrender.com/paystack/transaction/verify/${reference}`);

      if (verificationResponse.data.status === 'success') {
        const generatedToken = generateTicketToken();
        if (!generatedToken) {
          setError('Invalid ticket token');
          return;
        }

        setTicketToken(generatedToken);
        await generateQRCode(generatedToken);

        const formData = {
          token: generatedToken,
          qrcodeURL: qrCodeUrl,
          userId: user_id,
          email,
          eventId,
        };

        await axios.post('https://tick-dzls.onrender.com/event/attendevent', formData);
        setMessage('Ticket has been sent to your email!');

        createPDF(); // Automatically generate the PDF
      } else {
        setError('Payment verification failed.');
      }
    } catch (error) {
      setError('Error verifying payment: ' + error.message);
    }
  };

  // Step 4: Generate a unique ticket token
  const generateTicketToken = () => {
    if (!name) {
      setError('Invalid name');
      return '';
    }

    const nameParts = name.split(' ');
    const firstLetterFirstName = nameParts[0].charAt(0).toUpperCase();
    const firstLetterLastName = nameParts.length > 1 ? nameParts[1].charAt(0).toUpperCase() : 'X'; // Default 'X' if no last name

    const brandPrefix = eventName ? eventName.substring(0, 5).toUpperCase() : 'EVNT';
    const randomNumbers = Math.floor(100 + Math.random() * 900); // Generates a 3-digit random number
    return firstLetterFirstName + firstLetterLastName + brandPrefix + randomNumbers;
  };

  // Step 5: Generate QR code for the ticket
  const generateQRCode = async (ticketToken) => {
    if (!ticketToken) {
      setError('Ticket token is invalid');
      return;
    }

    try {
      const qrCodeApiUrl = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${ticketToken}`;
      setQrCodeUrl(qrCodeApiUrl);
    } catch (error) {
      setError('Error generating QR code: ' + error.message);
      setQrCodeUrl(defaultQrCodeUrl);
    }
  };

  // Step 6: Generate the PDF ticket
  const createPDF = () => {
    const doc = new jsPDF();
    doc.text('Ticket Token: ' + ticketToken, 10, 20);
    doc.text('Event: ' + eventName, 10, 30);

    if (qrCodeUrl && qrCodeUrl.startsWith('https://api.qrserver.com/v1/create-qr-code/')) {
      doc.addImage(qrCodeUrl, 'PNG', 10, 40, 50, 50);
    } else {
      setError('Invalid QR code URL');
      return;
    }

    doc.save(`${ticketToken}-ticket.pdf`);
  };

  const componentProps = {
    email,
    amount,
    metadata: {
      name,
      phone: phoneNo,
    },
    publicKey,
    text: 'Pay Now',
    onSuccess: ({ reference }) => {
      handleSuccessfulPayment(reference);
    },
    onClose: () => setError("Payment was cancelled, please try again."),
  };

  return (
    <div className="ticket-generator-container">
      <h2>Generate Event Ticket</h2>
      {error && <div className="error">{error}</div>}
      {loading && <div>Processing Payment...</div>}

      {/* Use PaystackButton from react-paystack */}
      <PaystackButton className="paystack-button" {...componentProps} />

      {ticketToken && (
        <div className="ticket-token-container">
          <p><strong>Your Ticket Token: {ticketToken}</strong></p>
        </div>
      )}

      {qrCodeUrl && (
        <div className="qr-code-container">
          <img src={qrCodeUrl} alt="QR Code" />
        </div>
      )}

      {message && <div className="message">{message}</div>}
    </div>
  );
};
export default TicketGenerator;
