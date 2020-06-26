const Review = require('./../models/review')
exports.getReviewList = async(request, response) => {
    try {
        const reviewList = await Review.find({})
        response.status(200).json({
            reviewList
        })
    } catch (error) {
        response.status(400).json({
            message: "Error!!"
        })
    }
}

exports.createReview = async(request, response) => {
    try {
        const { author, content } = request.body
        if(!author || !content) {
            response.status(400).json({
                message: "Author, content is required"
            })
        }
        await Review.create({
            author: author,
            content: content
        })
        response.status(201).json({
            status: 'success',
            data: review
        })
    } catch (error) {
        response.status(400).json({
            message: error.message
        })
    }
}