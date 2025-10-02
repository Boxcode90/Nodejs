// server.js
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose.connect(
  "mongodb+srv://rafiqmohamed025_db_user:1924LU@cluster0.kxikrnk.mongodb.net/quizDB", // added db name
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
)
.then(() => console.log("MongoDB connected"))
.catch((err) => console.error("MongoDB connection error:", err));

// Schema
const optionSchema = new mongoose.Schema({ text: String });

const questionSchema = new mongoose.Schema({
  questionText: { type: String, required: true },
  options: [optionSchema],
  answer: String, // optional correct answer
});

const quizSchema = new mongoose.Schema({
  title: { type: String, required: true },         // Quiz title
  quizCode: { type: String, required: true, unique: true }, // Unique code
  timeAllowed: { type: Number, required: true },   // Duration in minutes
  questions: [questionSchema],
  createdAt: { type: Date, default: Date.now },
});

const Quiz = mongoose.model("Quiz", quizSchema);

// Routes
// Create new quiz
app.post("/api/quiz", async (req, res) => {
  try {
    const { title, quizCode, timeAllowed, questions } = req.body;

    const existing = await Quiz.findOne({ quizCode });
    if (existing) return res.status(400).json({ message: "Quiz code already exists" });

    const quiz = new Quiz({
      title,
      quizCode,
      timeAllowed,
      questions,
    });

    const savedQuiz = await quiz.save();
    res.status(201).json(savedQuiz);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error saving quiz" });
  }
});

// Get quiz by code
// Example in Express
// Get quiz by code
app.get("/api/quiz/code/:quizCode", async (req, res) => {
  try {
    const { quizCode } = req.params;
    const quiz = await Quiz.findOne({ quizCode }); // ✅ Must be Quiz, not QuizModel
    if (!quiz) return res.status(404).json({ message: "Quiz not found" });
    res.json(quiz);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});




app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
