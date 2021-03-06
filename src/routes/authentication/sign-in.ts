// import * as express from 'express';
// import * as R from 'ramda';

// import { db } from '../../services/connect-to-db';
// import { getHash } from '../../helpers/util';
// import { SIGN_IN_CODES, COOKIE_AGE, API_PARAM } from '../../constants';

// export const router = express.Router();

// const profileNotFound = res => res.status(200).send({
//   status: 0,
//   message: SIGN_IN_CODES[0],
// });

// router.post(`/${API_PARAM}/sign-in`, (req, res) => {
//   const {
//     'sign-up-form-email': enteredEmail,
//     'sign-up-form-password': enteredPassword,
//   } = req.body;

//   db.collection('users')
//     .findOne({ email: enteredEmail })
//     .then((user) => {
//       if (R.isNil(user)) return profileNotFound(res);

//       const {
//         name, surname, email, password, date,
//       } = user;
//       const hashPassword = getHash(enteredPassword);

//       if (password === hashPassword) {
//         res.cookie('profile', `email=${email};isLoged=true`, { maxAge: COOKIE_AGE });

//         return res.status(200).send({
//           status: 1,
//           message: SIGN_IN_CODES[1],
//           profile: { name, surname, email },
//         });
//       }

//       return profileNotFound(res);
//     })
//     .catch(err => res.status(500).send(err));
// });
