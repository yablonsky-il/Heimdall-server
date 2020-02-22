import express from 'express';
import passport from 'passport';
import stategy from 'passport-google-oauth';

export const router = express.Router();
const GoogleStrategy = stategy.OAuth2Strategy;
const { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET } = process.env;

passport.use(new GoogleStrategy({
  clientID: GOOGLE_CLIENT_ID,
  clientSecret: GOOGLE_CLIENT_SECRET,
  callbackURL: 'http://localhost:3005/auth/google/callback',
}, (accessToken, refreshToken, profile, done) => {
  return done(null, profile);
}));

router.get(
  '/sign-in-google',
  passport.authenticate('google', {
    session: false,
    scope: ['email', 'profile'],
  }),
);

router.get(
  '/auth/google/callback',
  passport.authenticate('google', {
    // successRedirect: '/auth-success',
    failureRedirect: '/sign-in-google',
  }),
  (req, res) => {
    // console.log(req.user, 'res');

    res.status(200).send({
      response: req.user,
    });
  },
);
