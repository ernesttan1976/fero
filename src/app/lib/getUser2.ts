import User from "../models/User";
// import jwt from "jsonwebtoken";
// import bcrypt from "bcrypt";
// import faker from "faker";
const JWT_SECRET = process.env.JWT_SECRET;
const SALT_ROUNDS = 6;

export default async function getUser2(userId: string) {
    //const res = await fetch(`https://jsonplaceholder.typicode.com/users/${userId}`)
    const res = await User.findById(userId);
    if (!res) throw new Error('failed to fetch user');
    return res;
        
}