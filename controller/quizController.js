import quiz from "../Data/quiz.js";  // keep `.js` for ESM
// I assume you meant to use quizdb instead of "data"

export const createQuiz = (req, res) => {
    const { title } = req.body;
    if (!title) {
        return res.status(400).json({ error: 'Quiz title is required.' });
    }

    const newQuiz = quiz.createNewQuiz(title);
    res.status(201).json(newQuiz);
};

export const addQuestion = (req, res) => {
    const quizId = parseInt(req.params.quizId);
    const { text, options } = req.body;

    if (!text || !options || !Array.isArray(options) || options.length < 2) {
        return res.status(400).json({ error: 'Valid question text and at least two options are required.' });
    }

    const correctOptions = options.filter(opt => opt.isCorrect);
    if (correctOptions.length !== 1) {
        return res.status(400).json({ error: 'Exactly one option must be marked as correct.' });
    }

    const newQuestion = quiz.addNewQuestion(quizId, text, options);
    if (!newQuestion) {
        return res.status(404).json({ error: `Quiz with ID ${quizId} not found.` });
    }

    res.status(201).json(newQuestion);
};

export const getAllQuizzes = (req, res) => {
    res.json(quiz.getAllQuizzes());
};

export const getQuizQuestions = (req, res) => {
    const quizId = parseInt(req.params.quizId);

    const questionsWithoutAnswers = quiz.getQuizQuestions(quizId);

    if (questionsWithoutAnswers === null) {
        return res.status(404).json({ error: `Quiz with ID ${quizId} not found.` });
    }

    res.json(questionsWithoutAnswers);
};

export const submitQuiz = (req, res) => {
    const quizId = parseInt(req.params.quizId);
    const answers = req.body; // Expects: [{ questionId: 1, selectedOptionId: 2 }, ...]

    if (!Array.isArray(answers)) {
        return res.status(400).json({ error: 'Answers must be submitted as an array.' });
    }

    const scoreResult = quiz.scoreQuiz(quizId, answers);

    if (scoreResult === null) {
        return res.status(404).json({ error: `Quiz with ID ${quizId} not found.` });
    }

    // Response: {"score": 3, "total": 5}
    res.json(scoreResult);
};
