import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import contractAddress from "../contractAddress.json";
import { Link } from "react-router-dom";
import Navbar from "./Navbar";

import electionContract from "../artifacts/contracts/Election.sol/Election.json";
const ethers = require('ethers');

function VoterLogin({}) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginMessage, setLoginMessage] = useState('');
  const [ethAddress, setEthaddress] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [account, setAccount] = useState(null);
  // Move this line outside of the loginVoter function
  const navigate = useNavigate();

  const loginVoter = async (e) => {
    e.preventDefault();

    const provider = new ethers.BrowserProvider(window.ethereum);

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

    // Call the loginVoter function on the smart contract
    try {
      await election.loginVoter(email, password, ethAddress); // Replace 'election' with your contract instance
      localStorage.setItem("email", email);
      localStorage.setItem("ethAddress", ethAddress);
      setLoginMessage('Login successful!');
      // Navigate to the voter dashboard after successful login
      navigate('/verify-face');
    } catch (error) {
      console.error('Error:', error);
      setLoginMessage('Login failed. Please check your credentials.');
    }
  };

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

  useEffect(() => {
    checkWalletConnection();
    const tempAccount = localStorage.getItem("email");
    if (tempAccount !== null) {
      setIsLoggedIn(true);
    }
  }, []);

  return (
    <div className="voter-login">
      <Navbar/>
      <h1>Voter Login</h1>
      {account ? (
        <div>
          {
          isLoggedIn ? ( // Check if isLoggedIn is true
            <div>
            <Link to="/voter-dashboard">
              <button className="btn btn-primary" style={{marginLeft: '46.5%', marginTop: '60px '}}>Dashboard</button>
            </Link>
            </div>
          ) : (
            <div class="formadjust">
              <form onSubmit={loginVoter} className="form-container">
                <div className="form-row">
                  <div class="form-group col-md-6">
                    <label for="inputEmail4" class="form-label">Email address</label>
                    <input
                      type="email"
                      className="input-field"
                      class="form-control"
                      id='inputEmail4'
                      placeholder="name@example.com"
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                  <div class="form-group col-md-6">
                    <div class="col-auto">
                      <label for="inputPassword6" class="col-form-label">Password</label>
                      <input
                        type="password"
                        placeholder="Password"
                        id="inputPassword6"
                        class="col-form-control"
                        aria-describedby="passwordHelpBlock"
                        onChange={(e) => setPassword(e.target.value)}
                        required
                      />
                    </div>
                  </div>
                  <div class="form-group col-md-6">
                    <label for="inputetheriumadress" class="form-label">Ethereum Address</label>
                    <input
                      type="text"
                      className="input-field"
                      class="form-control"
                      id='inputetheriumadress'
                      placeholder="Ethereum Address"
                      onChange={(e) => setEthaddress(e.target.value)}
                      required
                    />
                  </div>
                  <button type="submit" className="btn btn-primary" style={{ marginLeft: '-95px' }}>Login</button>
                </div>
              </form>
            </div>
          )
        }
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
  );
}

export default VoterLogin;


