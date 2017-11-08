import mongoose, { Schema } from 'mongoose';
import bcrypt from 'bcryptjs';

const UserSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
      trim: true,
      validate: {
        validator(password) {
          // atleast 1 lowercase, 1 uppercase, 1 numeral and a length of 8
          const strongRegex = new RegExp(
            '^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})',
          );
          return strongRegex.test(password);
        },
        message: 'Your password is too weak !',
      },
    },
  },
  {
    timestamps: true,
  },
);

UserSchema.pre('save', async function(next) {
  try {
    //Generate a salt
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(this.password, salt);
    this.password = passwordHash;
    next();
  } catch (error) {
    next(error);
  }
});

UserSchema.methods.isValidPassword = async function(newPassword) {
  try {
    return bcrypt.compare(newPassword, this.password);
  } catch (error) {
    next(error);
  }
};

//Export model
export default mongoose.model('User', UserSchema);
