import { NextFunction, Request, Response } from "express";
import User from "../models/user.js"; // Ensure the correct import path
import { compare, hash } from "bcrypt";
import { createToken } from "../utils/token-manager.js";
import { COOKIE_NAME } from "../utils/constants.js";

// Get all users (for testing purposes)
export const getALLUsers = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const users = await User.find();
    return res.status(200).json({ message: "OK", users });
  } catch (error) {
    console.error(error);
    next(error); // Pass the error to the error-handling middleware
  }
};

// User signup
export const userSignup = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { name, email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: "User already registered" });
    }

    const hashedPassword = await hash(password, 10);
    const newUser = new User({ name, email, password: hashedPassword });
    await newUser.save();

    const token = createToken(newUser._id.toString(), newUser.email, "7d");
    const expires = new Date();
    expires.setDate(expires.getDate() + 7);
    res.cookie(COOKIE_NAME, token, {
      path: "/", 
      domain: "localhost", 
      expires, 
      httpOnly: true, 
      signed: true
    });

    return res.status(201).json({ message: "User created successfully", name: newUser.name, email: newUser.email });
  } catch (error) {
    console.error("Signup error:", error);
    return res.status(500).json({ message: "ERROR", cause: error.message });
  }
};

// User login
export const userLogin = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "User not registered" });
    }

    const isPasswordCorrect = await compare(password, user.password);
    if (!isPasswordCorrect) {
      return res.status(403).json({ message: "Password is incorrect" });
    }

    const token = createToken(user._id.toString(), user.email, "7d");
    const expires = new Date();
    expires.setDate(expires.getDate() + 7);
    res.cookie(COOKIE_NAME, token, {
      path: "/", 
      domain: "localhost", 
      expires, 
      httpOnly: true, 
      signed: true
    });

    return res.status(200).json({ message: "Login successful", name: user.name, email: user.email });
  } catch (error) {
    console.error("Login error:", error);
    next(error); // Pass the error to the error-handling middleware
  }
};

// Verify user
export const verifyUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = await User.findById(res.locals.jwtData.id);
    if (!user) {
      return res.status(401).json({ message: "User not registered OR Token malfunctioned" });
    }

    if (user._id.toString() !== res.locals.jwtData.id) {
      return res.status(401).send("Permissions didn't match");
    }

    return res.status(200).json({ message: "OK", name: user.name, email: user.email });
  } catch (error) {
    console.error("Verification error:", error);
    return res.status(500).json({ message: "ERROR", cause: error.message });
  }
};

// User logout
export const userLogout = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = await User.findById(res.locals.jwtData.id);
    if (!user) {
      return res.status(401).json({ message: "User not registered OR Token malfunctioned" });
    }

    if (user._id.toString() !== res.locals.jwtData.id) {
      return res.status(401).send("Permissions didn't match");
    }

    res.clearCookie(COOKIE_NAME, {
      httpOnly: true,
      domain: "localhost", 
      signed: true,
      path: "/"
    });

    return res.status(200).json({ message: "Logout successful", name: user.name, email: user.email });
  } catch (error) {
    console.error("Logout error:", error);
    return res.status(500).json({ message: "ERROR", cause: error.message });
  }
};
