import { User } from "../models/user.model.js";
import bcrypt from "bcryptjs";
import crypto from "crypto";
import { generateToken } from "../utils/generateToken.js";
import {
  sendPasswordResetEmail,
  sendPasswordResetSuccessEmail,
  sendVerificationEmail,
  sendWelcomeEmail,
} from "../mailtrap/email.js";

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
  try {
    const { email, password } = req.body;

    if (!email || !password) throw new Error("All fields are required");

    const user = await User.findOne({ email });

    if (!user)
      return res
        .status(400)
        .json({ success: false, message: "Invalid credentials" });

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid)
      return res
        .status(400)
        .json({ success: false, message: "Invalid credentials" });

    generateToken(res, user._id);

    user.lastLogin = Date.now();

    await user.save();

    const currentUser = await User.findById(user._id).select("-password");

    return res
      .status(200)
      .json({ success: true, message: "User logged in", currentUser });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

const logout = async (req, res) => {
  res.clearCookie("token");
  return res.status(200).json({ success: true, message: "User logged out" });
};

const forgotPassword = async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user)
      return res
        .status(400)
        .json({ success: false, message: "User doesn't exists" });

    const resetToken = crypto.randomBytes(20).toString("hex");
    const resetTokenExpiry = Date.now() + 1 * 60 * 60 * 1000;

    user.resetPasswordToken = resetToken;
    user.resetPasswordTokenExpiresAt = resetTokenExpiry;

    await user.save();

    await sendPasswordResetEmail(
      email,
      `${process.env.CLIENT_URL}/reset-password/${resetToken}`
    );

    return res
      .status(200)
      .json({ success: true, message: "Password reset mail sent" });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

const resetPassword = async (req, res) => {
  const { token } = req.params;
  const { password } = req.body;

  try {
    const user = await User.findOne({
      resetPasswordToken: token,
      resetPasswordTokenExpiresAt: {
        $gt: Date.now(),
      },
    });

    if (!user)
      return res
        .status(400)
        .json({ success: false, message: "User doesn't exists" });

    const newPassword = await bcrypt.hash(password, 10);

    user.password = newPassword;
    user.resetPasswordToken = undefined;
    user.resetPasswordTokenExpiresAt = undefined;

    await user.save();

    await sendPasswordResetSuccessEmail(user.email);

    return res
      .status(200)
      .json({ success: true, message: "Password reset successful" });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

const checkAuth = async (req, res) => {
  try {
    const user = await User.findById(req.userId).select("-password");

    if (!user)
      return res
        .status(400)
        .json({ success: false, message: "User doesn't exists" });

    return res.status(200).json({ success: true, user });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export {
  signup,
  login,
  logout,
  verifyEmail,
  forgotPassword,
  resetPassword,
  checkAuth,
};
