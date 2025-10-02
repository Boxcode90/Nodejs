// LoginPage.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./LoginPage.css";
import "./button.css";

function LoginPopup({ show, onClose }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  if (!show) return null;

  const correctUsername = "rafiq";
  const correctPassword = "12345678";

  function handleSubmit() {
    if (username === correctUsername && password === correctPassword) {
      navigate("/QuizPage");
    } else {
      alert("Invalid username or password!");
    }
  }

  return (
    <div className="overlay">
      <div className="popup">
        <h2>Admin Login</h2>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <div className="popup-buttons">
          <button onClick={handleSubmit}>Submit</button>
          <button onClick={onClose}>Close</button>
        </div>
      </div>
    </div>
  );
}

// ---- User Login Popup ----
function UserLoginPopup({ show, onClose }) {
  const [guestName, setGuestName] = useState("");
  const [quizCode, setQuizCode] = useState("");
  const [mode, setMode] = useState(null); // null | "user" | "guest"
  const navigate = useNavigate();

  if (!show) return null;

  function handleGuestSubmit() {
    if (!guestName.trim() || !quizCode.trim()) {
      alert("Please enter both Name and Quiz Code!");
      return;
    }
    // store in localStorage
    localStorage.setItem("guestName", guestName);
    localStorage.setItem("quizCode", quizCode);

    navigate("/UserLogin", { state: { guestName, quizCode: quizCode.trim() } });
  }

  return (
    <div className="overlay">
      <div className="popup">
        <h2>User Login</h2>

        {!mode && (
          <div className="popup-buttons">
            <button onClick={() => setMode("user")}>User Login</button>
            <button onClick={() => setMode("guest")}>Guest Login</button>
            <button onClick={onClose}>Close</button>
          </div>
        )}

        {mode === "user" && (
          <div>
            <p>(Reserved for future user login)</p>
            <div className="popup-buttons">
              <button onClick={() => setMode(null)}>Back</button>
            </div>
          </div>
        )}

        {mode === "guest" && (
          <div>
            <input
              type="text"
              placeholder="Enter your name"
              value={guestName}
              onChange={(e) => setGuestName(e.target.value)}
            />
            <input
              type="text"
              placeholder="Enter Quiz Code"
              value={quizCode}
              onChange={(e) => setQuizCode(e.target.value)}
            />
            <div className="popup-buttons">
              <button onClick={handleGuestSubmit}>Continue as Guest</button>
              <button onClick={() => setMode(null)}>Back</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// ---- Main Page ----
function LoginPage() {
  const [showAdminLogin, setShowAdminLogin] = useState(false);
  const [showUserLogin, setShowUserLogin] = useState(false);

  return (
    <div className="app-container">
      <h1 className="login-head">Login</h1>

      <button className="button-1" onClick={() => setShowAdminLogin(true)}>
        Admin Login
      </button>
      <LoginPopup
        show={showAdminLogin}
        onClose={() => setShowAdminLogin(false)}
      />

      <button className="button-1" onClick={() => setShowUserLogin(true)}>
        User Login
      </button>
      <UserLoginPopup
        show={showUserLogin}
        onClose={() => setShowUserLogin(false)}
      />
    </div>
  );
}

export default LoginPage;
