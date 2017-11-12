import expressPromiseRouter from 'express-promise-router';
const router = expressPromiseRouter();

import { check } from 'express-validator/check';
import { sanitize } from 'express-validator/filter';
import User from '../models/user';

import passport from 'passport';
// import passportConfig from '../passport';

import user_controller from '../controllers/user';

/* Create User */
router.post(
  '/signup',
  [
    check('firstName')
      .trim()
      .exists(),
    check('lastName')
      .trim()
      .exists(),
    check('email')
      .isEmail()
      .withMessage('Invalid Email format')
      // Every sanitizer method in the validator lib is available as well!
      .trim()
      .exists()
      .normalizeEmail(),

    // General error messages can be given as a 2nd argument in the check APIs
    check('password')
      .withMessage(
        'passwords must be at least 8 chars long and contain one number',
      )
      .isLength({ min: 8 })
      .matches(/\d/)
      .exists(),
  ],
  user_controller.signUp,
);

/* Login User */
router.post('/login', user_controller.logIn);

router.get(
  '/profile',
  passport.authenticate('jwt', { session: false }),
  user_controller.profile,
);

export default router;
