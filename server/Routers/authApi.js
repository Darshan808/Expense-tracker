import { Router } from "express";
import * as authController from '../controllers/authControllers.js';

const saltRounds = 5;
const router = Router();

router.post('/register',authController.register);

router.post('/login',authController.login);

export default router;