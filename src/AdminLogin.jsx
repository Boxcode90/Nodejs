import { useState } from "react";
import { useNavigate } from "react-router-dom";
import './App.css'; // make sure overlay & popup styles exist

function LoginPopup({ show, onClose }) {
  const [Username, setUsername] = useState("");
  const [Pass, setPass] = useState("");
  const navigate = useNavigate();

  if (!show) return null;

  const name = "rafiq";
  const pass = "12345678";

  function handleSubmit() {
    console.log("Username:", Username);
    console.log("Password:", Pass);

    if (Username === name && Pass === pass) {
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
          value={Username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={Pass}
          onChange={(e) => setPass(e.target.value)}
        />
        <button onClick={handleSubmit}>Submit</button>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
}

export default LoginPopup;
