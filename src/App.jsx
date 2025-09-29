// App.jsx
import { Routes, Route } from "react-router-dom";
import './App.css';
import './button.css';
import LoginPage from './LoginPage';
import QuizPage from './QuizPage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/QuizPage" element={<QuizPage />} />
    </Routes>
  );
}

export default App;
