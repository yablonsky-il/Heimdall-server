import express from 'express';
import * as R from 'ramda';

import { db } from '../../services/connect-to-db';
import { SIGN_IN_CODES, COOKIES_CODES } from '../../constants';

export const router = express.Router();

const profileNotFound = res => res.status(200).send({
  status: 0,
  message: 'Profile not found',
});

router.post('/cookie-auth', (req, res) => {  
  const { profile } = req.cookies;

  if (R.isNil(profile)) {
    return res.status(200).send({
      status: 0,
      message: COOKIES_CODES[0],
    });
  }

  const email = profile.split(';')[0].split('=')[1];
  const isLoged = profile.split(';')[1].split('=')[1];

  if (Boolean(isLoged)) {
    return db.collection('users')
      .findOne({ email })
      .then((user) => {
        if (R.isNil(user)) return profileNotFound(res);

        const { name, surname, email } = user;
        return res.status(200).send({
          status: 1,
          message: SIGN_IN_CODES[1],
          profile: { name, surname, email },
        });
      })
      .catch(err => res.status(500).send(err));
  }

  return profileNotFound(res);
});
