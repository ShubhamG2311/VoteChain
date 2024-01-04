import React from 'react'
import { useState, useEffect } from 'react';
import './css/CandidateRegistration.css'
import electionContract from "../artifacts/contracts/Election.sol/Election.json"
import { useNavigate } from 'react-router-dom';
import { Link } from "react-router-dom";
import { Buffer } from 'buffer';
import contractAddress from "../contractAddress.json"
import Navbar from "./Navbar";

const ethers=require('ethers');
const axios = require('axios');

function VoterRegistration() {

  const [name, setName] = useState("");
  const [ethAddress, setEthaddress] = useState("");
  const [email, setEmail] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [voterId, setVoterId] = useState("");
  const [ipfsImageHash, setIpfsImageHash] = useState("");
  const [password, setPassword] = useState("");
  const [disable, setDisable] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loginMessage, setLoginMessage] = useState("");
  const [account, setAccount] = useState(null);
  
  let otp=0;

  useEffect(() => {
    checkWalletConnection();
    const tempAccount = localStorage.getItem("email");
    if (tempAccount !== null) {
      setIsLoggedIn(true);
    }
  }, []);

  const navigate = useNavigate();




  const checkWalletConnection = async () => {
    if (typeof window.ethereum !== "undefined") {
      try {
        // Check if the wallet is connected
        const accounts = await window.ethereum.request({ method: "eth_accounts" });
        if (accounts.length > 0) {
          setAccount(accounts[0]);
        }
      } catch (error) {
        console.error("Wallet connection error:", error);
      }
    }
  };

  const generateRandomOTP = async (e) => {
    return Math.floor(1000 + Math.random() * 9000).toString();
  }

  const sendOtp = async (e) => {
    // Generate the OTP here
    let tempOtp = await generateRandomOTP();

    otp = tempOtp;
  
    const config = {
      Host: "smtp.elasticemail.com",
      Username: "ghelanishubham@gmail.com",
      Password: "9A92C65313C69130D4071434C310DDBFF420",
      Port: 2525,
      To: email,
      From: "ghelanishubham@gmail.com",
      Subject: "Your OTP",
      Body: `Your OTP is ${tempOtp}`  // Use the generated OTP directly
    };
  
    if (window.Email) {
      window.Email.send(config).then(() => {
        localStorage.setItem("voterOtp",tempOtp);
        console.log("Success in email sending.");
        // Now you can use the OTP for further processing if needed
      });
    }
  }

  const registerVoter = async (e) => {

      e.preventDefault();

      await window.ethereum.request({ method: "eth_requestAccounts" });
      const accounts = await window.ethereum.request({ method: "eth_accounts" });
      console.log("Accounts are: ", accounts);

      console.log(accounts[0]);
      console.log(accounts[0].toLocaleLowerCase());
      if (ethAddress.toLocaleLowerCase() !== accounts[0].toLocaleLowerCase()) {
        console.log("Please check if the ethereum address is same as the account selected in Metamask or connect your wallet.")
        setLoginMessage('Please check if the ethereum address is same as the account selected in Metamask or connect your wallet.');
        return;
      }

      setDisable(true);
      const provider = new ethers.BrowserProvider(window.ethereum);
      console.log(electionContract.abi);

      const signer = await provider.getSigner();

      const election = new ethers.Contract(contractAddress.contractAddress, electionContract.abi, signer)

      
      try {
        // // Send a transaction to the smart contract to register the candidate
      const tx = await election.registerVoter(
        name,
        ethAddress,
        email,
        mobileNumber,
        voterId,
        password
      );
      
      await tx.wait();

      setDisable(false);

      try {
        // ...
        
        // Generate and send OTP after the transaction is successful
        // await generateRandomOTP();
        sendOtp();
        navigate('/verify-otp');
        console.log("Success");
      } catch (error) {
        console.log(error);
      }

      console.log("Success");
      } catch (e) {
        console.log(e);
        // window.location.reload();
      }
    }
  
  return (
    <div className="voter-registration">
      <Navbar/>
      <h1>Voter Registration</h1>
      {account ? (
        <div>
          {!isLoggedIn ? (
          <div>
          <div class="formadjust" >
          <form onSubmit={registerVoter} className="form-container">
            <div className="form-row">
                <div className="form-group col-md-6">
                  <label htmlFor="inputname" class="form-label">Full Name</label>
                  <input type="text" className="input-field" class="form-control form-control-lg" id="inputname" placeholder="Name" onChange={(e) => setName(e.target.value)} required/>
                </div>
                <div class="form-group col-md-6">
                  <label for="inputEmail4" class="form-label">Email address</label>
                  <input type="email" className="input-field" class="form-control" id='inputEmail4' placeholder="name@example.com" onChange={(e) => setEmail(e.target.value)} required/>
                </div>
                <div class="form-group col-md-6">
                  <label for="inputPassword4" class="form-label">Password</label>
                  <input type="password" className="input-field" class="form-control" id='inputPassword4' placeholder="Password" onChange={(e) => setPassword(e.target.value)} required/>
                </div>
                <div class="form-group col-md-6">
                  <label for="inputetheriumadress" class="form-label">Ethereum Address</label>
                  <input type="text" className="input-field" class="form-control" id='inputetheriumadress' placeholder="Ethereum Address" onChange={(e) => setEthaddress(e.target.value)} required/>
                </div>
                <div class="form-group col-md-6">
                  <label for="inputMobilenumber" class="form-label">Mobile Number</label>
                  <input type="text" className="input-field" class="form-control" id='inputMobilenumber' placeholder="+911234567890" onChange={(e) => setMobileNumber(e.target.value)} required/>
                </div>
                <div class="form-group col-md-6">
                  <label for="inputvoterid" class="form-label">Voter ID</label>
                  <input type="text" className="input-field" class="form-control" id='inputvoterid' placeholder="xxxxxxxxxxx" onChange={(e) => setVoterId(e.target.value)} required/>
                </div>
              <button type="submit" class="btn btn-primary" onClick={registerVoter} style={{marginLeft: "-65px"}} disabled={disable}>Register</button>
            </div>
          </form>
          <p>{loginMessage}</p>
        </div>
          </div>
        ) : (
          <div>
          <p>You are already logged in. Please logout from the dashboard to register new voter.</p>
          <Link to="/voter-dashboard">
            <button className="btn btn-primary">Dashboard</button>
          </Link>
          </div>
        )}
        </div>
      ) : (
        <div>
          <p>Wallet is not connected. Please connect the wallet.</p>
          <Link to="/">
            <button className="btn btn-primary">Connect</button>
          </Link>
        </div>
      )}
    </div>
  )
}

export default VoterRegistration;
