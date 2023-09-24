import React from 'react'
import { useState, useEffect } from 'react';
import { Web3Provider } from 'ethers';
import config from '../config.json'
import electionContract from "../artifacts/contracts/Election.sol/Election.json"

const ethers=require('ethers');



function CandidateRegistration({account}) {
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

  const registerCandidate = async (e) => {

      e.preventDefault();

      try {
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

      
      }
      catch {
        console.log(e);
      }
      
    }
    const getCount = async () => {

      // Create a Web3Provider instance
      // await window.ethereum.request({ method: "eth_requestAccounts" });
      // const provider = new ethers;
      const provider = new ethers.BrowserProvider(window.ethereum);
      // console.log(provider);

      console.log(electionContract.abi);

      const signer = await provider.getSigner();

      const election = new ethers.Contract("0x5FbDB2315678afecb367f032d93F642f64180aa3", electionContract.abi, signer)

  
      const candidatesCount = await election.getCandidatesCount();

    
      console.log(`Candidate registration successful! Total candidates registered: ${candidatesCount}`);
      setNumberOfCandidates(candidatesCount);
    }

  return (
    <div>
      <h2>Candidate Registration</h2>
      <form onSubmit={registerCandidate}>
        <input type="text" placeholder="Name" onChange={(e) => setName(e.target.value)} required />
        <input type="text" placeholder="Email" onChange={(e) => setEmail(e.target.value)} required />
        <input type="text" placeholder="Ethereum Address" onChange={(e) => setEthaddress(e.target.value)} required />
        <input type="text" placeholder="Mobile Number" onChange={(e) => setMobileNumber(e.target.value)} required />
        <input type="text" placeholder="Date of Birth" onChange={(e) => setDateOfBirth(e.target.value)} required />
        <input type="text" placeholder="Aadhar Number" onChange={(e) => setAadharNumber(e.target.value)} required />
        <input type="text" placeholder="Voter ID" onChange={(e) => setVoterId(e.target.value)} required />
        <input type="text" placeholder="Home Address" onChange={(e) => setHomeAddress(e.target.value)} required />
        <input type="text" placeholder="IPFS Image Hash" onChange={(e) => setIpfsImageHash(e.target.value)} required />
        <button type="submit">Register Candidate</button>
      </form>
      <p>
      <button type="button" onClick={getCount}>Get count</button>
      </p>
    </div>
  );
}

export default CandidateRegistration;
