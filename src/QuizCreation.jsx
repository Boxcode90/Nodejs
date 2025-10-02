import { useState } from "react";
import axios from "axios";
import "./QuizCreation.css";

// Utility: Generate random quiz code
function generateQuizCode() {
  return "QZ-" + Math.random().toString(36).substr(2, 6).toUpperCase();
}

function QuestionForm() {
  const [questions, setQuestions] = useState([
    { text: "", options: [""] },
  ]); // start with 1 question
  const [title, setTitle] = useState("");
  const [quizCode] = useState(generateQuizCode());
  const [time, setTime] = useState(""); // quiz duration

  function addQuestion() {
    setQuestions([...questions, { text: "", options: [""] }]);
  }

  function removeQuestion(index) {
    const updated = [...questions];
    updated.splice(index, 1); // remove question at index
    setQuestions(updated);
  }

  function handleQuestionChange(index, value) {
    const updated = [...questions];
    updated[index].text = value;
    setQuestions(updated);
  }

  function handleOptionChange(qIndex, oIndex, value) {
    const updated = [...questions];
    updated[qIndex].options[oIndex] = value;
    setQuestions(updated);
  }

  function addOption(qIndex) {
    const updated = [...questions];
    updated[qIndex].options.push("");
    setQuestions(updated);
  }

  async function handleSubmit() {
    // Validation
    for (let q of questions) {
      if (!q.text || q.options.length === 0 || q.options.some(opt => !opt)) {
        alert("Please fill all questions and options");
        return;
      }
    }
    if (!time) {
      alert("Please enter quiz duration");
      return;
    }

    try {
      const response = await axios.post("http://localhost:5000/api/quiz", {
        title: title || "Untitled Quiz",
        quizCode,
        timeAllowed: time,
        questions: questions.map(q => ({
          questionText: q.text,
          options: q.options.map(opt => ({ text: opt }))
        }))
      });

      console.log("Saved quiz:", response.data);
      alert(`Quiz saved! Code: ${quizCode}`);
    } catch (err) {
      console.error(err);
      alert("Error saving quiz.");
    }
  }

  return (
    <div className="quiz-container">
      <div className="quiz-card">
        <h2>Create Quiz</h2>

        <label>Quiz Title:</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter quiz title"
        />

        <p><strong>Generated Quiz Code:</strong> {quizCode}</p>

        {questions.map((q, i) => (
          <div key={i} className="question-block">
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <label>Question {i + 1}:</label>
              <button
                type="button"
                onClick={() => removeQuestion(i)}
                style={{
                  background: "red",
                  color: "white",
                  border: "none",
                  borderRadius: "6px",
                  padding: "5px 10px",
                  cursor: "pointer"
                }}
              >
                ❌ Remove
              </button>
            </div>

            <input
              type="text"
              value={q.text}
              onChange={(e) => handleQuestionChange(i, e.target.value)}
              placeholder="Enter your question"
            />

            <div>
              <strong>Options:</strong>
              {q.options.map((opt, j) => (
                <div key={j}>
                  <input
                    type="text"
                    value={opt}
                    placeholder={`Option ${j + 1}`}
                    onChange={(e) => handleOptionChange(i, j, e.target.value)}
                  />
                </div>
              ))}
              <button type="button" onClick={() => addOption(i)}>
                ➕ Add Option
              </button>
            </div>
          </div>
        ))}

        <button type="button" onClick={addQuestion}>
          ➕ Add Question
        </button>

        <div>
          <label>Time Allowed (minutes):</label>
          <input
            type="number"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            placeholder="Enter time allowed"
          />
        </div>

        <button className="submit-btn" onClick={handleSubmit}>
          Submit Quiz
        </button>
      </div>
    </div>
  );
}

export default QuestionForm;
