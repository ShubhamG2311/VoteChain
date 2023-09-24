// import React from 'react'
// import { useState, useEffect } from 'react';
// import electionContract from "../artifacts/contracts/Election.sol/Election.json"

// const ethers=require('ethers');

// function VoterRegistration() {

  // const [name, setName] = useState("");
  // const [ethAddress, setEthaddress] = useState("");
  // const [email, setEmail] = useState("");
  // const [mobileNumber, setMobileNumber] = useState("");
  // const [voterId, setVoterId] = useState("");
  // const [ipfsImageHash, setIpfsImageHash] = useState("");
  // const [password, setPassword] = useState('');

  // const registerVoter = async (e) => {

  //     e.preventDefault();

  //     // Create a Web3Provider instance
  //     // await window.ethereum.request({ method: "eth_requestAccounts" });
  //     // const provider = new ethers;
  //     const provider = new ethers.BrowserProvider(window.ethereum);
  //     // console.log(provider);

      
  //     // const election = new ethers.Contract(config[network.chainId].election.address, electionContract, provider);
  //     console.log(electionContract.abi);

  //     const signer = await provider.getSigner();

  //     const election = new ethers.Contract("0x5FbDB2315678afecb367f032d93F642f64180aa3", electionContract.abi, signer)

      
  //     try {
  //       // // Send a transaction to the smart contract to register the candidate
  //     const tx = await election.registerVoter(
  //       name,
  //       ethAddress,
  //       email,
  //       mobileNumber,
  //       voterId,
  //       ipfsImageHash,
  //       password
  //     );
      
  //     await tx.wait();

  //     console.log("Success");
  //     } catch (e) {
  //       console.log(e.reason);
  //     }
  //   }
  
//   return (
//     <div>
//       <h2>Voter Registration</h2>
//       <form onSubmit={registerVoter}>
//         <input type="text" placeholder="Name" onChange={(e) => setName(e.target.value)} required />
//         <input type="text" placeholder="Email" onChange={(e) => setEmail(e.target.value)} required />
//         <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} required />
//         <input type="text" placeholder="Ethereum Address" onChange={(e) => setEthaddress(e.target.value)} required />
//         <input type="text" placeholder="Mobile Number" onChange={(e) => setMobileNumber(e.target.value)} required />
//         <input type="text" placeholder="Voter ID" onChange={(e) => setVoterId(e.target.value)} required />
//         <input type="text" placeholder="IPFS Image Hash" onChange={(e) => setIpfsImageHash(e.target.value)} required />
//         <button type="submit">Register Candidate</button>
//       </form>
//     </div>
//   )
// }

// export default VoterRegistration;


import React from 'react'
import { useState, useEffect } from 'react';
import './css/CandidateRegistration.css'
import electionContract from "../artifacts/contracts/Election.sol/Election.json"

const ethers=require('ethers');

function VoterRegistration() {

  const [name, setName] = useState("");
  const [ethAddress, setEthaddress] = useState("");
  const [email, setEmail] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [voterId, setVoterId] = useState("");
  const [ipfsImageHash, setIpfsImageHash] = useState("");
  const [password, setPassword] = useState("");

  const registerVoter = async (e) => {

      e.preventDefault();

      // Create a Web3Provider instance
      // await window.ethereum.request({ method: "eth_requestAccounts" });
      // const provider = new ethers;
      const provider = new ethers.BrowserProvider(window.ethereum);
      // console.log(provider);

      
      // const election = new ethers.Contract(config[network.chainId].election.address, electionContract, provider);
      console.log(electionContract.abi);

      const signer = await provider.getSigner();

      const election = new ethers.Contract("0x5FbDB2315678afecb367f032d93F642f64180aa3", electionContract.abi, signer)

      
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

      console.log("Success");
      } catch (e) {
        console.log(e.reason);
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
      <div class="formadjust" >
        <form onSubmit={registerVoter} className="form-container">
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
            <button type="submit" class="btn btn-primary" onClick={registerVoter} style={{marginLeft: "-65px"}}>Register</button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default VoterRegistration;
