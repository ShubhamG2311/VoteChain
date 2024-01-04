// OtpVerification.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from "react-router-dom";
import VoterRegistration from './VoterRegistration';
import electionContract from "../artifacts/contracts/Election.sol/Election.json"
import contractAddress from "../contractAddress.json"
import Navbar from "./Navbar";
const ethers = require('ethers');

function VerifyOtp() {

  const [voterRegistrationDone, setVoterRegistrationDone] = useState(true);
  const [voterOtpVerified, setVoterOtpVerified] = useState(false);
  const [otp, setOtp] = useState("");
  const [message, setMessage] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    
  }, []); 

  const handleVerifyOtp = async () => {
    // Send OTP to the server for verification
    const originalOtp = localStorage.getItem('voterOtp');
    if (originalOtp === otp) 
    {
      const provider = new ethers.BrowserProvider(window.ethereum);

      const signer = await provider.getSigner();

      const election = new ethers.Contract(contractAddress.contractAddress, electionContract.abi, signer);
      await window.ethereum.request({ method: "eth_requestAccounts" });
      const accounts = await window.ethereum.request({ method: "eth_accounts" });

      await election.setVoterOtp(accounts[0]);

      navigate('/voter-image-register');
    }
    else 
    {
      setMessage("Incorrect OTP");
    }
  };
  

  return (
    <div>
      <Navbar />
      {voterRegistrationDone ? (
        <div align="center">
        <h1>OTP Verification</h1>
        <h4>Check your email for the OTP and enter it below:</h4>
        <input
          type="text"
          onChange={(e) => setOtp(e.target.value)}
          placeholder="Enter OTP"
        />
        <br/><br/><br/>
        <button className="btn btn-primary" onClick={handleVerifyOtp}>Verify OTP</button>
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
