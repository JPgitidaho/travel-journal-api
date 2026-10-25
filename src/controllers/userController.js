
import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    if (
      typeof username !== "string" ||
      typeof email !== "string" ||
      typeof password !== "string" ||
      !username.trim() ||
      !email.trim() ||
      !password
    ) {
      return res.status(400).json({
        error: "Username, email and password are required"
      });
    }

    if (password.length < 8) {
      return res.status(400).json({
        error: "Password must contain at least 8 characters"
      });
    }

    const normalizedEmail = email.trim().toLowerCase();

    const existingUser = await User.findOne({
      email: normalizedEmail
    });

    if (existingUser) {
      return res.status(409).json({
        error: "User already exists"
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      username: username.trim(),
      email: normalizedEmail,
      password: hashedPassword
    });

    return res.status(201).json({
      message: "User registered",
      user: {
        id: user._id,
        username: user.username,
        email: user.email
      }
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(409).json({
        error: "User already exists"
      });
    }

    console.error("Registration error:", error);
    return res.status(500).json({
      error: "Unable to register user"
    });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (
      typeof email !== "string" ||
      typeof password !== "string" ||
      !email.trim() ||
      !password
    ) {
      return res.status(400).json({
        error: "Email and password are required"
      });
    }

    const normalizedEmail = email.trim().toLowerCase();

    const user = await User.findOne({
      email: normalizedEmail
    });

    if (!user) {
      return res.status(400).json({
        error: "Invalid credentials"
      });
    }

    const isMatch = await bcrypt.compare(
      password,
      user.password
    );

    if (!isMatch) {
      return res.status(400).json({
        error: "Invalid credentials"
      });
    }

    if (!process.env.JWT_SECRET) {
      console.error("JWT_SECRET is not configured");

      return res.status(500).json({
        error: "Authentication unavailable"
      });
    }

    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    return res.status(200).json({
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email
      }
    });
  } catch (error) {
    console.error("Login error:", error);

    return res.status(500).json({
      error: "Unable to log in"
    });
  }
};

export const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id)
      .select("-password");

    if (!user) {
      return res.status(404).json({
        error: "User not found"
      });
    }

    return res.status(200).json(user);
  } catch (error) {
    console.error("Get profile error:", error);

    return res.status(500).json({
      error: "Unable to retrieve profile"
    });
  }
};

export const updateProfile = async (req, res) => {
  try {
    const updates = {};

    if (req.body.username !== undefined) {
      if (
        typeof req.body.username !== "string" ||
        !req.body.username.trim()
      ) {
        return res.status(400).json({
          error: "Invalid username"
        });
      }

      updates.username = req.body.username.trim();
    }

    if (req.body.email !== undefined) {
      if (
        typeof req.body.email !== "string" ||
        !req.body.email.trim()
      ) {
        return res.status(400).json({
          error: "Invalid email"
        });
      }

      updates.email = req.body.email.trim().toLowerCase();
    }

    if (req.body.password !== undefined) {
      if (
        typeof req.body.password !== "string" ||
        req.body.password.length < 8
      ) {
        return res.status(400).json({
          error: "Password must contain at least 8 characters"
        });
      }

      updates.password = await bcrypt.hash(
        req.body.password,
        10
      );
    }

    if (Object.keys(updates).length === 0) {
      return res.status(400).json({
        error: "No valid fields provided"
      });
    }

    const user = await User.findByIdAndUpdate(
      req.user.id,
      { $set: updates },
      {
        new: true,
        runValidators: true
      }
    ).select("-password");

    if (!user) {
      return res.status(404).json({
        error: "User not found"
      });
    }

    return res.status(200).json({
      message: "User updated",
      user
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(409).json({
        error: "Email already exists"
      });
    }

    console.error("Update profile error:", error);

    return res.status(400).json({
      error: "Unable to update profile"
    });
  }
};

export const deleteProfile = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(
      req.user.id
    );

    if (!user) {
      return res.status(404).json({
        error: "User not found"
      });
    }

    return res.status(200).json({
      message: "User deleted"
    });
  } catch (error) {
    console.error("Delete profile error:", error);

    return res.status(500).json({
      error: "Unable to delete profile"
    });
  }
};
