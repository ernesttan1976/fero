import { IUser } from "../../../models"
import User from "../models/User";
import connect from "../config/database";

import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
const JWT_SECRET = process.env.JWT_SECRET || "default_secret";
const SALT_ROUNDS = 6;

export default async function signinUser(userData: IUser) {
  
  try {

    await connect();

    const {email, password} = userData;
    
    if (!password || password.length < 5) throw new Error("Password is required and min 4 characters.");

    let userFound = await User.findOne({email});
    if (userFound===null) throw new Error("No user found, please sign up");

    const match = await bcrypt.compare(password, userFound.password);
    if (match) {
      const payload = { userFound };
      const token = jwt.sign(payload, JWT_SECRET, { expiresIn: 6000 });
      console.log(token);
      return token;
      console.log("user login successful");
    } else {
      throw new Error(`Wrong password`);
    }
  } catch (error) {
    throw new Error(`Sign in user error ${error}`);
  }

}

