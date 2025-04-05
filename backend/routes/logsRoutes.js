import express from 'express';
import { insertionController } from '../controller/logsController.js';
const router = express.Router();


router.post("/insert" , insertionController)

export default router;