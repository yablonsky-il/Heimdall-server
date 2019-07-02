import express from 'express';

export const router = express.Router();

router.post('/sign-out', (req, res) => {
  res.clearCookie('profile');
  res.redirect('/');
});
