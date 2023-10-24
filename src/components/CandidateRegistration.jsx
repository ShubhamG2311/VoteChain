

import React from 'react'
import { useState, useEffect } from 'react';
import { Web3Provider } from 'ethers';
import { useNavigate } from 'react-router-dom';
import { Link } from "react-router-dom";
import './css/CandidateRegistration.css'
// import config from '../config.json'
import electionContract from "../artifacts/contracts/Election.sol/Election.json"
import contractAddress from "../contractAddress.json"

const ethers=require('ethers');



function CandidateRegistration({}) {
  const [name, setName] = useState("");
  const [ethAddress, setEthaddress] = useState("");
  const [email, setEmail] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [aadharNumber, setAadharNumber] = useState("");
  const [voterId, setVoterId] = useState("");
  const [homeAddress, setHomeAddress] = useState("");
  const [ipfsImageHash, setIpfsImageHash] = useState("");
  const [numberOfCandidates, setNumberOfCandidates] = useState(0);
  const [disable, setDisable] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loginMessage, setLoginMessage] = useState('');
  const [account, setAccount] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const tempAccount = localStorage.getItem("email");
    if (tempAccount !== null) {
      setIsLoggedIn(true);
    }
  }, []);

  const registerCandidate = async (e) => {

    e.preventDefault();
    setDisable(true);

    try {
      // Create a Web3Provider instance
    // await window.ethereum.request({ method: "eth_requestAccounts" });
    // const provider = new ethers;
    const provider = new ethers.BrowserProvider(window.ethereum);
    // console.log(provider);

    
    // const election = new ethers.Contract(config[network.chainId].election.address, electionContract, provider);
    console.log(electionContract.abi);

    const signer = await provider.getSigner();

    const election = new ethers.Contract(contractAddress.contractAddress, electionContract.abi, signer);

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

    
    try {
      // // Send a transaction to the smart contract to register the candidate
    const tx = await election.addCandidate(
      name,
      ethAddress,
      email,
      mobileNumber,
      dateOfBirth,
      aadharNumber,
      voterId,
      homeAddress,
      ipfsImageHash
    );
    
    await tx.wait();
    console.log("Success");
    } catch (error) {
      console.log(error.reason);
    }
    setDisable(false);

    navigate('/home');

    
    }
    catch {
      console.log(e);
      window.location.reload();
    }
    
    }

  return (
    <div className="candidate-registration">
      
      <div className="header-part" >
        <button className="tab-button">Intro</button>
        <button className="tab-button">Home</button>
        <button className="tab-button">About Us</button>
      </div>
      <h1>Candidate Registration</h1>
      {!isLoggedIn ? (
        <div>
        <div class="formadjust">
          <form onSubmit={registerCandidate} className="form-container">
            <div className="form-row">
              <div className="form-group col-md-6">
                <label for="inputname" class="form-label">Full Name</label>
                <input type="text" className="input-field" class="form-control form-control-lg" id="inputname" placeholder="Name" onChange={(e) => setName(e.target.value)} required/>
              </div>
              <div class="form-group col-md-6">
                <label for="inputEmail4" class="form-label">Email address</label>
                <input type="email" className="input-field" class="form-control" id='inputEmail4' placeholder="name@example.com" onChange={(e) => setEmail(e.target.value)} required/>
              </div>
              <div class="form-group col-md-6">
                <label for="inputetheriumadress" class="form-label">Etherium Address</label>
                <input type="text" className="input-field" class="form-control" id='inputetheriumadress' placeholder="Ethereum Address" onChange={(e) => setEthaddress(e.target.value)} required/>
              </div>
              <div class="form-group col-md-6">
                <label for="inputMobilenumber" class="form-label">Mobile Number</label>
                <input type="text" className="input-field" class="form-control" id='inputMobilenumber' placeholder="+911234567890" onChange={(e) => setMobileNumber(e.target.value)} required/>
              </div>
              <div class="form-group col-md-6">
                <label for="inputDOB" class="form-label">Date Of Birth</label>
                <input type="text" className="input-field" class="form-control" id='inputDOB' placeholder="DD/MM/YYYY" onChange={(e) => setDateOfBirth(e.target.value)} required/>
              </div>
              <div class="form-group col-md-6">
                <label for="inputaadhar" class="form-label">Aadhar Card Number</label>
                <input type="text" className="input-field" class="form-control" id='inputaadhar' placeholder="xxx xxxx xxxx" onChange={(e) => setAadharNumber(e.target.value)} required/>
              </div>
              <div class="form-group col-md-6">
                <label for="inputvoterid" class="form-label">Voter ID</label>
                <input type="text" className="input-field" class="form-control" id='inputvoterid' placeholder="xxxxxxxxxxx" onChange={(e) => setVoterId(e.target.value)} required/>
              </div>
              <div class="form-group col-12">
                <label for="inputAddress" class="form-label">Home Address</label>
                <input type="text" className="input-field" class="form-control" id='inputAddress' placeholder="Enter Adress here." onChange={(e) => setHomeAddress(e.target.value)} required/>
              </div>
              <div class="form-group col-md-6">
                <label for="inputimagehash" class="form-label">IPFS Image Hash</label>
                <input type="text" className="input-field" class="form-control" id='inputimagehash' placeholder="IPFS Image Hash" onChange={(e) => setIpfsImageHash(e.target.value)} required/>
              </div>
              <button type="submit" className="btn btn-primary" onClick={registerCandidate} style={{ marginLeft: '-65px' }} disabled={disable}>Register</button>
              </div>
          </form> 
        </div>
        </div>
      ) : (
        <div>
        <p>You are already logged in. Please logout from Dashboard to register new candidate.</p>
          <Link to="/voter-dashboard">
            <button className="btn btn-primary">Dashboard</button>
          </Link>
        </div>
      )}
        
    </div>
  );
}

export default CandidateRegistration;