// src/components/HomePage.js

import React from "react";
import { Link } from "react-router-dom";

function HomePage({ account }) {
  return (
    <div>
      <h2>Welcome to Online Voting System</h2>
      {account ? (
        <div>
          <h3>Options:</h3>
          <ul>
            <li>
              <Link to="/voter-registration">Voter Registration</Link>
            </li>
            <li>
              <Link to="/voter-login">Voter Login</Link>
            </li>
            <li>
              <Link to="/candidate-registration">Candidate Registration</Link>
            </li>
          </ul>
        </div>
      ) : (
        <p>Please connect your wallet to access the options.</p>
      )}
    </div>
  );
}

export default HomePage;
