import { Schema, model, models } from 'mongoose';
const bcrypt = require('bcrypt');
const _ = require('lodash');

const UserSchema = new Schema({
  name: {
    type: String,
  },
  email: {
    type: String,
    unique: [true, 'Email already exists!'],
    required: [true, 'Email is required!'],
  },
  password: {
    type: String,
    required: [true, 'Email is required!'],
  },
  
});


const User = models.User || model("User", UserSchema);

export default User;