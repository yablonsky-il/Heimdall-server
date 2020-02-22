import express from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import helmet from 'helmet';
import compression from 'compression';
import morgan from 'morgan';
import passport from 'passport';

import { router as routerMiddleware } from '../routes/index';
import { router as signInLocaly } from './sign-in-local';
import { router as signInGoogle } from './sign-in-google';

export const router = express.Router();

passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((obj, done) => done(null, obj));

router.use(morgan('dev'));
router.use(helmet());
router.use(compression());
router.use(cookieParser());
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));
router.use(passport.initialize());
router.use(passport.session());
router.use('/', express.static(`${__dirname}/public`));
router.use(routerMiddleware);
router.use(signInLocaly);
router.use(signInGoogle);
