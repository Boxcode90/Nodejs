// App.jsx
import { Routes, Route } from "react-router-dom";
import './App.css';
import './button.css';
import LoginPage from './LoginPage';
import QuizPage from './AdminHomePage';
import QuizCreation from './QuizCreation';
import UserLogin from "./UserLogin"; // renamed import to avoid conflict

function App() {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/QuizPage" element={<QuizPage />} />
      <Route path="/QuizCreation" element={<QuizCreation />} />
      <Route path="/UserLogin" element={<UserLogin />} />
    </Routes>
  );
}

export default App;
