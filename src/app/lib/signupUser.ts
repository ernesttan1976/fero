import { IUser } from "../../../models"
import User from "../models/User";
import connect from "../config/database";

import jwt from "jsonwebtoken";
//import bcrypt from "bcrypt";
import { faker } from "@faker-js/faker";
const JWT_SECRET = process.env.JWT_SECRET || "default_secret";
//const SALT_ROUNDS = 6;

export default async function signupUser(userData: IUser) {

  try {

    await connect();

    const { name, email, password} = userData;
    if (!name) throw new Error("Name is required");

    if (!password || password.length < 5) throw new Error("Password is required and min 4 characters.");

    let emailFound = await User.findOne({email});
    if (emailFound) throw new Error("This email is already taken");

    console.log(userData);
    const user = await User.create({...userData});
    if (!user.avatar) {
      user.avatar = faker.image.avatar();
    }
    const payload = { user };
    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: 6000 }); // 1hr
    return ({"token": token, 
    "user": {
      "name": user.name,
      "email": user.email,
    }});
  } catch (error) {
    throw new Error(`signup user error ${error}`);
  }

}

