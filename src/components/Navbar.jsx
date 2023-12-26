import React, { useState,useEffect } from "react";
import { Link } from "react-router-dom";

import './css/WalletConnection.css'

function Navbar({methodUsed, isLogOut}) {

  return (
    <div>
        {isLogOut ? (
          <div className="header-part" style={{ display: "flex", justifyContent: "space-between" }}>
            <div >
              <button className="tab-button">Home</button>
              <button className="tab-button">Guide</button>
              <button className="tab-button">About Us</button>
              
            </div>
            <div className="logout-button">
            <button onClick={methodUsed} style={{ marginTop: '19px', marginRight: '20px' }} className="btn btn-primary">Logout</button>
            </div>
          </div>
        ) : (
          <div className="header-part">
            <button className="tab-button">Home</button>
            <button className="tab-button">Guide</button>
            <button className="tab-button">About Us</button>
          </div>
        )}
      
    </div>
  );
}

export default Navbar;