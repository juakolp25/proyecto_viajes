import { Schema, model } from "mongoose";
import bcrypt from "bcryptjs";
import jwt from 'jsonwebtoken';

const UserSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

UserSchema.statics.encryptPassword = async (password) => {
  return await bcrypt.hash(password, 10);
};

UserSchema.statics.comparePasswords = async (typedPassword, dbPassword) => {
  return await bcrypt.compare(typedPassword, dbPassword);
};

UserSchema.methods.generateAuthToken = function() {
  const token = jwt.sign({ _id: this._id }, process.env.SECRET_WORD || 'secret');
  return token;
}

const User = model("User", UserSchema);


export default User;