const User = require('./../models/user')
const bcrypt = require('bcrypt')
const { generateToken } = require('./../services/authenticationService')

exports.getUserList = async (request, response) => {
    try {
        const userList = await User.find({})
        response.status(200).json({
            userList
        })
    } catch (error) {
        response.stats(400).json({
            message: "Error happens"
            //message: error.message
        })
    }
}

exports.createUser = async (request, response) => {
    try {
        console.log("request body 213", request.body.name)

        const { email, name, password } = request.body

        if (!name || !email || !password) {
            response.status(400).json({
                message: "Name, email, password are required"
            })
        }
        const hashedPassword = await bcrypt.hash(password, 10)
        const user = await User.create({
            email: email,
            name: name,
            password: hashedPassword
        })

        const token = await generateToken(user);

        response.status(201).json({
            status: 'success',
            data: { user, token }
        })
    } catch (error) {
        response.status(400).json({
            message: error.message
        })
    }
}

exports.login = async (request, response) => {
    try {
        //1. check the validity of data
        const { email, password } = request.body
        if (!email || !password) throw new Error("Email and password are required")

        //2. check email & password correct
        const user = await loginWithEmail(email, password);
        const token = await generateToken(user);
        //3. response to the user
        response.status(200).json({
            status: 'success',
            data: { user, token }
        })
    } catch (error) {
        response.status(400).json({
            status: 'fail',
            message: error.message
        })
    }
}