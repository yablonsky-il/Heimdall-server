import express from 'express';
import { API_PARAM } from '../../constants';

export const router = express.Router();

router.post(`/${API_PARAM}/sign-out`, (req, res) => {
  res.clearCookie('profile');
  res.redirect('/');
});
