import { User } from "../models/user.model.js";
import bcrypt from "bcryptjs";
import { generateToken } from "../utils/generateToken.js";
import { sendVerificationEmail, sendWelcomeEmail } from "../mailtrap/email.js";

const signup = async (req, res) => {
  const { email, password, name } = req.body;

  try {
    if (!email || !password || !name)
      throw new Error("All fields are required");

    // check if user already exists
    const userAlreadyExists = await User.findOne({ email });

    if (userAlreadyExists)
      return res
        .status(400)
        .json({ success: false, message: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);
    const verificationToken = Math.floor(
      Math.random() * 900000 + 100000
    ).toString();

    // create new user
    const newUser = await User.create({
      email,
      password: hashedPassword,
      name,
      verificationToken,
      verificationTokenExpiresAt: Date.now() + 24 * 60 * 60 * 1000,
    });

    const currentUser = await User.findById(newUser._id).select("-password");

    // generate token
    generateToken(res, newUser._id);

    // send verification code
    await sendVerificationEmail(currentUser.email, verificationToken);

    return res.status(201).json({
      success: true,
      user: currentUser,
      message: "User created successfully",
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

const verifyEmail = async (req, res) => {
  try {
    const { code } = req.body;

    const user = await User.findOne({
      verificationToken: code,
      verificationTokenExpiresAt: {
        $gt: Date.now(),
      },
    });

    if (!user)
      return res.status(400).json({ success: false, message: "Invalid code" });

    user.isVerified = true;
    user.verificationToken = undefined;
    user.verificationTokenExpiresAt = undefined;

    await user.save();

    // sent welcome email
    await sendWelcomeEmail(user.name, user.email);

    const currentUser = await User.findById(user._id).select("-password");

    return res.status(200).json({
      success: true,
      message: "User verification successfull",
      currentUser,
    });
  } catch (error) {
    console.log("Verification email error :: ", error);
  }
};

const login = async (req, res) => {
  res.send("login");
};

const logout = async (req, res) => {
  res.send("logout");
};

export { signup, login, logout, verifyEmail };
