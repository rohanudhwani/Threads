const mongoose = require('mongoose');



const userSchema = new mongoose.Schema({
    name: {
        type: String,
        unique: true,
        required: true,
    },
    email: {
        type: String,
        required: true,
        max: 50,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        min: 6,
    },
    profilePicture: {
        type: String,
        default: "",
    },
    joinDate: {
        type: Date,
        default: Date.now,
    },
    sentFollowRequest: {
        type: mongoose.Schema.Types.ObjectId,
        ref:"User",
    },
    receivedFollowRequest: {
        type: mongoose.Schema.Types.ObjectId,
        ref:"User",
    },
    followers: {
        type: mongoose.Schema.Types.ObjectId,
        ref:"User",
    },
    verified: {
        type: Boolean,
        default: false,
    },
    verificationToken: {
        type: String,
        default: "",
    },
});

const User = mongoose.models("User", userSchema);

module.exports = User;