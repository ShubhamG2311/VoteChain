import React, { useState, useEffect } from 'react';
import './css/CandidateRegistration.css';
import electionContract from '../artifacts/contracts/Election.sol/Election.json';
import { useNavigate } from 'react-router-dom';
import { Link } from "react-router-dom";
import contractAddress from '../contractAddress.json';
const ethers = require('ethers');

function OwnerDashboard() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isVotingOpen, setIsVotingOpen] = useState(false);
  const [votingStatus, setVotingStatus] = useState("");
  const [winnerId, setWinnerId] = useState(-1);
  const [winnerName, setWinnerName] = useState("");
  const [winnerVoteCount, setWinnerVoteCount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [resultsDeclared, setResultsDeclared] = useState(false);
  const [account, setAccount] = useState(null);

  const navigate = useNavigate();

  const handleVotingOpen = async () => {
    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();
    const election = new ethers.Contract(contractAddress.contractAddress, electionContract.abi, signer);

    const votingOpen = await election.getIsVotingOpen();

    setIsVotingOpen(votingOpen);

    if (isVotingOpen) {
      setVotingStatus('Voting is currently open');
    } else {
      checkResultsDeclared();
      getWinnersDetails();
      setVotingStatus('Voting is currently closed');
    }
  };

  const closeVoting = async () => {
    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();
    const election = new ethers.Contract(contractAddress.contractAddress, electionContract.abi, signer);

    await election.closeElection();

    setIsVotingOpen(false);
    setVotingStatus('Voting is currently closed');
  };

  const openVoting = async () => {
    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();
    const election = new ethers.Contract(contractAddress.contractAddress, electionContract.abi, signer);

    await election.openElection();

    setIsVotingOpen(true);
    setVotingStatus('Voting is currently open');
  };

  const declareResults = async () => {
    setIsLoading(true);

    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const election = new ethers.Contract(contractAddress.contractAddress, electionContract.abi, signer);

      try {
        await election.declareElectionResult();
      }

      finally {
        const id = await election.getWinnerId();
        const name = await election.getWinnerName();
        const voteCount = await election.getWinnerVoteCount();

        console.log(Number(id));
        console.log(String(name));
        console.log(Number(voteCount));

        setWinnerId(Number(id));
        setWinnerName(String(name));
        setWinnerVoteCount(Number(voteCount));

        setResultsDeclared(true);
      }

      

      
    } catch (error) {
      console.error('Error declaring results:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('owner');
    setIsLoggedIn(false);
    navigate('/home');
  };

  const checkResultsDeclared = async () => {
    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();
    const election = new ethers.Contract(contractAddress.contractAddress, electionContract.abi, signer);

    const tempCheck = await election.getResultsDeclared();

    console.log(tempCheck);

    setResultsDeclared(tempCheck);
  }

  const getWinnersDetails = async () => {
    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();
    const election = new ethers.Contract(contractAddress.contractAddress, electionContract.abi, signer);
    let id;
    let name; 
    let voteCount;
    try {
      id = await election.getWinnerId();
      name = await election.getWinnerName();
      voteCount = await election.getWinnerVoteCount();

    }
    catch (error) {
      console.log(error);
    }
    finally {
      console.log(Number(id));
      console.log(String(name));
      console.log(Number(voteCount));

      setWinnerId(Number(id));
      setWinnerName(String(name));
      setWinnerVoteCount(Number(voteCount));
    }
    
    
  }

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
    const tempAccount = localStorage.getItem('owner');
    if (tempAccount !== null) {
      setIsLoggedIn(true);
      handleVotingOpen();
    }
    
  }, []);

  return (
    <div>
      <p>Owner Dashboard</p>
      {account ? (
        <div>
          {isLoading ? (
          <p>Loading results...</p>
        ) : (
          <div>
            <button onClick={handleLogout}>Logout</button>
            {isVotingOpen ? (
              <div>
                <button onClick={closeVoting}>Close Voting</button>
              </div>
            ) : (
              <div>
                <button onClick={openVoting}>Open Voting</button>
              </div>
            )}
            <p>{votingStatus}</p>
            
            {!resultsDeclared ? (
              <div>
                <button onClick={declareResults}>Declare Results</button>
                <p>Results are not yet declared</p>
              </div>
            ) : (
              <div>
                <p>Congratulations to the winner.</p>
                <p>Candidate Id: {winnerId}</p>
                <p>Candidate Name: {winnerName}</p>
                <p>Candidate Vote Count: {winnerVoteCount}</p>
              </div>
            )}
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
  );
}

export default OwnerDashboard;
