import { IUser } from "../../../models"
import User from "../models/User";
import connect from "../config/database";

import jwt from "jsonwebtoken";
//import bcrypt from "bcrypt";
import { faker } from "@faker-js/faker";
const JWT_SECRET = process.env.JWT_SECRET || "default_secret";
//const SALT_ROUNDS = 6;

export default async function getUser(email: String) {

  try {

    await connect();

    let userFound = await User.findOne({email});

    const payload = { userFound };
    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: 6000 }); // 1hr
    return token;
  } catch (error) {
    throw new Error(`signup user error ${error}`);
  }

}

