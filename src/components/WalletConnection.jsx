

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

import React from "react";
import { Link } from "react-router-dom";
import './css/WalletConnection.css'

function WalletConnection({ connectWallet, account }) {
  return (
    <div>
      {account ? (
        <p>Wallet connected: {account}</p>
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
