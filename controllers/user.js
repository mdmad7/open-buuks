import JWT from 'jsonwebtoken';
import User from '../models/user';
import config from '../configuration';

const signToken = user => {
  return JWT.sign(
    {
      iss: 'open-buuks',
      sub: user.id,
      iat: new Date().getTime(),
      exp: new Date().setDate(new Date().getDate() + 1), // current time + 1 day ahead
    },
    config.JWT_SECRET,
  );
};

export default {
  signUp: async (req, res, next) => {
    const { email, password } = req.body;
    // check if user already exists
    const foundUser = await User.findOne({ email });

    if (foundUser) {
      return res.status(401).json({ error: 'Email is already is use' });
    }

    // create user
    const newUser = new User({
      email,
      password,
    });
    await newUser.save();

    const token = await signToken(newUser);
    res.status(200).json({ token });
  },

  signIn: async (req, res, next) => {
    const token = signToken(req.user);
    res.status(200).json({ token });
    // console.log('signed in');
  },

  secret: async (req, res, next) => {
    res.json({ secret: 'resource' });
  },
};
