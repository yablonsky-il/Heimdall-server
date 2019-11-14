import * as express from 'express';
import * as passport from 'passport';
import * as stategy from 'passport-amazon';

export const router = express.Router();
const AmazonStrategy = stategy.Strategy;
const { AMAZON_CLIENT_ID, AMAZON_CLIENT_SECRET } = process.env;

passport.use(new AmazonStrategy({
  clientID: AMAZON_CLIENT_ID,
  clientSecret: AMAZON_CLIENT_SECRET,
  callbackURL: 'http://localhost:3005/auth/amazon/callback',
}, (accessToken, refreshToken, profile, done) => {
  return done(null, profile);
}));

router.get(
  '/sign-in-amazon',
  passport.authenticate('amazon', { scope: ['profile', 'postal_code'] }),
);

router.get(
  '/auth/amazon/callback',
  passport.authenticate('amazon', {
    // successRedirect: '/auth-success',
    failureRedirect: '/sign-in-amazon'
  }),
  (req, res) => {
    console.log(req.user, 'res');

    res.status(200).send({
      response: req.user,
    });
  }
);
