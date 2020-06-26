const mongoose = require("mongoose");
const bcrypt = require('bcrypt')

const userSchema = mongoose.Schema ({
    name: {
        type: String,
        required: [true, "Name is required"]
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        unique: true
    },
    password: {
        type: String,
        required: [true, "Password is required"]
    },
    tokens: [{//this is an array because we allow the same users to log in with several devices
        type: String
    }]

})

const User = mongoose.model("User", userSchema)

module.exports = User;