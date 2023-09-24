import React, { useEffect, useState } from "react";
import { BrowserRouter as BrowserRouter, Route, Routes, Navigate, Link } from "react-router-dom";
import HomePage from "./components/HomePage";
import WalletConnection from "./components/WalletConnection";
import VoterRegistration from "./components/VoterRegistration";
import VoterLogin from "./components/VoterLogin";
import CandidateRegistration from "./components/CandidateRegistration";
import VoterDashboard from "./components/VoterDashboard";
import electionContract from "./abis/Election.json" // Import the JSON file

const ethers = require("ethers");

function App() {
  
  const [account, setAccount] = useState(null);

  useEffect(() => {
    // Check wallet connection when the app starts
    checkWalletConnection();
  }, []);

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

  const connectWallet = async () => {
    if (typeof window.ethereum !== "undefined") {
      try {
        // Request account access from the user
        await window.ethereum.request({ method: "eth_requestAccounts" });
        const accounts = await window.ethereum.request({ method: "eth_accounts" });
        if (accounts.length > 0) {
          setAccount(accounts[0]);
        }
      } catch (error) {
        console.error("Wallet connection error:", error);
      }
    } else {
      console.error("Metamask not detected");
    }
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route
          exact
          path="/"
          element={account ? <Navigate to="/home" /> : <WalletConnection connectWallet={connectWallet} account={account} />}
        />
        <Route
          path="/home"
          element={<HomePage account={account} />}
        />
        <Route
          path="/voter-registration"
          element={<VoterRegistration account={account} />}
        />
        <Route
          path="/voter-login"
          element={<VoterLogin account={account} />}
        />
        <Route
          path="/candidate-registration"
          element={<CandidateRegistration account={account}/>} // Pass the ABI as a prop
        />
        <Route
          path="/voter-dashboard"
          element={<VoterDashboard account={account}/>} // Pass the ABI as a prop
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
