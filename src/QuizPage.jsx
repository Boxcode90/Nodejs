import "./App.css";
import React, { useState } from "react";
function App() {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen(!menuOpen);

  return (
    <div>


<div className="app">
      {/* Hamburger Icon */}
      <div
        className={`hamburger ${menuOpen ? "open" : ""}`}
        onClick={toggleMenu}
      >
        <span></span>
        <span></span>
        <span></span>
      </div>

      {/* Overlay Menu */}
      <div className={`overlay ${menuOpen ? "show" : ""}`}>
        <ul>
          <li>Home</li>
          <li>Menu</li>
          <li>Login</li>
        </ul>
      </div>

      {/* Main Content */}
      <div className={`content ${menuOpen ? "blurred" : ""}`}>
     
      </div>
    </div>
    
      {/* Top Navbar */}
      <div className="navbar">
        <h1 style={{
        fontSize:"30px",
        display: "flex",
        justifyContent: "center", // horizontal
        alignItems: "center",     // vertical
        }}>Quiz App</h1>
      </div>
 
      {/* Main Content */}
      <div className="main-content">
        <button className="button-1">Create Quiz</button>
        <button className="button-1">View History</button>
      </div>

    
    </div>
  );
}

export default App;
