import express from "express";
import mongoose from "mongoose";
import { User } from "../Models/User.js";
import bcrypt, { compare } from "bcrypt";
import jwt from "jsonwebtoken";
import "dotenv/config";

export const userRouter = express.Router();
// login user
userRouter.post("/login", async (req, res) => {
  try {
    const loginUser = await User.findOne({ email: req.body.email });

    if (!loginUser) {
      return res.status(500).json({ message: "user doesn't exist" });
    }

    const validatePassword = await bcrypt.compare(
      req.body.password,
      loginUser.password
    );

    if (!validatePassword) {
      return res.status(400).json({ message: "invalid credentials" });
    }

    const token = jwt.sign({ id: loginUser._id }, process.env.SECRET_KEY);

    res
      .status(200)
      .json({ message: "user logged in successfully", user: true, token });
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: "internal server error" });
  }
});

// Signup User
userRouter.post("/signup", async (req, res) => {
  try {
    const signupUser = await User.findOne({ email: req.body.email });

    if (signupUser) {
      return res
        .status(400)
        .json({ message: "user already exists", existingUser: true });
    }

    const hashedPassword = bcrypt.hashSync(req.body.password, 10);

    const newUser = await new User({
      ...req.body,
      password: hashedPassword,
    }).save();

    const token = jwt.sign({ id: newUser._id }, process.env.SECRET_KEY);

    newUser
      ? res
          .status(200)
          .json({ message: "user created successfully", newUser, token })
      : res.status(500).json({ message: "unable to create new user" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "internal server error" });
  }
});
