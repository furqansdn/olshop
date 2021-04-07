import mongoose from 'mongoose';
import validator from 'validator';
import bcrypt from 'bcryptjs';

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, 'Email is required'],
  },
  role: {
    type: String,
    enum: ['admin', 'user'],
    default: 'user',
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    select: false,
  },
  passwordConfirm: {
    type: String,
    required: [true, 'Password Confirmation is required'],
    validate: {
      // This is only work on create and save!!!!
      validator: function (el) {
        return el === this.password;
      },
      message: 'Password not same',
    },
  },
});
