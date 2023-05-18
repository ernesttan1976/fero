import { NextResponse } from "next/server";
import { useParams } from "next/navigation";


import User from "../../../models/User";
// import jwt from "jsonwebtoken";
// import bcrypt from "bcrypt";
// import faker from "faker";
const JWT_SECRET = process.env.JWT_SECRET;
const SALT_ROUNDS = 6;

export async function GET(request: Request) {
    try {

        const params = useParams();
        console.log(request);
        console.log(params.id);
        //const user = await User.findById(params.id);
        return NextResponse.json({ "message": '(1)this is the User/[id] route' });
    } catch (error) {
        NextResponse.json({ "message": error });
    }

    //return NextResponse.json({ "message": `(2)this is the User/[id] route${params}` });
}

// const seed = async (req, res) => {
//     try {
//       await User.deleteMany({});
  
//       const userItems = [];
  
//       const RandomAvatar = () => `https://i.pravatar.cc/100?img=${Math.floor(Math.random() * 70) + 1}`
  
//       const adminUser = new User({
//         name: `admin`,
//         email: `admin@ga.co`,
//         password: await bcrypt.hash(`admin`, SALT_ROUNDS),
//         role: 'Admin',
//         avatar: RandomAvatar(),
//       });
//       userItems.push(adminUser);
  
//       const adminUser2 = new User({
//         name: `Ernest Tan`,
//         email: `ernesttan1976@gmail.com`,
//         password: await bcrypt.hash(`admin`, SALT_ROUNDS),
//         role: 'Admin',
//         avatar: RandomAvatar(),
//       });
//       userItems.push(adminUser2);
  
//       for (let i = 1; i < 6; i++) {
//         const instructorUser = new User({
//           name: `${faker.name.firstName()} ${faker.name.lastName()}`,
//           email: `instructor${i}@ga.co`,
//           password: await bcrypt.hash(`instructor${i}`, SALT_ROUNDS),
//           role: 'Instructor',
//           avatar: RandomAvatar(),
//         });
//         userItems.push(instructorUser);
//       }
  
//       for (let i = 1; i < 61; i++) {
//         const userItem = new User({
//           name: `${faker.name.firstName()} ${faker.name.lastName()}`,
//           email: `student${i}@ga.co`,
//           password: await bcrypt.hash(`student${i}`, SALT_ROUNDS),
//           role: 'Student',
//           avatar: RandomAvatar(),
//         });
//         userItems.push(userItem);
//       }
  
//       const users = await User.create(userItems);
  
//       res.status(200).json(users);
//     } catch (error) {
//       res.status(400).json({ error: error.message });
//     }
//   };
