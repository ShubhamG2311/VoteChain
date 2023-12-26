import React, { useState, useEffect } from 'react';
import './css/OwnerDashboard.css';
import electionContract from '../artifacts/contracts/Election.sol/Election.json';
import { useNavigate } from 'react-router-dom';
import { Link } from "react-router-dom";
import contractAddress from '../contractAddress.json';
import Navbar from "./Navbar";
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
    <div className='ownerdash'>
      <Navbar methodUsed={handleLogout} isLogOut={true}/>
      <h1>Owner Dashboard</h1>
      {account ? (
        <div>
          {isLoading ? (
          <p>Loading results...</p>
        ) : (
          <div className='action'>
            
            
            {isVotingOpen ? (
              <div className="button-containercard">
                <div className="rowcard">
                  <div className="col-sm-6 mb-3 mb-sm-0">
                    <div className="cardcard">
                      <div className="card-bodycard">
                        <h3 className="card-title">Close Voting</h3>
                        <p className="card-text">
                          Voting started.
                        </p>
                      
                        <button onClick={closeVoting} className='option-button btn btn-primary'>Close Voting</button>
                      
                    </div>
                  </div>
                </div>
              </div>
            </div>
             
            ) : (
              <div className="button-containercard" >
                <div className="rowcard">
                  <div className="col-sm-6 mb-3 mb-sm-0">
                    <div className="cardcard">
                      <div className="card-bodycard">
                        <h3 className="card-title">Start Voting</h3>
                        <p className="card-text">
                          Voting is currently closed.
                        </p>
                      
                        <button onClick={openVoting} className='option-button btn btn-primary'>Open Voting</button>
                      
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
            )}
            
            {!resultsDeclared ? (
               <div className="button-containercard">
                <div className="rowcard">
                <div className="col-sm-6 mb-3 mb-sm-0">
                  <div className="cardcard">
                    <div className="card-bodycard">
                      <h3 className="card-title">Declare Results</h3>
                      <p className="card-text">
                      Results are not yet declared
                      </p>
                      
                      <button onClick={declareResults} className='option-button btn btn-primary'>Declare Results</button>
                      
                    </div>
                  </div>
                </div>
              </div>
            </div>
             
            ) : (
              <div>
                <div class="modal fade" id="myModal" role="dialog" style={{ paddingTop: '10px' ,display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <div class="modal-dialog">
                        <div class="carddash" style={{textAlign: 'center' , padding: '1.25rem'}}>
                            <div class="text-right cross"> <i class="fa fa-times"></i> </div>
                            <div class="card-body text-center" > <img src="https://img.icons8.com/bubbles/200/000000/trophy.png"/>
                                <h4>CONGRATULATIONS!</h4>
                                <span style={{ fontWeight: 'bold' }}>Candidate Id:</span> {winnerId}
                                <br />
                                <span style={{ fontWeight: 'bold' }}>Candidate Name:</span> {winnerName}
                                <br />
                                <span style={{ fontWeight: 'bold' }}>Candidate Vote Count:</span> {winnerVoteCount}
                                <br/>
                                
                            </div>
                        </div>
                    </div>
                </div>
                
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
