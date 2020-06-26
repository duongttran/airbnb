const mongoose = require("mongoose");

const reviewSchema = mongoose.Schema({
    user: {
        type: String,
        required: [true, "User is required"]
    },
    content: {
        type: String,
        required: [true, "Content is required"]
    }
})

const Review = mongoose.model("Review", reviewSchema)

module.exports = Review;
