// // src/components/HomePage.js

// import React from "react";
// import { Link } from "react-router-dom";

// function HomePage({ account, electionContract }) {
//   return (
//     <div>
//       <h2>Welcome to Online Voting System</h2>
//       {account ? (
//         <div>
//           <h3>Home Page</h3>
//           <Link to="/voter-registration">
//             <button className="option-button">Voter Registration</button>
//           </Link>
//           <br/>
//           <Link to="/voter-login">
//             <button className="option-button">Voter Login</button>
//           </Link>
//           <br/>
//           <Link to="/candidate-registration">
//             <button className="option-button" >Candidate Registration</button>
//           </Link>
//         </div>
//       ) : (
//         <div>
//           <p>Please connect your wallet to access the options.</p>
//           <Link to="/">
//               <button>Connect Wallet</button>
//           </Link>
//         </div>
//       )}
//     </div>
//   );
// }

// export default HomePage;


// src/components/HomePage.js

import React from "react";
import { Link } from "react-router-dom";
import "./css/HomePage.css";

function HomePage({ account, electionContract }) {
  return (
    
    <div className="container">
      <div className="header-part" >
        <button className="tab-button">Tab 1</button>
        <button className="tab-button">Tab 2</button>
        <button className="tab-button">Tab 3</button>
      </div>
      <h2 style={{ color: "black", textAlign: "center", fontSize: "50px"}} class="heading">Welcome to Online Voting System</h2>
      {account ? (
        
        <div>
          <div className="button-container">
            
              <div class="row" >
                <div class="col-sm-6 mb-3 mb-sm-0">
                  <div class="card">
                    <div class="card-body">
                      <h3 class="card-title">Voter Registration</h3>
                      <p class="card-text">With supporting text below as a natural lead-in to additional content.</p>
                        <Link to="/voter-registration">
                            <button className="option-button" class="btn btn-primary">Register</button>
                        </Link>
                      
                    </div>
                  </div>
                </div>
              </div>
            
            
              <div class="row">
                  <div class="col-sm-6 mb-3 mb-sm-0">
                    <div class="card">
                      <div class="card-body">
                        <h3 class="card-title">Voter Login</h3>
                        <p class="card-text">With supporting text below as a natural lead-in to additional content.</p>
                          <Link to="/voter-login">
                            <button className="option-button" class="btn btn-primary">Login</button>
                          </Link>
                      </div>
                    </div>
                  </div>
                </div>
            
            
            <div class="row">
                <div class="col-sm-6 mb-3 mb-sm-0">
                  <div class="card">
                    <div class="card-body">
                      <h3 class="card-title">Candidate Registration</h3>
                      <p class="card-text">With supporting text below as a natural lead-in to additional content.</p>
                      <Link to="/candidate-registration">
                        <button className="option-button" class="btn btn-primary">Register</button>
                      </Link>

                    </div>
                  </div>
                </div>
              </div>
            
          </div>
        </div>
      ) : (
        <div>
          <p>Please connect your wallet to access the options.</p>
          <Link to="/">
            <button className="btn btn-primary">Connect Wallet</button>
          </Link>
        </div>
      )}
      {/* Apply the "header-part" class to the section with tabs */}
      
    </div>
  );
}

export default HomePage;
