import React, { useEffect, useState } from "react";
import { BrowserRouter as BrowserRouter, Route, Routes, Navigate, Link } from "react-router-dom";
import HomePage from "./components/HomePage";
import WalletConnection from "./components/WalletConnection";
import VoterRegistration from "./components/VoterRegistration";
import VoterLogin from "./components/VoterLogin";
import CandidateRegistration from "./components/CandidateRegistration";
import VoterDashboard from "./components/VoterDashboard";
import electionContract from "./abis/Election.json" // Import the JSON file
import OwnerDashboard from "./components/OwnerDashboard";
import VerifyOtp from "./components/VerifyOtp";
import OwnerLogin from "./components/OwnerLogin";
import VoterImageRegister from "./components/VoterImageRegister";
import CandidateImageRegister from "./components/CandidateImageRegister";
import VerifyFace from "./components/VerifyFace";

const ethers = require("ethers");

function App() {
  
  const [account, setAccount] = useState(null);
  // const [isConnected, setIsConnected] = useState(false);

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

  return (
    <BrowserRouter>
      <Routes>
        <Route
          exact
          path="/"
          element={account ? <Navigate to="/home" /> : <WalletConnection/>}
        />
        <Route
          exact path="/home"
          element={<HomePage/>}
        />
        <Route
          exact path="/voter-registration"
          element={<VoterRegistration/>}
        />
        <Route
          exact path="/voter-login"
          element={<VoterLogin/>}
        />
        <Route
          exact path="/candidate-registration"
          element={<CandidateRegistration/>} // Pass the ABI as a prop
        />
        <Route
          exact path="/voter-dashboard"
          element={<VoterDashboard/>} // Pass the ABI as a prop
        />
        <Route
          exact path="/owner-login"
          element={<OwnerLogin/>} // Pass the ABI as a prop
        />
        <Route
          exact path="/owner-dashboard"
          element={<OwnerDashboard/>} // Pass the ABI as a prop
        />
        <Route
          exact path="/verify-otp"
          element={<VerifyOtp/>} // Pass the ABI as a prop
        />
        <Route
          exact path="/voter-image-register"
          element={<VoterImageRegister/>} // Pass the ABI as a prop
        />
        <Route
          exact path="/verify-face"
          element={<VerifyFace/>} // Pass the ABI as a prop
        />
        <Route
          exact path="/candidate-image-register"
          element={<CandidateImageRegister/>} // Pass the ABI as a prop
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
