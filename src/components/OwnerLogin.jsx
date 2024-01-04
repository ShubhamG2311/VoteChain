import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import contractAddress from "../contractAddress.json";
import { Link } from "react-router-dom";
import Navbar from "./Navbar";

import electionContract from "../artifacts/contracts/Election.sol/Election.json";
const ethers = require('ethers');

function OwnerLogin({}) {
  const [password, setPassword] = useState('');
  const [loginMessage, setLoginMessage] = useState('');
  const [ethAddress, setEthaddress] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [owner, setOwner] = useState("");
  const [isOwner, setIsOwner] = useState(false);

  const handleGetOwner = async () => {
    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();
    const election = new ethers.Contract(contractAddress.contractAddress, electionContract.abi, signer);

    const currentOwner = await election.getOwner();

    setOwner(currentOwner);
  }
  // Move this line outside of the loginVoter function
  const navigate = useNavigate();

  const loginOwner = async (e) => {
    e.preventDefault();
    await window.ethereum.request({ method: "eth_requestAccounts" });
    const accounts = await window.ethereum.request({ method: "eth_accounts" });
    console.log("Accounts are: ", accounts);

    console.log(accounts[0]);
    console.log(accounts[0].toLocaleLowerCase());
    if (ethAddress.toLocaleLowerCase() !== owner.toLocaleLowerCase() || password !== "owner") {
      console.log("Only Owner can access the dashboard")
      setLoginMessage('Only Owner can access the dashboard.');
      return;
    }

    // Call the loginVoter function on the smart contract
    try {
      localStorage.setItem("owner", ethAddress);
      setLoginMessage('Login successful!');
      // Navigate to the voter dashboard after successful login
      navigate('/owner-dashboard');
    } catch (error) {
      console.error('Error:', error);
      setLoginMessage('Login failed. Please check your credentials.');
    }
  };

  useEffect(() => {
    handleGetOwner();
    const tempAccount = localStorage.getItem("owner");
    if (tempAccount !== null) {
      setIsLoggedIn(true);
    }
  }, []);

  return (
    <div className="voter-login">
      <Navbar isLogOut={true}/>
      <h1>Owner Login</h1>
      {
        isLoggedIn ? ( // Check if isLoggedIn is true
          <div>
          <Link to="/owner-dashboard">
            <button className="btn btn-primary" style={{marginTop: '50px', marginLeft: '46.5%'}}>Dashboard</button>
          </Link>
          </div>
        ) : (
          <div class="formadjust">
            <form onSubmit={loginOwner} className="form-container">
              <div className="form-row">
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
  );
}

export default OwnerLogin;


