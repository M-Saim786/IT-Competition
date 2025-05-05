const userValidation = require('../validation/user.validation');
const User = require('../models/userSchema');
const Joi = require('joi');
// const userValidation  = require("../validation/user.validation")
const mongoose = require('mongoose');
const { errorResponse } = require('../utils/statusCodes');


require("dotenv").config()
const cloudinary = require('cloudinary').v2;
cloudinary.config({
    cloud_name: process.env.cloudinary_Name,
    api_key: process.env.cloudinary_Api_key,
    api_secret: process.env.cloudinary_Secret_key
});


// Create a new user
const createUser = async (req, res) => {
    try {
        const { value, error } = userValidation.validate(req.body);
        if (error) return errorResponse(res, 400, error.details[0].message);
        // Check for uploaded file
        if (!req.file) {
            return res.status(400).json({ message: "User Image is required" });
        }

        // Upload image to Cloudinary
        const cloud = await cloudinary.uploader.upload(req.file.path, { folder: "userImg" });
        value.image = await cloud.secure_url;
        // value.image = await cloud.secure_url.split("upload/")[1];
        console.log(cloud);
        const user = new User({
            ...value
        });

        const savedUser = await user.save();
        res.status(201).json(savedUser);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get all users
const getAllUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get a single user by ID
const getUserById = async (req, res) => {
    try {
        if (!mongoose.isValidObjectId(req.params.id)) {
            return res.status(400).json({ error: 'Invalid user ID' });
        }

        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Update a user by ID
const updateUser = async (req, res) => {
    try {
        const { name, image, course, fees, gender } = req.body;
        if (!mongoose.isValidObjectId(req.params.id)) {
            return res.status(400).json({ error: 'Invalid user ID' });
        }
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        user.name = name || user.name;
        user.image = image || user.image;
        user.course = course || user.course;
        user.fees = fees ? parseFloat(fees) : user.fees;
        user.gender = gender || user.gender;

        const updatedUser = await user.save();
        res.status(200).json(updatedUser);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Delete a user by ID
const deleteUser = async (req, res) => {
    try {
        if (!mongoose.isValidObjectId(req.params.id)) {
            return res.status(400).json({ error: 'Invalid user ID' });
        }

        const user = await User.findByIdAndDelete(req.params.id);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    createUser,
    getAllUsers,
    getUserById,
    updateUser,
    deleteUser,
};