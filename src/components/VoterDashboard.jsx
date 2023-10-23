import React, { useState, useEffect } from 'react';
import electionContract from '../artifacts/contracts/Election.sol/Election.json';
import contractAddress from "../contractAddress.json"
import { useNavigate } from 'react-router-dom';
import { Link } from "react-router-dom";
const ethers = require('ethers');

function VoterDashboard() {
  const [candidates, setCandidates] = useState([]);
  const [voted, setVoted] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [hasVoted, setHasVoted] = useState(false);
  const [voterEthAddress, setVoterEthAddress] = useState("");
  const [isElectionOpen, setIsElectionOpen] = useState(false);
  const [resultsDeclared, setResultsDeclared] = useState(false);
  const [winnerId, setWinnerId] = useState(-1);
  const [winnerName, setWinnerName] = useState("");
  const [winnerVoteCount, setWinnerVoteCount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const fetchData = async () => {
    try {
      await fetchCandidates();
    } catch (error) {
      console.error(error);
    }
  };

  const checkIsElectionOpen = async () => {
    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();
    const election = new ethers.Contract(contractAddress.contractAddress, electionContract.abi, signer);

    const tempOpen = await election.getIsVotingOpen();

    setIsElectionOpen(tempOpen);
  }

  const checkResultsDeclared = async () => {
    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();
    const election = new ethers.Contract(contractAddress.contractAddress, electionContract.abi, signer);

    const tempresults = await election.getResultsDeclared();

    setResultsDeclared(tempresults);
  }

  const getResults = async () => {
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
      catch (e) {
        console.log(e);
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

  const checkHasVoted = async () => {

      await window.ethereum.request({ method: "eth_requestAccounts" });
      const accounts = await window.ethereum.request({ method: "eth_accounts" });

      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const election = new ethers.Contract(contractAddress.contractAddress, electionContract.abi, signer);

      const votedOrNot = await election.checkHasVoted(accounts[0]);

      setHasVoted(votedOrNot);
  }

  useEffect(() => {
    const tempAccount = localStorage.getItem("email");
    const tempAddress = localStorage.getItem("ethAddress");
    setVoterEthAddress(tempAddress)
    console.log(tempAddress);
    if (tempAccount !== null) {
      setIsLoggedIn(true);
    }
    if (tempAddress !== "") {
      handleHasVoted();
    }
    
    fetchData();
    checkIsElectionOpen();
    
    if (!isElectionOpen) {
      checkResultsDeclared();
      getResults();
    }
    
    checkHasVoted();
  }, []);

  const handleHasVoted = () => {
    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = provider.getSigner();
    const election = new ethers.Contract(contractAddress.contractAddress, electionContract.abi, signer);
  
    election.checkHasVoted(voterEthAddress)
      .then((checkVoted) => {
        setHasVoted(checkVoted);
      })
      .catch((error) => {
        console.error("Error checking if the voter has voted:", error);
      });
  }
  
  const fetchCandidates = async () => {
    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const election = new ethers.Contract(contractAddress.contractAddress, electionContract.abi, signer);

      const count = await election.getCandidatesCount();

      let temp = [];
      for (let i = 1; i <= count; i++) {
        const candidate = await election.getCandidate(i);
        temp.push(candidate);
      }
      setCandidates(temp);
    } catch (error) {
      console.error('Error fetching candidates:', error);
    }
  };

  const handleVote = async (candidateId) => {
    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const election = new ethers.Contract(contractAddress.contractAddress, electionContract.abi, signer);

      const tx = await election.vote(candidateId, await signer.getAddress());
      await tx.wait();
      console.log("Success in Voting");
      setHasVoted(true);
      fetchCandidates();
    } catch (error) {
      console.error(error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("email");
    setIsLoggedIn(false);
    
    // Redirect the user to the login page or any other desired location
    navigate('/home');
  };


  return (
    <div className="voter-dashboard">
      <h1>Voter Dashboard</h1>

      {isLoggedIn ? (
        <div>
        <button onClick={handleLogout}>Logout</button>

        {isElectionOpen ? (
          <div>
            {hasVoted ? (
              <div>
                <p>You have already voted.</p>
              </div>
            ) : (
              <div>
                {candidates.map((candidate) => (
              <div key={candidate[2]} className="candidate-card">
                <div className="candidate-info">
                  <h2>{candidate[0]}</h2>
                  <p>Candidate Id: {candidate[2]}</p>
                  <p>Email Address: {candidate[1]}</p>
                  <p>Date of Birth: {candidate[4]}</p>
                </div>
                <div className="actions">
                  {!voted ? (
                    <button onClick={() => handleVote(candidate[2])}>Vote</button>
                  ) : (
                    <p>You have already voted</p>
                  )}
                </div>
              </div>
            ))}
              </div>
            )}
          </div>
        ) : (
          <div>
            {resultsDeclared ? (
              <div>
                <p>Congratulations to the winner.</p>
                <p>Candidate Id: {winnerId}</p>
                <p>Candidate Name: {winnerName}</p>
                <p>Candidate Vote Count: {winnerVoteCount}</p>
              </div>
            ) : (
              <div>
                <p>Election is yet to start. Please check later.</p>
              </div>
            )}
          </div>
        )}
        </div>
      ) : (
        <div>
          <p>You are not logged in. Please login to view the voter dashboard.</p>
          <Link to="/home">
          <button className="btn btn-primary">Home</button>
        </Link>
        </div>
      )}
      
      
      
    </div>
  );
}

export default VoterDashboard;
