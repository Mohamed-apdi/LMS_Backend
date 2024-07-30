import { generateToken } from "../Config/jwtToken.js";
import User from "../Model/UserModel.js";
import asyncHandler from "express-async-handler";

// Create user
export const createUser = asyncHandler(async (req, res) => {
    const { email } = req.body;
    try {
        const findUser = await User.findOne({ email });

        if (!findUser) {
            const newUser = new User(req.body);
            await newUser.save();
            res.status(201).json(newUser);
        } else {
            res.status(400).json({ message: "User already exists" });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Get single user
export const getUser = asyncHandler(async (req, res) => {
    const { id } = req.params;

    try {
        const user = await User.findById(id);
        if (user) {
            res.status(200).json(user);
        } else {
            res.status(404).json({ message: "User not found" });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Get all users
export const getUsers = asyncHandler(async (req, res) => {
    try {
        const users = await User.find({});
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Update user
export const updateUser = asyncHandler(async (req, res) => {
    const { id } = req.params;

    try {
        const user = await User.findByIdAndUpdate(id, req.body, {
            new: true,
        });

        if (!user) {
            res.status(404).json({ message: "User not found" });
        } else {
            res.status(200).json(user);
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Delete user
export const deleteUser = asyncHandler(async (req, res) => {
    const { id } = req.params;

    try {
        const user = await User.findByIdAndDelete(id);

        if (!user) {
            res.status(404).json({ message: "User not found" });
        } else {
            res.status(200).json({ message: "User deleted successfully" });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Login user functionality
export const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    try {
        // Find user by email
        const findUser = await User.findOne({ email });

        if (!findUser) {
            res.status(400).json({ message: "Invalid email, please provide a valid email address." });
            return;
        }

        // Compare password
        const isMatchPassword = await findUser.comparePassword(password);

        if (!isMatchPassword) {
            res.status(400).json({ message: "Invalid password" });
            return;
        }

        // Generate token
        const token = generateToken(findUser._id);

        // Store token in cookie
        res.cookie("token", token, {
            httpOnly: true,
            maxAge: 7 * 24 * 60 * 60 * 1000, // 7 day
        });

        // Respond with user information
        res.status(200).json({
            _id: findUser._id,
            username: findUser.username,
            mobile: findUser.mobile,
            email: findUser.email,
            token: token,
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


// logout user functionality
export const logoutUser = asyncHandler( async (req,res) => {
    const cookie = req.cookies;

    try {
        if (cookie?.token) {
            res.clearCookie("token", {
                httpOnly: true,
                secure: true,
            });
            return res.status(204).json({ message: "User logged out successfully" });
        } else {
            res.status(400).json({ message: "No token found" });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});