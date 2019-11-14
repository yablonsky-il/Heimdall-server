import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as cookieParser from 'cookie-parser';
import * as helmet from 'helmet';
import * as compression from 'compression';
import * as morgan from 'morgan';
import * as passport from 'passport';

import { router as routerMiddleware } from '../routes/index';
// import { router as signInLocaly } from './sign-in-local';
// import { router as signInGoogle } from './sign-in-google';
import { router as signInAmazon } from './sign-in-amazon';

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
router.get('/privacy', (req, res) => {
  res.status(200).send('Our main Privacy Notice it"s that we dont"t have any privacies');
});
// router.use(signInLocaly);
// router.use(signInGoogle);
router.use(signInAmazon);
