import express from 'express';
import * as R from 'ramda';

import { db } from '../../connect-to-db';
import { getHash } from '../../helpers/sign-up/get-hash';
import { SIGN_IN_CODES } from '../../constants';

export const router = express.Router();
const cookieAge = 1000 * 60 * 60 * 24 * 30 * 12; // year

const profileNotFind = res => res.status(200).send({
  status: 0,
  message: SIGN_IN_CODES[0],
});

router.post('/sign-in', (req, res) => {
  const {
    'sign-up-form-email': email,
    'sign-up-form-password': enteredPassword,
  } = req.body;

  db.collection('users')
    .findOne({ email })
    .then((user) => {
      if (R.isNil(user)) {
        return profileNotFind(res);
      }

      const { name, surname, email, password, date } = user;
      const hashPassword = getHash(enteredPassword, String(date));

      if (password === hashPassword) {
        res.cookie('profile', JSON.stringify({ name, surname, email }), { maxAge: cookieAge })
        return res.status(200).send({
          status: 1,
          message: SIGN_IN_CODES[1],
          profile: { name, surname, email },
        });
      }

      return profileNotFind(res);
    })
    .catch(err => res.status(500).send(err));
});
