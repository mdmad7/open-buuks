import passport from 'passport';
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
import { Strategy as LocalStrategy } from 'passport-local';
import config from './configuration';
import User from './models/user';

// JSON WEB TOKEN Strategy
passport.use(
  new JwtStrategy(
    {
      jwtFromRequest: ExtractJwt.fromHeader('authorization'),
      secretOrKey: config.JWT_SECRET,
    },
    async (payload, done) => {
      try {
        const user = await User.findById(payload.id, { password: 0 });

        if (!user) {
          return done(null, false, { message: 'Incorrect Email' });
        }

        return done(null, user);
      } catch (error) {
        return done(error, false);
      }
    },
  ),
);

// LOCAL STRATEGY
passport.use(
  new LocalStrategy(
    {
      usernameField: 'email',
    },
    async (email, password, done) => {
      try {
        // Find User
        const user = await User.findOne({ email });

        // if not handle it
        if (!user) {
          return done(null, false);
        }

        // check if passowrd is correct
        const isMatch = await user.isValidPassword(password);

        // if not handle
        if (!isMatch) {
          return done(null, false);
        }

        return done(null, user);
      } catch (error) {
        return done(error, false);
      }
    },
  ),
);
