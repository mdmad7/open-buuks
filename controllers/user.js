import JWT from 'jsonwebtoken';
import User from '../models/user';
import config from '../configuration';
import passport from 'passport';

import { validationResult } from 'express-validator/check';

const signToken = user => {
  return JWT.sign(
    {
      id: user.id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
    },
    config.JWT_SECRET,
    {
      expiresIn: '1hr',
    },
  );
};

export default {
  signUp: async (req, res, next) => {
    // Get the validation result whenever you want; see the Validation Result API for all options!
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.mapped() });
    }
    const { firstName, lastName, email, password } = req.body;
    // check if user already exists
    const foundUser = await User.findOne({ email });

    if (foundUser) {
      return res.status(401).json({ error: 'Email is already is use' });
    }

    // create user
    const newUser = new User({
      firstName,
      lastName,
      email,
      password,
    });
    await newUser.save();

    const token = await signToken(newUser);
    res.status(200).json({ token });
  },

  logIn: async (req, res, next) => {
    // passport.authenticate is placed here to enable
    // custom msg object
    passport.authenticate('local', (err, user, info) => {
      if (err) {
        return next(err);
      }
      if (!user) {
        return res.json({ error: 'Invalid Email Address or Password' });
      }

      const token = signToken(user);
      res.status(200).json({ token });
    })(req, res, next);
  },

  profile: async (req, res, next) => {
    console.log(req.user);
    res.json(req.user);
  },
};
