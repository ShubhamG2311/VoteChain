import React from 'react'
import { useState, useEffect } from 'react';
import electionContract from "../artifacts/contracts/Election.sol/Election.json"

const ethers=require('ethers');

function VoterRegistration() {

  const [name, setName] = useState("");
  const [ethAddress, setEthaddress] = useState("");
  const [email, setEmail] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [voterId, setVoterId] = useState("");
  const [ipfsImageHash, setIpfsImageHash] = useState("");
  const [password, setPassword] = useState('');

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
    <div>
      <h2>Voter Registration</h2>
      <form onSubmit={registerVoter}>
        <input type="text" placeholder="Name" onChange={(e) => setName(e.target.value)} required />
        <input type="text" placeholder="Email" onChange={(e) => setEmail(e.target.value)} required />
        <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} required />
        <input type="text" placeholder="Ethereum Address" onChange={(e) => setEthaddress(e.target.value)} required />
        <input type="text" placeholder="Mobile Number" onChange={(e) => setMobileNumber(e.target.value)} required />
        <input type="text" placeholder="Voter ID" onChange={(e) => setVoterId(e.target.value)} required />
        <input type="text" placeholder="IPFS Image Hash" onChange={(e) => setIpfsImageHash(e.target.value)} required />
        <button type="submit">Register Candidate</button>
      </form>
    </div>
  )
}

export default VoterRegistration;
