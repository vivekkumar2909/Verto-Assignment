// app.js

// const express = require('express');
// const quizRoutes = require('./routes/quizRoutes');
import express from "express"
import quizRoutes from "./routes/quizRoutes"
import dotenv from "dotenv";
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;



// Middleware to parse JSON bodies
app.use(express.json());

// Main quiz routes
app.use('/quizzes', quizRoutes);

// Simple health check/welcome route
app.get('/', (req, res) => {
    res.send('Welcome to the Online Quiz Application API. Use /quizzes to start.');
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
    console.log('API Endpoints available:');
    console.log('POST /quizzes (Create Quiz)');
    console.log('POST /quizzes/:quizId/questions (Add Question)');
    console.log('GET /quizzes (List all Quizzes)');
    console.log('GET /quizzes/:quizId/questions (Fetch Quiz for taking)');
    console.log('POST /quizzes/:quizId/submit (Submit Answers and Score)');
});