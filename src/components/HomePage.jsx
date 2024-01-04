// import React, { useEffect, useState } from 'react';
// import { Link } from "react-router-dom";
// import { useNavigate } from 'react-router-dom';
// import contractAddress from "../contractAddress.json";
// import "./css/HomePage.css";

// function HomePage({}) {

//   const [account, setAccount] = useState(null);

//   const checkWalletConnection = async () => {
//     if (typeof window.ethereum !== "undefined") {
//       try {
//         // Check if the wallet is connected
//         const accounts = await window.ethereum.request({ method: "eth_accounts" });
//         if (accounts.length > 0) {
//           setAccount(accounts[0]);
//         }
//       } catch (error) {
//         console.error("Wallet connection error:", error);
//       }
//     }
//   };

//   useEffect(() => {
//     checkWalletConnection();
//   }, []);

//   return (
//     <div className="container">
//       <div className="header-part">
//         <button className="tab-button">Tab 1</button>
//         <button className="tab-button">Tab 2</button>
//         <button className="tab-button">Tab 3</button>
//       </div>
//       <h2 style={{ color: "black", textAlign: "center", fontSize: "50px" }} className="heading">
//         Welcome to Online Voting System
//       </h2>
      
//       {account ? (
//         <div>
//           <div>
//             <div className="button-container">
//               <div className="row">
//                 <div className="col-sm-6 mb-3 mb-sm-0">
//                   <div className="card">
//                     <div className="card-body">
//                       <h3 className="card-title">Voter Registration</h3>
//                       <p className="card-text">
//                         With supporting text below as a natural lead-in to additional content.
//                       </p>
//                       <Link to="/voter-registration">
//                         <button className="option-button btn btn-primary">Register</button>
//                       </Link>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//               <div className="row">
//                 <div className="col-sm-6 mb-3 mb-sm-0">
//                   <div className="card">
//                     <div className="card-body">
//                       <h3 className="card-title">Voter Login</h3>
//                       <p className="card-text">
//                         With supporting text below as a natural lead-in to additional content.
//                       </p>
//                       <Link to="/voter-login">
//                         <button className="option-button btn btn-primary">Login</button>
//                       </Link>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//               <div className="row">
//                 <div className="col-sm-6 mb-3 mb-sm-0">
//                   <div className="card">
//                     <div className="card-body">
//                       <h3 className="card-title">Candidate Registration</h3>
//                       <p className="card-text">
//                         With supporting text below as a natural lead-in to additional content.
//                       </p>
//                       <Link to="/candidate-registration">
//                         <button className="option-button btn btn-primary">Register</button>
//                       </Link>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//               <Link to="/owner-login">
//                 <button className="option-button btn btn-primary">Owner Login</button>
//               </Link>
//             </div>
//           </div>
//         </div>
//       ) : (
//         <div>
//           <p>Wallet is not connected. Please connect the wallet.</p>
//           <Link to="/">
//             <button className="btn btn-primary">Connect</button>
//           </Link>
//         </div>
//       )}
      
//     </div>
//   );
// }

// export default HomePage;

import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import Navbar from "./Navbar";
import { useNavigate } from 'react-router-dom';
import contractAddress from "../contractAddress.json";
import "./css/HomePage.css";

function HomePage({}) {

  const [account, setAccount] = useState(null);

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

  const handleLogout = async () => {

  }

  useEffect(() => {
    checkWalletConnection();
  }, []);

  return (
    <div className="container">
      <Navbar isLogOut={false}/>
      
      <h2 style={{ color: "black", textAlign: "center", fontSize: "50px" }} className="heading">
        Welcome to Online Voting System
      </h2>
      
      {account ? (
        <div>
          <div>
            <div className="button-container">
            <div className="row">
                <div className="col-sm-6 mb-3 mb-sm-0">
                  <div className="card">
                    <div className="card-body">
                      <h3 className="card-title">Admin Login</h3>
                      <p className="card-text">
                        Admin can login here using the password provided already by EC.
                      </p>
                      <Link to="/owner-login">
                        <button className="option-button btn btn-primary">Login</button>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-sm-6 mb-3 mb-sm-0">
                  <div className="card">
                    <div className="card-body">
                      <h3 className="card-title">Voter Registration</h3>
                      <p className="card-text">
                        Voter need to register here with all his information, facial and document verification.
                      </p>
                      <Link to="/voter-registration">
                        <button className="option-button btn btn-primary">Register</button>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-sm-6 mb-3 mb-sm-0">
                  <div className="card">
                    <div className="card-body">
                      <h3 className="card-title">Voter Login</h3>
                      <p className="card-text">
                        Voter can login to dashboard after facial recognition to vote and view results of election.
                      </p>
                      <Link to="/voter-login">
                        <button className="option-button btn btn-primary">Login</button>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-sm-6 mb-3 mb-sm-0">
                  <div className="card">
                    <div className="card-body">
                      <h3 className="card-title">Candidate Registration</h3>
                      <p className="card-text">
                      Candidate need to register here with all information along with verifications.
                      </p>
                      <Link to="/candidate-registration">
                        <button className="option-button btn btn-primary">Register</button>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
              
              
            </div>
          </div>
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

export default HomePage;
