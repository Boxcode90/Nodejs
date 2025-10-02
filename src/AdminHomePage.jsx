import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import './QuizPage.css';

function QuizPage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const toggleMenu = () => setMenuOpen(!menuOpen);

  return (
    <div className="quiz-container">
      {/* Hamburger */}
      <div className={`hamburger ${menuOpen ? "open" : ""}`} onClick={toggleMenu}>
        <span></span>
        <span></span>
        <span></span>
      </div>

      {/* Overlay Menu */}
      <div className={`overlay-menu ${menuOpen ? "show" : ""}`}>
        <ul>
          <li onClick={() => {navigate("/"); setMenuOpen(false)}}>Home</li>
          <li onClick={() => {navigate("/"); setMenuOpen(false)}}>Logout</li>
          <li onClick={() => {alert("History clicked"); setMenuOpen(false)}}>History</li>
          <li onClick={() => {alert("Settings clicked"); setMenuOpen(false)}}>Settings</li>
        </ul>
      </div>

      {/* Page Header */}
      <h1 className="quiz-header">Quiz Dashboard</h1>

      {/* Main Options */}
      <div className="quiz-options">
        <button className="button-quiz" onClick={() => navigate("/QuizCreation")}>
          Create Quiz
        </button>
        <button className="button-quiz" onClick={() => alert("Viewing history...")}>
          View History
        </button>
      </div>
    </div>
  );
}

export default QuizPage;
