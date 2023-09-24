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

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// import './css/VoterLogin.css'

import electionContract from "../artifacts/contracts/Election.sol/Election.json"
const ethers = require('ethers');

function VoterLogin({ account }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginMessage, setLoginMessage] = useState('');
  const [ethAddress, setEthaddress] = useState("");

  // Move this line outside of the loginVoter function
  const navigate = useNavigate();

  const loginVoter = async (e) => {
    e.preventDefault();

    const provider = new ethers.BrowserProvider(window.ethereum);

    const signer = await provider.getSigner();

    const election = new ethers.Contract("0x5FbDB2315678afecb367f032d93F642f64180aa3", electionContract.abi, signer);

    // Call the loginVoter function on the smart contract
    try {
      await election.loginVoter(email, password, ethAddress); // Replace 'election' with your contract instance
      setLoginMessage('Login successful!');
      // Navigate to the voter dashboard after successful login
      navigate('/voter-dashboard');
    } catch (error) {
      console.error('Error:', error);
      setLoginMessage('Login failed. Please check your credentials.');
    }
  };

  return (
    <div className="voter-login">
      <div className="header-part" >
        <button className="tab-button">Intro</button>
        <button className="tab-button">Home</button>
        <button className="tab-button">About Us</button>
      </div>
      <h1>Voter Login</h1>
        <div class="formadjust">
          <form onSubmit={loginVoter} className="form-container">
          <div className="form-row">
            <div class="form-group col-md-6">
                <label for="inputEmail4" class="form-label">Email address</label>
                <input type="email" className="input-field" class="form-control" id='inputEmail4' placeholder="name@example.com" onChange={(e) => setEmail(e.target.value)} required/>
            </div>
            <div class="form-group col-md-6">
              <div class="col-auto">
                <label for="inputPassword6" class="col-form-label">Password</label>
                <input type="password" placeholder="Password" id="inputPassword6" class="col-form-control" aria-describedby="passwordHelpBlock" onChange={(e) => setPassword(e.target.value)} required />

              </div>
            </div>
            <div class="form-group col-md-6">
                <label for="inputetheriumadress" class="form-label">Etherium Address</label>
                <input type="text" className="input-field" class="form-control" id='inputetheriumadress' placeholder="Ethereum Address" onChange={(e) => setEthaddress(e.target.value)} required/>
            </div>
            <button type="submit" className="btn btn-primary" style={{ marginLeft: '-95px' }}>Login</button>
          </div>
          </form>
        </div>
      <p>{loginMessage}</p>
    </div>
  );
}

export default VoterLogin;

