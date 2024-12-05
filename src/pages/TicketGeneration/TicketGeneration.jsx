import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { PaystackButton } from 'react-paystack';
import { useLocation } from 'react-router-dom';
import { jsPDF } from "jspdf";
import './TicketGeneration.css';

const TicketGenerator = () => {
  const [ticketToken, setTicketToken] = useState('');
  const [qrCodeUrl, setQrCodeUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState('');
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [phoneNo, setPhoneNo] = useState('');
  const [amount, setAmount] = useState(0);
  const [subaccountCode, setSubaccountCode] = useState('');
  const [splitAccountId, setSplitAccountId] = useState(null);
  const [publicKey] = useState('pk_live_9810a53b63cfa27714d35df2aa9049591825d065');
  
  // Use location to get parameters
  const location = useLocation();
  const { name: locationName, email: locationEmail, user_id, eventName, phoneNo: locationPhoneNo, eventId, price, bank: bank, account_number: accountNumber, account_name: accountName  } = location.state || {};
  const defaultQrCodeUrl = 'https://yourserver.com/default-qr-code.png';
  console.log(location.state)

  const PAYSTACK_SECRET_KEY = 'sk_live_9c93d96ca28e52ab128970dfd783766a58d42461'; // Replace with your secret key
  const PAYSTACK_PUBLIC_KEY_DEMO ='pk_test_30669aac0b13ceb49859a7d1163940ee50f58b43'

  // Bank code mapping (same as in your code)
  const bankCodeMapping = {
  '9MOBILE 9PAYMENT SERVICE BANK': '120001',
  'ABBEY MORTGAGE BANK': '801',
  'ABOVE ONLY MFB': '51204',
  'ABULESORO MFB': '51312',
  'ACCESS BANK': '044',
  'ACCESS BANK (DIAMOND)': '063',
  'AIRTEL SMARTCASH PSB': '120004',
  'ALAT BY WEMA': '035A',
  'AMJU UNIQUE MFB': '50926',
  'ARAMOKO MFB': '50083',
  'ASO SAVINGS AND LOANS': '401',
  'ASTRAPOLARIS MFB LTD': 'MFB50094',
  'BAINESCREDIT MFB': '51229',
  'BOWEN MICROFINANCE BANK': '50931',
  'CARBON': '565',
  'CEMCS MICROFINANCE BANK': '50823',
  'CHANELLE MICROFINANCE BANK LIMITED': '50171',
  'CITIBANK NIGERIA': '023',
  'CORESTEP MFB': '50204',
  'CORONATION MERCHANT BANK': '559',
  'CRESCENT MFB': '51297',
  'ECOBANK NIGERIA': '050',
  'EKIMOGUN MFB': '50263',
  'EKONDO MICROFINANCE BANK': '562',
  'EYOWO': '50126',
  'FIDELITY BANK': '070',
  'FIRMUS MFB': '51314',
  'FIRST BANK OF NIGERIA': '011',
  'FIRST CITY MONUMENT BANK': '214',
  'FSDH MERCHANT BANK LIMITED': '501',
  'GATEWAY MORTGAGE BANK LTD': '812',
  'GLOBUS BANK': '00103',
  'GOMONEY': '100022',
  'GUARANTY TRUST BANK': '058',
  'HACKMAN MICROFINANCE BANK': '51251',
  'HASAL MICROFINANCE BANK': '50383',
  'HERITAGE BANK': '030',
  'HOPEPSB': '120002',
  'IBILE MICROFINANCE BANK': '51244',
  'IKOYOI OSUN MFB': '50439',
  'INFINITY MFB': '50457',
  'JAIZ BANK': '301',
  'KADPOLY MFB': '50502',
  'KEYSTONE BANK': '082',
  'KREDI MONEY MFB LTD': '50200',
  'KUDA BANK': '50211',
  'LAGOS BUILDING INVESTMENT COMPANY PLC.': '90052',
  'LINKS MFB': '50549',
  'LIVING TRUST MORTGAGE BANK': '031',
  'LOTUS BANK': '303',
  'MAYFAIR MFB': '50563',
  'MINT MFB': '50304',
  'MTN MOMO PSB': '120003',
  'PAGA': '100002',
  'PALMPAY': '999991',
  'PARALLEX BANK': '104',
  'PARKWAY - READYCASH': '311',
  'PAYCOM': '999992',
  'PETRA MIRCOFINANCE BANK PLC': '50746',
  'POLARIS BANK': '076',
  'POLYUNWANA MFB': '50864',
  'PREMIUMTRUST BANK': '105',
  'PROVIDUS BANK': '101',
  'QUICKFUND MFB': '51293',
  'RAND MERCHANT BANK': '502',
  'REFUGE MORTGAGE BANK': '90067',
  'RUBIES MFB': '125',
  'SAFE HAVEN MFB': '51113',
  'SOLID ROCK MFB': '50800',
  'SPARKLE MICROFINANCE BANK': '51310',
  'STANBIC IBTC BANK': '221',
  'STANDARD CHARTERED BANK': '068',
  'STELLAS MFB': '51253',
  'STERLING BANK': '232',
  'SUNTUST BANK': '100',
  'TAJ BANK': '302',
  'TANGERINE MONEY': '51269',
  'TCF MFB': '51211',
  'TITAN BANK': '102',
  'TITAN PAYSTACK': '100039',
  'UNICAL MFB': '50871',
  'UNION BANK OF NIGERIA': '032',
  'UNITED BANK FOR AFRICA': '033',
  'UNITY BANK': '215',
  'VFD MICROFINANCE BANK LIMITED': '566',
  'WEMA BANK': '035',
  'ZENITH BANK': '057',
  'OPAY': '999992',
};


  // Function to capitalize all letters of the bank name
const capitalizeBankName = (bankName) => {
  return bankName.toUpperCase(); // Convert the entire bank name to uppercase
};

// Function to get the bank code by capitalizing the bank name
const getBankCode = (bankName) => {
  const capitalizedBankName = capitalizeBankName(bankName); // Capitalize all letters in bank name
  return bankCodeMapping[capitalizedBankName] || capitalizedBankName; // Return the bank code or the original name
};


  useEffect(() => {
    if (!locationEmail || !locationName) {
      setError('Email and name are required');
      return;
    }

    setEmail(locationEmail);
    setName(locationName);
    setPhoneNo(locationPhoneNo);

    if (price) {
      const convertedAmount = Math.round(parseFloat(price) * 100); // Convert to Kobo
      if (isNaN(convertedAmount)) {
        setError('Invalid price format');
        return;
      }
      setAmount(convertedAmount);
    }

    // Start subaccount fetching and creation
    handleSubaccountSetup();
  }, [locationEmail, locationName, locationPhoneNo, price]);

  // Fetch Subaccounts from Paystack
const fetchSubaccounts = async () => {
  try {
    const response = await axios.get('https://api.paystack.co/subaccount', {
      headers: {
        Authorization: `Bearer ${PAYSTACK_SECRET_KEY}`,
      },
    });
    
    const { data } = response.data;
    console.log('Fetched subaccounts:', data);

    // Ensure that account number and bank are correctly fetched from location.state
    const accountNumber = location.state.accountNumber;
    const bankName = location.state.bank;

    // Check if the provided bank and account number match any subaccount
    const matchingSubaccount = data.find(
      (subaccount) =>
        subaccount.business_name === location.state.accountName && // Ensure correct bank is matched
        subaccount.account_number === accountNumber // Ensure account number matches
    );

    if (matchingSubaccount) {
      console.log('Matching subaccount found:', matchingSubaccount);
      setSplitAccountId(matchingSubaccount.subaccount_code); // Set subaccount code
      return true; // Return true if a match is found
    } else {
      console.log('No matching subaccount found');
    }
  } catch (err) {
    console.error('Error fetching subaccounts:', err.message);
  }
  return false; // Return false if no match is found
};

// Create Subaccount
const createSubaccount = async () => {
  try {
    setLoading(true);

    // Ensure bank code and account number are correctly retrieved
    const bankCode = getBankCode(location.state.bank);
    const accountNumber = location.state.accountNumber;
    

    // Log the values to ensure correct data
    console.log('Creating subaccount with the following details:');
    console.log('Bank:', location.state.bank);
    console.log('Account Number:', accountNumber);
    console.log("bank code:", bankCode)
    console.log("Accout Name:", location.state.accountName);

    const response = await axios.post(
      'https://owipay-1.onrender.com/create-subaccount',
      {
        business_name: location.state.accountName, // Assuming account name is correct
        settlement_bank: bankCode,
        account_number: location.state.accountNumber,  // Make sure this is the correct number
        percentage_charge: 50, // Example percentage
      }
    );
    setSubaccountCode(response.data.subaccount_code); // Save subaccount code
    console.log('Subaccount created:', response.data);
  } catch (err) {
    console.error('Subaccount creation failed:', err.message);
    setSubaccountCode(''); // Proceed without subaccount code
  } finally {
    setLoading(false);
  }
};

// Handle Subaccount Setup (Fetching and Creating)
const handleSubaccountSetup = async () => {
  const accountMatched = await fetchSubaccounts(); // Check for existing subaccount
  if (!accountMatched) {
    // Only create a subaccount if no match is found
    await createSubaccount();
  } else {
    console.log('Subaccount already exists, no need to create a new one.');
  }
};


const generateTicketToken = () => {
    if (!name) {
      setError('Invalid name');
      return '';
    }

    const nameParts = name.split(' ');
    const firstLetterFirstName = nameParts[0]?.charAt(0).toUpperCase() || 'X';
    const firstLetterLastName = nameParts[1]?.charAt(0).toUpperCase() || 'X';

    const brandPrefix = eventName ? eventName.substring(0, 5).toUpperCase() : 'EVNT';
    const randomNumbers = Math.floor(100 + Math.random() * 900); // Generates a 3-digit random number
    return `${firstLetterFirstName}${firstLetterLastName}${brandPrefix}${randomNumbers}`;
  };

  // Generate QR Code
  const generateQRCode = async (ticketToken) => {
    if (!ticketToken) {
      setError('Invalid ticket token for QR code generation');
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


  // Generate PDF
  const createPDF = () => {
    const doc = new jsPDF();
    doc.text('Ticket Token: ' + ticketToken, 10, 20);
    doc.text('Event: ' + eventName, 10, 30);

    if (qrCodeUrl) {
      doc.addImage(qrCodeUrl, 'PNG', 10, 40, 50, 50);
    }

    doc.save(`${ticketToken}-ticket.pdf`);
  };


  // Initialize the Payment Transaction
  const initiatePayment = async () => {
    try {
      setLoading(true);
      const response = await axios.post('https://owipay-1.onrender.com/paystack/transaction/initialize', {
        email,
        amount,
        subaccount: subaccountCode || undefined, // Skip split if no subaccount
        split: subaccountCode
          ? {
              type: 'percentage',
              subaccounts: [{ subaccount: subaccountCode, share: 50 }],
            }
          : undefined,
      });



      const { access_code } = response.data;
      console.log('Access code:', access_code);
    } catch (error) {
      setError('Error initializing Paystack: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  // Handle successful payment
  const handleSuccessfulPayment = async (reference) => {
  try {
    setLoading(true);

    // Directly proceed with the payment process without verification
    const generatedToken = generateTicketToken();

    if (!generatedToken) {
      setError('Invalid ticket token');
      setLoading(false);
      return;
    }

    setTicketToken(generatedToken);

    // Generate QR Code after the token
    await generateQRCode(generatedToken);
    setQrCodeUrl(generateQRCode);

    // Send ticket details to the server
    const formData = {
      userId: location.state.user_id,
      eventId: location.state.eventId,
      email: location.state.email,
      qrcodeURL: qrCodeUrl,
      token: generatedToken,
      ticketType: location.state.ticketType
    };

    console.log("Data To Send", formData)

    await axios.post('https://tick-dzls.onrender.com/event/attendEvent', formData);

    setMessage('Ticket has been sent to your email!');
    createPDF(); // Generate the PDF
  } catch (error) {
    console.error('Error:', error.message);
    setError('Error processing payment: ' + error.message);
  } finally {
    setLoading(false);
  }
};

console.log('Split Account Id', splitAccountId);
console.log('account id', subaccountCode);

  const componentProps = {
  email,
  amount,
  metadata: { name, phone: phoneNo },
  publicKey,
  text: 'Pay Now',
  onSuccess: ({ reference }) => handleSuccessfulPayment(reference),
  onClose: () => setError('Payment was cancelled, please try again.'),
  subaccount: splitAccountId,
};

console.log(subaccountCode);


  return (
  <div className="ticket-generator-container">
    <h2>Generate Event Ticket</h2>
    {error && <div className="error-message">{error}</div>}
    {message && <div className="success-message">{message}</div>}
    <div>
      {loading ? (
        <p>Processing...</p>
      ) : (
        <>
          <PaystackButton {...componentProps} />
          {ticketToken && <p>Generated Ticket Token: {ticketToken}</p>}
          {qrCodeUrl && <img src={qrCodeUrl} alt="QR Code" style={{ width: '250px', height: '250px', marginTop:'10px'}} />}
        </>
      )}
    </div>
  </div>
);

}

export default TicketGenerator;
