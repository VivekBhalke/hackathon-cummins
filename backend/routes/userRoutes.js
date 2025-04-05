import express from 'express';
import { registerUser } from '../controller/userController.js';
import { generateQuiz } from '../controller/quizController.js';
const router = express.Router();


router.post('/register', registerUser);
router.get('/quiz', generateQuiz);
export default router;