
import React, { useState } from "react";
import './App.css';
import LoginPopup from "./AdminLogin";
function LoginPage() {
  const [showLogin, setShowLogin] = useState(false);
  return (
    <div className="app-container">
      


      <h1 className="login-head">Login</h1>
      <button className="button-1"onClick={() => setShowLogin(true)}>Admin Login</button>
<LoginPopup show={showLogin} onClose={() => setShowLogin(false)} />
      <button className="button-1">User Login</button>
      
    </div>
  );
}

export default LoginPage;
