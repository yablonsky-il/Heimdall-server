import express from 'express';
import * as R from 'ramda';

import { db } from '../../services/connect-to-db';
import { getHash } from '../../helpers/sign-up/get-hash';
import { SIGN_UP_CODES, COOKIE_AGE, API_PARAM } from '../../constants';

export const router = express.Router();

router.post(`/${API_PARAM}/sign-up`, (req, res) => {
  const {
    'sign-up-form-name': name,
    'sign-up-form-surname': surname,
    'sign-up-form-email': email,
    'sign-up-form-password': password,
  } = req.body;

  db.collection('users')
    .findOne({ email })
    .then((user) => {
      if (R.isNil(user)) {
        const date = new Date();
        const hashPassword = getHash(password, String(date));

        return db.collection('users')
          .insertOne({
            name,
            surname,
            email,
            password: hashPassword,
            date,
          })
          .then(() => {
            res.cookie('profile', `email=${email};isLoged=true`, { maxAge: COOKIE_AGE });

            return res.status(200).send({
              status: 1,
              message: SIGN_UP_CODES[1],
              profile: {
                name, surname, email,
              },
            });
          })
          .catch(err => res.status(500).send(err));
      }

      return res.status(200).send({ status: 0, message: SIGN_UP_CODES[0] });
    })
    .catch(err => res.status(500).send(err));
});
