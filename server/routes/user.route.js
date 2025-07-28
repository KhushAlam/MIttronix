import express from 'express';
import { userLogin, userSignup, resetPassword } from '../controllers/user.controller.js';

const router = express.Router();

router.post('/login', userLogin);
router.post('/signup', userSignup);
router.post('/reset-password', resetPassword);


export default router;
