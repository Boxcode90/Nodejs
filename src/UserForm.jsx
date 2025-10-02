// QuizDisplay.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import "./QuizDisplay.css";

function QuizDisplay({ quizCode }) {
  const [quiz, setQuiz] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedAnswers, setSelectedAnswers] = useState({}); // track selected answer per question
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    console.log("Quiz code received:", quizCode); // DEBUG
    if (!quizCode) return;
    const fetchQuiz = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `http://localhost:5000/api/quiz/code/${encodeURIComponent(quizCode)}`
        );
        console.log("Quiz fetched:", response.data); // DEBUG
        setQuiz(response.data);
      } catch (err) {
        console.error(err);
        setError("Failed to fetch quiz");
      } finally {
        setLoading(false);
      }
    };
    fetchQuiz();
  }, [quizCode]);
  
  const handleSelect = (qIndex, optionText) => {
    setSelectedAnswers({ ...selectedAnswers, [qIndex]: optionText });
  };

  const handleSubmit = () => {
    setSubmitted(true);
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;
  if (!quiz) return <p>No quiz found.</p>;

  return (
    <div className="quiz-display-container">
      <h2>{quiz.quizTitle || quiz.title}</h2>

      {quiz.questions.map((q, idx) => {
        const userAnswer = selectedAnswers[idx];
        return (
          <div key={idx} className="question-block">
            <p className="question-text">
              {idx + 1}. {q.questionText}
            </p>

            <ul className="options-list">
              {q.options.map((opt, i) => {
                const isSelected = userAnswer === opt.text;
                const highlight = submitted && isSelected ? "selected" : "";

                return (
                  <li
                    key={i}
                    className={`option-item ${highlight}`}
                    onClick={() => !submitted && handleSelect(idx, opt.text)}
                  >
                    <input
                      type="radio"
                      name={`question-${idx}`}
                      checked={isSelected || false}
                      readOnly
                    />
                    <span>{opt.text}</span>
                  </li>
                );
              })}
            </ul>
          </div>
        );
      })}

      {!submitted && (
        <button className="submit-btn" onClick={handleSubmit}>
          Submit Quiz
        </button>
      )}
    </div>
  );
}

export default QuizDisplay;
