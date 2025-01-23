import React, { useState, useRef } from 'react';
import './VerifyTicket.css';
import { BrowserMultiFormatReader } from '@zxing/library';
import axios from 'axios';
import { useLocation } from "react-router-dom";
import BackButton from "/src/components/Ui/BackArrow.jsx"
import Footer from "/src/components/Dashboard/Footer.jsx"
import dotenv from "dotenv"

const VerifyTicket = () => {
  const [token, setToken] = useState('');
  const [isValid, setIsValid] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [scanning, setScanning] = useState(false);
  const [scannedText, setScannedText] = useState('');
  const [verifyResponse, setVerifyResponse] = useState(null);
  const videoRef = useRef(null);
  const [videoStream, setVideoStream] = useState(null);

  const location = useLocation();

  const verifyTicket = import.meta.env.VITE_VERIFY_TOKEN
  const deleteTickets = import.meta.env.VITE_DELETE_TICKET

  const verifyToken = async () => {

    if (!token) {
      setErrorMessage('Please enter a ticket code.');
      return null;
    }

    const tokens = {
      token: token
    }

    try {
          console.log('Verifying token:', token);
          const response = await axios.post(verifyTicket, { token });
          console.log("data res", response.data);

    // Check if the event brand name matches the current user's brand name (event owner) or if the user is an authorized official (Roman or Down)
    const authorizedBrands = ['Roman', 'Down'];
    const eventBrandName = response.data.eventDetails.brand_name;
    const userBrandName = location.state.brandname;  // The brand name of the event owner

    if (eventBrandName !== userBrandName && !authorizedBrands.includes(userBrandName)) {
      setIsValid(false);
      setErrorMessage('You are not the owner of this event, and you are not an authorized official!');
      return false;  // Return false to stop further processing
       }



      // If the brand names match, continue with the response data
      setVerifyResponse({
        message: response.data.message,
        user: response.data.userProfile.name,
        email: response.data.userProfile.email,
        event: response.data.eventDetails.event_name,
        location: response.data.eventDetails.event_address,
        date: response.data.eventDetails.date,
      });
      setIsValid(true);
      setErrorMessage('');
      return true;  // Successfully verified the ticket
    } catch (error) {
      console.error('Verification error:', error);
      setIsValid(false);
      setErrorMessage('Error verifying ticket. It may not exist or could have been used!');
    }
    return false;
  };

  const deleteTicket = async () => {
    try {
      console.log('Deleting token:', token);
      const response = await axios.delete(deleteTickets, {
        data: { token },
      });

      if (response.data) {
        console.log('Deletion response:', response.data);
        setIsValid(true);
        setErrorMessage('Ticket successfully deleted.');
      } else {
        setIsValid(false);
        setErrorMessage('Deletion failed. Ticket not found or already deleted.');
      }
    } catch (error) {
      console.error('Deletion error:', error);
      setIsValid(false);
      setErrorMessage(error.response?.data?.message || 'Error deleting the ticket.');
    }
  };

  const handleSubmit = async () => {
    const isVerified = await verifyToken();
    if (isVerified) {
      await deleteTicket();
    }
  };

  const handleScan = (result) => {
    if (result && !scannedText) {
      setScannedText(result.getText());
      setToken(result.getText());
    }
  };

  const startScanning = () => {
    setScanning(true);
    const codeReader = new BrowserMultiFormatReader();
    codeReader
      .decodeFromVideoDevice(null, videoRef.current, (result, error) => {
        if (result) {
          handleScan(result);
        }
        if (error && error instanceof Error) {
          console.error(error);
        }
      })
      .then((stream) => {
        setVideoStream(stream);
      })
      .catch((err) => console.error('Error starting scanner:', err));
  };

  const stopScanning = () => {
    setScanning(false);
    if (videoStream) {
      const tracks = videoStream.getTracks();
      tracks.forEach((track) => track.stop());
    }
  };

  return (
    <div>
    <div className="container">
    <BackButton />
      <div className="form-container">
        <h1 className="title">Ticket Validation</h1>

        <div className="input-container">
          <input
            type="text"
            placeholder="Enter ticket code"
            value={token}
            onChange={(e) => setToken(e.target.value)}
            className="input-field"
          />
        </div>

        {scanning && (
          <div className="scanned-text">
            <p>Scanning: {scannedText}</p>
          </div>
        )}

        <div className="button-container">
          <button onClick={handleSubmit} className="submit-button">Validate & Delete</button>
        </div>

        <div className="qr-container">
          <button onClick={scanning ? stopScanning : startScanning} className="scan-button">
            {scanning ? 'Stop Scanning' : 'Scan QR Code'}
          </button>
        </div>

        {scanning && (
          <div className="qr-reader">
            <video ref={videoRef} width="100%" height="auto" style={{ borderRadius: '10px' }} autoPlay />
          </div>
        )}

        {verifyResponse && (
          <div className="verification-card">
            <h3>Verification Details</h3>
            <p><strong>Status:</strong> {verifyResponse.message}</p>
            <p><strong>Attendee:</strong> {verifyResponse.user}</p>
            <p><strong>Email:</strong> {verifyResponse.email}</p>
            <p><strong>Event:</strong> {verifyResponse.event}</p>
            <p><strong>Location:</strong> {verifyResponse.location}</p>
            <p><strong>Date:</strong> {new Date(verifyResponse.date).toLocaleDateString()}</p>
          </div>
        )}

        {isValid !== null && (
          <div className={`status ${isValid ? 'valid' : 'invalid'}`}>
            {isValid ? 'Ticket Code Verified & Deleted Successfully!' : errorMessage}
          </div>
        )}
      </div>
      </div>
    </div>
  );
};

export default VerifyTicket;
