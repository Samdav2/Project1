import React, { useState, useRef } from 'react';
import './VerifyTicket.css';
import { BrowserMultiFormatReader } from '@zxing/library';
import axios from 'axios';

const VerifyTicket = () => {
  const [token, setToken] = useState('');
  const [isValid, setIsValid] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [scanning, setScanning] = useState(false);
  const [scannedText, setScannedText] = useState('');
  const [verifyResponse, setVerifyResponse] = useState(null);
  const videoRef = useRef(null);
  const [videoStream, setVideoStream] = useState(null);

  const verifyToken = async () => {
    if (!token) {
      setErrorMessage('Please enter a ticket code.');
      return null;
    }

    const tokens = {
      token: token
    }

    try {
<<<<<<< HEAD
      console.log('Verifying token:', token);
      const response = await axios.post('https://tick-dzls.onrender.com/event/verifytoken', {
        token,
      });
      console.log("data res", response.data)

      if (response.data) {
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
        return true; 
      }
    } catch (error) {
      console.error('Verification error:', error);
      setIsValid(false);
      setErrorMessage('Error verifying ticket. Does not exist or has been used!');
    }
    return false; 
  };

  const deleteTicket = async () => {
    try {
      console.log('Deleting token:', token);
      const response = await axios.delete('https://tick-dzls.onrender.com/event/deleteTicket', {
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
    <div className="container">
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
  );
};

export default VerifyTicket;
