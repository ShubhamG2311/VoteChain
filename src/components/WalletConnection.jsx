

import React from "react";
import { Link } from "react-router-dom";

function WalletConnection({ connectWallet, account }) {
  return (
    <div>
      {account ? (
        <p>Wallet connected: {account}</p>
      ) : (
        <button onClick={connectWallet}>Connect Wallet</button>
      )}
    </div>
  );
}

export default WalletConnection;
