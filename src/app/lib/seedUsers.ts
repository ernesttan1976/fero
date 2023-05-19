import {IUser} from "../../../models"
import User from "../models/User";

// import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import {faker} from "@faker-js/faker";
const JWT_SECRET = process.env.JWT_SECRET;
const SALT_ROUNDS = 6;

export default async function seedUsers() {

        await User.deleteMany({});
    
        const userItems = [];
    
        const RandomAvatar = () => `https://i.pravatar.cc/100?img=${Math.floor(Math.random() * 52) + 1}`
    
        const adminUser = new User({
          name: `admin`,
          email: `admin@fero.com`,
          password: await bcrypt.hash(`admin`, SALT_ROUNDS),
          role: 'Admin',
          avatar: RandomAvatar(),
        });
        userItems.push(adminUser);
    
        const adminUser2 = new User({
          name: `Ernest Tan`,
          email: `ernesttan1976@gmail.com`,
          password: await bcrypt.hash(`admin`, SALT_ROUNDS),
          role: 'Admin',
          avatar: RandomAvatar(),
        });
        userItems.push(adminUser2);
        
        for (let i = 1; i < 50; i++) {
          const userItem = new User({
            name: `${faker.person.fullName()}`,
            email: `user${i}@fero.com`,
            password: await bcrypt.hash(`userfero${i}`, SALT_ROUNDS),
            role: 'User',
            avatar: RandomAvatar(),
          });
          userItems.push(userItem);
        }
    
        const res = await User.create(userItems);
    
        if (!res) throw new Error('failed to seed users');
        return res;    
}

