import express from 'express';
import quizController from '../controllers/quizController.js';

const router = express.Router();


router.post('/', quizController.createQuiz);


router.post('/:quizId/questions', quizController.addQuestion);


router.get('/', quizController.getAllQuizzes);


router.get('/:quizId/questions', quizController.getQuizQuestions);


router.post('/:quizId/submit', quizController.submitQuiz);

export default router;