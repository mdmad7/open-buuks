import expressPromiseRouter from 'express-promise-router';
const router = expressPromiseRouter();
import passport from 'passport';
import passportConfig from '../passport';

import user_controller from '../controllers/user';

/* Create User */
router.post('/signup', user_controller.signUp);

/* Login User */
router.post(
  '/signin',
  passport.authenticate('local', { session: false }),
  user_controller.signIn,
);

/* Retrieve User  Secret*/
router.get(
  '/secret',
  passport.authenticate('jwt', { session: false }),
  user_controller.secret,
);

export default router;
