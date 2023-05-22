const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
// optional shortcut to the mongoose.Schema class
const Schema = mongoose.Schema;
const SALT_ROUNDS = 6;

const usersSchema = new Schema(
  {
    name: { type: String, required: true },
    email: {
      type: String,
      unique: true,
      trim: true,
      lowercase: true,
      required: true,
    },
    password: {
      type: String,
      unique: true,
      trim: true,
      minLength: 5,
      required: true,
    },
    role: {
      type: String,
      default: "User",
      enum: ["User", "Admin"]
    },
    avatar: {
      type: String,
    },
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
  }
);

usersSchema.pre("save", async function (next) {
  // 'this' is the user doc
  if (!this.isModified("password")) return next();
  // update the password with the computed hash pw
  this.password = await bcrypt.hash(this.password, SALT_ROUNDS);
  return next();
});

usersSchema.set("toJSON", {
  transform: function (doc, ret) {
    delete ret["password"];
    return ret;
  },
});

// let User;

// try {
//   // Try to retrieve the existing model
//   let User = mongoose.model("User");
  
// } catch (error) {
//   // If the model doesn't exist, define and compile it
//   let User = mongoose.model("User", usersSchema);
// }

module.exports = mongoose.model("User", usersSchema);