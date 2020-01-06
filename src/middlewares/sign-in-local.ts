import * as express from 'express';
import * as passport from 'passport';
import * as stategy from 'passport-local';
import * as R from 'ramda';

import { db } from '../services/connect-to-db';
import { isValidPass } from '../helpers/auth';
import { SIGN_IN_CODES, COOKIE_AGE, API_PARAM } from '../constants';

export const router = express.Router();
const LocalStrategy = stategy.Strategy;

passport.use(new LocalStrategy({
  usernameField: 'sign-up-form-email',
  passwordField: 'sign-up-form-password',
}, (enteredEmail, enteredPassword, done) => {
  db.collection('users')
    .findOne({ email: enteredEmail })
    .then(R.ifElse(
      user => R.isNil(user) || !isValidPass(enteredPassword, user.password),
      () => done(null, false),
      user => done(null, user)
    ))
    .catch(done);
}));

router.post(
  `/${API_PARAM}/sign-in`,
  passport.authenticate('local', { session: false }),
  (req, res) => {
    const { name, surname, email }: any = req.user;

    res.cookie('profile', `email=${email};isLoged=true`, { maxAge: COOKIE_AGE });

    return res.status(200).send({
      status: 1,
      message: SIGN_IN_CODES[1],
      profile: { name, surname, email },
    });
  }
);
