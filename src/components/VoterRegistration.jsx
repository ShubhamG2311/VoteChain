import React from 'react'
import { useState, useEffect } from 'react';
import './css/CandidateRegistration.css'
import electionContract from "../artifacts/contracts/Election.sol/Election.json"
import { useNavigate } from 'react-router-dom';
import { Link } from "react-router-dom";
import contractAddress from "../contractAddress.json"

const ethers=require('ethers');

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

      // Create a Web3Provider instance
      // await window.ethereum.request({ method: "eth_requestAccounts" });
      // const provider = new ethers;
      const provider = new ethers.BrowserProvider(window.ethereum);
      // console.log(provider);

      
      // const election = new ethers.Contract(config[network.chainId].election.address, electionContract, provider);
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
        ipfsImageHash,
        password
      );
      
      await tx.wait();

      setDisable(false);

      navigate('/voter-login');

      console.log("Success");
      } catch (e) {
        console.log(e.reason);
        window.location.reload();
      }
    }
  
  return (
    <div className="voter-registration">
      <div className="header-part" >
        <button className="tab-button">Intro</button>
        <button className="tab-button">Home</button>
        <button className="tab-button">About Us</button>
      </div>
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
                <div class="form-group col-md-6">
                  <label for="inputimagehash" class="form-label">IPFS Image Hash</label>
                  <input type="text" className="input-field" class="form-control" id='inputimagehash' placeholder="IPFS Image Hash" onChange={(e) => setIpfsImageHash(e.target.value)} required/>
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
