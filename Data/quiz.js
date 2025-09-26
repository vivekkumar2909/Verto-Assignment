// data.js

// Initializing unique IDs
let quizIdCounter = 1;
let questionIdCounter = 1;
let optionIdCounter = 1;

// In-memory database structures
const quizzes = [];
const questions = [];

/**
 * Creates a new quiz object.
 * @param {string} title The title of the quiz.
 * @returns {object} The new quiz object.
 */
function createNewQuiz(title) {
    const newQuiz = {
        id: quizIdCounter++,
        title,
        questionIds: [] // IDs of questions belonging to this quiz
    };
    quizzes.push(newQuiz);
    return newQuiz;
}

/**
 * Creates a new question object and associates it with a quiz.
 * @param {number} quizId The ID of the quiz.
 * @param {string} text The question text.
 * @param {Array<object>} options Array of options {text: string, isCorrect: boolean}.
 * @returns {object|null} The new question object or null if quiz not found.
 */
function addNewQuestion(quizId, text, options) {
    const quiz = quizzes.find(q => q.id === quizId);
    if (!quiz) {
        return null;
    }

    const formattedOptions = options.map(opt => ({
        id: optionIdCounter++,
        text: opt.text,
        isCorrect: opt.isCorrect // Stored for scoring, hidden from users
    }));

    const newQuestion = {
        id: questionIdCounter++,
        quizId,
        text,
        options: formattedOptions
    };

    questions.push(newQuestion);
    quiz.questionIds.push(newQuestion.id);
    return newQuestion;
}

/**
 * Retrieves all quizzes. (For Bonus Feature)
 * @returns {Array<object>} List of all quizzes.
 */
function getAllQuizzes() {
    return quizzes;
}

/**
 * Retrieves questions for a specific quiz, **excluding the correct answer**.
 * @param {number} quizId The ID of the quiz.
 * @returns {Array<object>|null} List of questions without correct answer info, or null.
 */
function getQuizQuestions(quizId) {
    const quizQuestions = questions.filter(q => q.quizId === quizId);

    if (quizQuestions.length === 0 && !quizzes.find(q => q.id === quizId)) {
        return null; // Quiz does not exist
    }

    // Map and filter out the 'isCorrect' property for quiz taking
    return quizQuestions.map(q => ({
        id: q.id,
        quizId: q.quizId,
        text: q.text,
        options: q.options.map(opt => ({
            id: opt.id,
            text: opt.text
        })) // Only ID and text are returned
    }));
}

/**
 * Calculates the score for a submitted quiz.
 * @param {number} quizId The ID of the quiz.
 * @param {Array<object>} answers Array of {questionId: number, selectedOptionId: number}.
 * @returns {object|null} The score object {score: number, total: number} or null.
 */
function scoreQuiz(quizId, answers) {
    const quizQuestions = questions.filter(q => q.quizId === quizId);

    if (!quizzes.find(q => q.id === quizId)) {
        return null; // Quiz does not exist
    }

    let score = 0;
    const total = quizQuestions.length;

    for (const answer of answers) {
        const question = quizQuestions.find(q => q.id === answer.questionId);

        if (question) {
            const selectedOption = question.options.find(opt => opt.id === answer.selectedOptionId);

            if (selectedOption && selectedOption.isCorrect) {
                score++;
            }
        }
    }

    return { score, total };
}


// --- Example Data for Testing ---
createNewQuiz("General Knowledge Quiz");
addNewQuestion(1, "What is the capital of France?", [
    { text: "London", isCorrect: false },
    { text: "Paris", isCorrect: true },
    { text: "Rome", isCorrect: false }
]);
addNewQuestion(1, "What planet is known as the Red Planet?", [
    { text: "Earth", isCorrect: false },
    { text: "Mars", isCorrect: true },
    { text: "Jupiter", isCorrect: false }
]);
// ---

module.exports = {
    createNewQuiz,
    addNewQuestion,
    getAllQuizzes,
    getQuizQuestions,
    scoreQuiz
};