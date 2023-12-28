// OtpVerification.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from "react-router-dom";
import VoterRegistration from './VoterRegistration';

function VerifyOtp() {

  const [voterRegistrationDone, setVoterRegistrationDone] = useState(false);
  const [voterOtpVerified, setVoterOtpVerified] = useState(false);
  const [otp, setOtp] = useState("");
  const [message, setMessage] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const t1 = localStorage.getItem('voterRegistrationDone');
    const t2 = localStorage.getItem('voterOtpVerified');
    // const t3 = localStorage.getItem('voterOtp');

    setVoterRegistrationDone(t1);
    setVoterOtpVerified(t2);
    // setOtp(t3);
  }, []); 

  const handleVerifyOtp = async () => {
    // Send OTP to the server for verification
    const originalOtp = localStorage.getItem('voterOtp');
    if (originalOtp === otp) 
    {
      navigate('/voter-dashboard');
    }
    else 
    {
      setMessage("Incorrect OTP");
    }
  };
  

  return (
    <div>
      {voterRegistrationDone ? (
        <div>
        <h1>OTP Verification</h1>
        <p>Check your email for the OTP and enter it below:</p>
        <input
          type="text"
          onChange={(e) => setOtp(e.target.value)}
          placeholder="Enter OTP"
        />
        <button onClick={handleVerifyOtp}>Verify OTP</button>
        <p>{message}</p>
        </div>
      ) : (
        <div>
          <h1>OTP Verification</h1>
          <p>Please register with details first</p>
          <Link to="/home">
            <button className="btn btn-primary">Home</button>
          </Link>
        </div>
      )}
    </div>
  );
}

export default VerifyOtp;
