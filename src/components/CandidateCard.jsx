import React, { useState,useEffect } from "react";
import { Link } from "react-router-dom";

import './css/WalletConnection.css'

function CandidateCard({handleVote, candidate}) {

  return (
    
        <div >
                <div className="rowcard">
                  <div className="col-sm-6 mb-3 mb-sm-0">
                    <div className="cardcard">
                      <div className="card-body">
                        <h3 className="card-title">{candidate[0]}</h3>
                        <p className="card-text">
                                <span style={{ fontWeight: 'bold' }}>Candidate Id:</span> {candidate[2]}
                                <br />
                                <span style={{ fontWeight: 'bold' }}>Email Address:</span> {candidate[1]}
                                <br />
                                <span style={{ fontWeight: 'bold' }}>Date of Birth:</span> {candidate[4]}
                                <br/>
                            
                                <button style={{ marginTop: '30px' }} className='btn btn-primary' onClick={() => handleVote(candidate[2])}>Vote</button>
                        </p>
                      
                        {/* <button onClick={} className='option-button btn btn-primary'>Close Voting</button> */}
                      
                    </div>
                  </div>
                </div>
              </div>
            </div>
      
   
  );
}

export default CandidateCard;