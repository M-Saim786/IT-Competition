const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    image: {
        type: String,
        // required: true,
        // trim: true,
    },

    gender: {
        type: String,
        enum: ['Male', 'Female', 'Other'],
        required: true,
    },
    course: {
        type: String,
        required: true,
    },
    fees: {
        type: Number,
        required: true

    }
}, { timestamps: true });

module.exports = mongoose.model("user", userSchema)
