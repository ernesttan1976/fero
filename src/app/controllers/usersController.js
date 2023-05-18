const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const faker = require('faker');
const JWT_SECRET = process.env.JWT_SECRET;
const SALT_ROUNDS = 6;

const create = async (req, res) => {
  try {

    const { name, email, password, avatar } = req.body;
    if (!name) return res.status(400).send("Name is required");

    if (!password || password.length < 5) {
      res.status(400).json({ message: "Password is required and min 4 characters." });
      return;
    }

    let emailFound = await User.findOne({ email }).exec();
    if (emailFound) return res.status(400).send("This email is already taken");

    const user = await User.create(req.body);
    if (!user.avatar) {
      user.avatar = faker.image.avatar();
    }
    const payload = { user };
    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: 6000 }); // 1hr
    res.status(201).json(token);
  } catch (error) {
    res.status(500).json(error);
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  if (password.length < 5) {
    res.status(400).json({ message: "Incorrect Password" });
    return;
  }

  try {
    const user = await User.findOne({ email });
    if (user === null) {
      res.status(401).json({ message: "No user found, Please sign up." });
      return;
    }

    const match = await bcrypt.compare(password, user.password);
    if (match) {
      const payload = { user };
      const token = jwt.sign(payload, JWT_SECRET, { expiresIn: 60 });
      res.status(200).json({ token });
      console.log("user login successful");
    } else {
      res.status(401).json({ message: "Wrong password" });
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

const seed = async (req, res) => {
  try {
    await User.deleteMany({});

    const userItems = [];

    const RandomAvatar = () => `https://i.pravatar.cc/100?img=${Math.floor(Math.random() * 70) + 1}`

    const adminUser = new User({
      name: `admin`,
      email: `admin@ga.co`,
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

    for (let i = 1; i < 6; i++) {
      const instructorUser = new User({
        name: `${faker.name.firstName()} ${faker.name.lastName()}`,
        email: `instructor${i}@ga.co`,
        password: await bcrypt.hash(`instructor${i}`, SALT_ROUNDS),
        role: 'Instructor',
        avatar: RandomAvatar(),
      });
      userItems.push(instructorUser);
    }

    for (let i = 1; i < 61; i++) {
      const userItem = new User({
        name: `${faker.name.firstName()} ${faker.name.lastName()}`,
        email: `student${i}@ga.co`,
        password: await bcrypt.hash(`student${i}`, SALT_ROUNDS),
        role: 'Student',
        avatar: RandomAvatar(),
      });
      userItems.push(userItem);
    }

    const users = await User.create(userItems);

    res.status(200).json(users);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};



const index = async (req, res) => {
  try {

    const { _start, _end, idArray } = req.query;

    if (idArray) {
      User.find({ _id: { $in: idArray } })
        .then(foundUsers => {
          res.status(200).json(foundUsers);
        })
        .catch(error => {
          res.status(400).json({ error: error.message });
        })
    }

    function convert(_start, _end) {
      const start = parseInt(_start, 10);
      const end = parseInt(_end, 10);

      const page2 = start + 1; // the page number you want to fetch
      const limit = end - start; // the number of documents per page
      const page = start;

      return { page, limit }
    }

    if (_start || _end) {
      const total = await User.countDocuments({});
      const { page, limit } = convert(_start, _end);
      User.find({}).skip(page).limit(limit)
        .then(foundUsers => {

          res.set('x-total-count', total); //set the header to indicate x-total-count
          const startIndex = (page - 1) * limit;
          const endIndex = page * limit;
          const previousPage = page > 1 ? page - 1 : null; // Set previous page number or null if on first page
          const nextPage = endIndex < total ? page + 1 : null; // Set next page number or null if on last page
          if (previousPage !== null) {
            res.set('previousPage', previousPage);
          }
          if (nextPage !== null) {
            res.set('nextPage', nextPage);
          }

          res.status(200).json(foundUsers);
        })
        .catch(error => {
          res.status(400).json({ error: error.message });
        })
    } else {
      const foundUsers = await User.find({});
      res.status(200).json(foundUsers);
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const deleteUser = async (req, res) => {
  try {
    const deletedUser = await Course.findByIdAndDelete(req.params.id);
    res.status(200).json(deletedUser);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const show = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).populate("courses_id");
    res.status(200).json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getUser = async (req, res) => {
  try {
    //console.log("GetUser=>", req.body)
    const userAuth = {...req.body};
    const user = await User.findOne({ email: req.body.email }).populate("courses_id");
    

    if (!user && userAuth.name) {
      //console.log("User not found, creating user")

      //user not found, to create user
      const newUserData = {
        name: userAuth.name,
        email: userAuth.email,
        avatar: userAuth.picture,
        role: (userAuth.email==="ernesttan1976@gmail.com" ? "Admin":"Instructor")
      }
      //console.log("newUserData", newUserData)
      const newUser = await User.create(newUserData);
      //console.log("NewUser=>", newUser)
      res.status(200).json(newUserData);

    } else {
      //console.log("User found=>", user)
      res.status(200).json(user);
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const update = async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const enroll = async (req, res) => {
  try {
    //console.log("req.body=>", req.body)
    const {user, courses_id} = req.body;
    const updatedUser = await User.findOne({email: user.email})
    //console.log("User found?:",{...updatedUser})
    let newCourses_id=[];
    if (updatedUser.courses_id.length>0){
      newCourses_id = [...updatedUser.courses_id, ...courses_id];
    } else {
      //console.log(courses_id);
      newCourses_id = [...courses_id];
    }
    //console.log("newCourses_id:", newCourses_id)
    updatedUser.courses_id = [...newCourses_id];
    updatedUser.save()
    //console.log("Saved:",{...updatedUser})
    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  create,
  login,
  seed,
  index,
  show,
  getUser,
  delete: deleteUser,
  update,
  enroll,
};
