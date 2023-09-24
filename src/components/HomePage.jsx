// src/components/HomePage.js

import React from "react";
import { Link } from "react-router-dom";

function HomePage({ account, electionContract }) {
  return (
    <div>
      <h2>Welcome to Online Voting System</h2>
      {account ? (
        <div>
          <h3>Home Page</h3>
          <Link to="/voter-registration">
            <button className="option-button">Voter Registration</button>
          </Link>
          <br/>
          <Link to="/voter-login">
            <button className="option-button">Voter Login</button>
          </Link>
          <br/>
          <Link to="/candidate-registration">
            <button className="option-button" >Candidate Registration</button>
          </Link>
        </div>
      ) : (
        <div>
          <p>Please connect your wallet to access the options.</p>
          <Link to="/">
              <button>Connect Wallet</button>
          </Link>
        </div>
      )}
    </div>
  );
}

export default HomePage;
