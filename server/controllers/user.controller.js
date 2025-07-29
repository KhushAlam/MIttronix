import User from "../models/user.model.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { parsePhoneNumberFromString } from "libphonenumber-js";
import mongoose from "mongoose";
import otpGenerator from "otp-generator";
import dotenv from "dotenv";
import twilio from "twilio";

dotenv.config();

const validatePhoneNumber = (phone, countryCode) => {
  try {
    const phoneNumber = parsePhoneNumberFromString(phone, countryCode);
    return phoneNumber ? phoneNumber.isValid() : false;
  } catch (error) {
    return false;
  }
};
  
const client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

const sendOtp = async (contactNumber) => {
  const otp = otpGenerator.generate(6, { upperCase: false, specialChars: false });
  console.log(`Sending OTP ${otp} to ${contactNumber}`);
  
  await client.messages.create({
    body: `Your OTP is ${otp}`,
    from: process.env.TWILIO_PHONE_NUMBER,
    to: contactNumber
  });
};


export const userSignup = async (req, res) => {
  try {
    const { name, contactNumber, password } = req.body;

    if (!contactNumber || !password || !name)
      return res.status(400).json({
        message: "all fields are required",
      });

    if (!validatePhoneNumber(contactNumber, "IN")) {
      return res.status(400).json({
        message:
          "Invalid Indian phone number format. Please provide a 10-digit number.",
      });
    }

    const existingUser = await User.findOne({ contactNumber });
    if (existingUser) {
      return res
        .status(409)
        .json({ message: "A user with this phone number already exists." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      name,
      contactNumber,
      hashedPassword,
    });

    const token = jwt.sign({
        id: newUser._id,
        contactNumber: newUser.contactNumber,
        role: "Seller",
      },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.status(201).json({
      message: "User registered successfully!",
      token,
      user: {
        id: newUser._id,
        contactNumber: newUser.contactNumber,
      },
    });
  } catch (error) {
    res.status(500).json({
      message: "error registering user",
      error,
    });
    console.log("Signup error:", error.message);
    
  }
};

export const userLogin = async (req, res) => {
  try {
    const { contactNumber, password } = req.body;

    if (!contactNumber || !password) {
      return res.status(400).json({ message: "Contact number and password are required" });
    }

    const user = await User.findOne({ contactNumber });
    if (!user) {
      return res.status(404).json({ message: "User not found. Please sign up first." });
    }

    const isPasswordValid = await bcrypt.compare(password, user.hashedPassword);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid password" });
    }

    const token = jwt.sign(
      {
        id: user._id,
        contactNumber: user.contactNumber,
        role: "Seller",
      },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.status(200).json({
      message: "Login successful!",
      token,
      user: {
        id: user._id,
        contactNumber: user.contactNumber,
      },
    });
  } catch (error) {
    console.error("Login error:", error.message);
    res.status(500).json({
      message: "Error logging in user",
      error,
    });
  }
};

export const resetPassword = async (req, res) => {
  try {
    const { contactNumber } = req.body;

    if (!contactNumber) {
      return res.status(400).json({ message: "Contact number is required" });
    }

    if (!validatePhoneNumber(contactNumber, "IN")) {
      return res.status(400).json({
        message: "Invalid Indian phone number format. Please provide a 10-digit number.",
      });
    }

    const verifyOtp = await sendOtp(contactNumber);
    const { otp } = req.body;
    if (!otp) {
      return res.status(400).json({ message: "OTP is required" });
    }

    if (otp !== verifyOtp) {
      return res.status(400).json({ message: "Invalid OTP" });
    }
    const newPassword = req.body.newPassword;
    if (!newPassword) {
      return res.status(400).json({ message: "New password is required" });
    }

    res.status(200).json({ message: "Password reset successfully" });
  } catch (error) {
    console.error("Reset password error:", error.message);
    res.status(500).json({
      message: "Error resetting password",
      error,
    });
  }
};
