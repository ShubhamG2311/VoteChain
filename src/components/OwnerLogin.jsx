// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import electionContract from "../artifacts/contracts/Election.sol/Election.json"
// const ethers = require('ethers');

// function VoterLogin({ account }) {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [loginMessage, setLoginMessage] = useState('');
//   const [ethAddress, setEthaddress] = useState("");

//   // Move this line outside of the loginVoter function
//   const navigate = useNavigate();

//   const loginVoter = async (e) => {
//     e.preventDefault();

//     const provider = new ethers.BrowserProvider(window.ethereum);

//     const signer = await provider.getSigner();

//     const election = new ethers.Contract("0x5FbDB2315678afecb367f032d93F642f64180aa3", electionContract.abi, signer);

//     // Call the loginVoter function on the smart contract
//     try {
//       await election.loginVoter(email, password, ethAddress); // Replace 'election' with your contract instance
//       setLoginMessage('Login successful!');
//       // Navigate to the voter dashboard after successful login
//       navigate('/voter-dashboard');
//     } catch (error) {
//       console.error('Error:', error);
//       setLoginMessage('Login failed. Please check your credentials.');
//     }
//   };

//   return (
//     <div>
//       <h2>Voter Login</h2>
//       <form onSubmit={loginVoter}>
//         <input type="text" placeholder="Email" onChange={(e) => setEmail(e.target.value)} required />
//         <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} required />
//         <input type="text" placeholder="Ethereum Address" onChange={(e) => setEthaddress(e.target.value)} required />
//         <button type="submit">Login</button>
//       </form>
//       <p>{loginMessage}</p>
//     </div>
//   );
// }

// export default VoterLogin;

// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// // import './css/VoterLogin.css'
// import contractAddress from "../contractAddress.json"
// import { Link } from "react-router-dom";

// import electionContract from "../artifacts/contracts/Election.sol/Election.json"
// const ethers = require('ethers');

// function VoterLogin({ account , isLoggedIn, setIsLogged, setIsLoggedIn}) {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [loginMessage, setLoginMessage] = useState('');
//   const [ethAddress, setEthaddress] = useState("");

//   // Move this line outside of the loginVoter function
//   const navigate = useNavigate();

//   const loginVoter = async (e) => {
//     e.preventDefault();

//     const provider = new ethers.BrowserProvider(window.ethereum);

//     const signer = await provider.getSigner();

//     const election = new ethers.Contract(contractAddress.contractAddress, electionContract.abi, signer);

//     // Call the loginVoter function on the smart contract
//     try {
//       await election.loginVoter(email, password, ethAddress); // Replace 'election' with your contract instance
//       setLoginMessage('Login successful!');
//       setIsLoggedIn(true);
//       // Navigate to the voter dashboard after successful login
//       navigate('/voter-dashboard');
//     } catch (error) {
//       console.error('Error:', error);
//       setLoginMessage('Login failed. Please check your credentials.');
//     }
//   };

//   return (
//     <div className="voter-login">
//       <div className="header-part" >
//         <button className="tab-button">Intro</button>
//         <button className="tab-button">Home</button>
//         <button className="tab-button">About Us</button>
//       </div>
//       <h1>Voter Login</h1>
//       {account ? (<div>
//         <div class="formadjust">
//           <form onSubmit={loginVoter} className="form-container">
//           <div className="form-row">
//             <div class="form-group col-md-6">
//                 <label for="inputEmail4" class="form-label">Email address</label>
//                 <input type="email" className="input-field" class="form-control" id='inputEmail4' placeholder="name@example.com" onChange={(e) => setEmail(e.target.value)} required/>
//             </div>
//             <div class="form-group col-md-6">
//               <div class="col-auto">
//                 <label for="inputPassword6" class="col-form-label">Password</label>
//                 <input type="password" placeholder="Password" id="inputPassword6" class="col-form-control" aria-describedby="passwordHelpBlock" onChange={(e) => setPassword(e.target.value)} required />

//               </div>
//             </div>
//             <div class="form-group col-md-6">
//                 <label for="inputetheriumadress" class="form-label">Ethereum Address</label>
//                 <input type="text" className="input-field" class="form-control" id='inputetheriumadress' placeholder="Ethereum Address" onChange={(e) => setEthaddress(e.target.value)} required/>
//             </div>
//             <button type="submit" className="btn btn-primary" style={{ marginLeft: '-95px' }}>Login</button>
//           </div>
//           </form>
//         </div>
//       <p>{loginMessage}</p>
//       </div>) : (<div> 
//         <p>Please connect your wallet to access the options.</p>
//           <Link to="/">
//             <button className="btn btn-primary">Connect Wallet</button>
//           </Link>
//       </div>)}
        
//     </div>
//   );
// }

// export default VoterLogin;


import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import contractAddress from "../contractAddress.json";
import { Link } from "react-router-dom";

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

    // const provider = new ethers.BrowserProvider(window.ethereum);

    // const signer = await provider.getSigner();

    // const election = new ethers.Contract(contractAddress.contractAddress, electionContract.abi, signer);
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
      <div className="header-part">
        <button className="tab-button">Intro</button>
        <button className="tab-button">Home</button>
        <button className="tab-button">About Us</button>
      </div>
      <h1>Owner Login</h1>
      {
        isLoggedIn ? ( // Check if isLoggedIn is true
          <div>
          <Link to="/owner-dashboard">
            <button className="btn btn-primary">Dashboard</button>
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


