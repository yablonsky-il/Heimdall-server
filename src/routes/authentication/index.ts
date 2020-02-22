import express from 'express';

// import { router as signIn } from './sign-in';
import { router as signUp } from './sign-up';
import { router as signOut } from './sign-out';
import { router as cookieAuth } from './cookie-auth';

export const router = express.Router();

// router.use(signIn);
router.use(signUp);
router.use(signOut);
router.use(cookieAuth);
