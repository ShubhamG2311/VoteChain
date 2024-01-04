import Navbar from "./Navbar";
import React, { useState,useEffect } from "react";
import { Link } from "react-router-dom";
import './css/WalletConnection.css'

function WalletConnection({}) {

  const [account, setAccount] = useState(null);

  useEffect(() => {
    connectWallet();
  }, []);

  const connectWallet = async () => {
    if (typeof window.ethereum !== "undefined") {
      try {
        // Request account access from the user
        await window.ethereum.request({ method: "eth_requestAccounts" });
        const accounts = await window.ethereum.request({ method: "eth_accounts" });
        console.log("Accounts are: ", accounts);
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
    <div>
      {account ? (
        <div>
        <Navbar/>
        <div >
          
          <div style={{textAlign: 'center' , paddingTop: '70px'}}>
            <p >Wallet connected: {account}</p>
            <Link to="/home">
              <button className="option-button btn btn-primary">Home</button>
            </Link>
          </div>
        </div>
        </div>
        
      ) : (
        <div>
        <Navbar/>
        <div class="initialbutton">
          
          <button onClick={connectWallet} className="btn btn-primary">
            Connect Wallet
          </button>
        </div>
        </div>
        
        
      )}
    </div>
  );
}

export default WalletConnection;
