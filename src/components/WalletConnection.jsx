

// import React from "react";
// import { Link } from "react-router-dom";

// function WalletConnection({ connectWallet, account }) {
//   return (
//     <div>
//       {account ? (
//         <p>Wallet connected: {account}</p>
//       ) : (
//         <button onClick={connectWallet}>Connect Wallet</button>
//       )}
//     </div>
//   );
// }

// export default WalletConnection;

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
          <p>Wallet connected: {account}</p>
          <Link to="/home">
            <button className="option-button btn btn-primary">Home</button>
          </Link>
        </div>
        
      ) : (
        <div class="initialbutton">
          <button onClick={connectWallet} className="btn btn-primary">
            Connect Wallet
          </button>
        </div>
        
        
      )}
    </div>
  );
}

export default WalletConnection;
