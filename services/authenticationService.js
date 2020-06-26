const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const User = require('./../models/user')

const loginWithEmail = async(email, password) => {
    const user = await user.findOne({email: email});
    if (!user) {
        throw new Error(`Cannot find user with email ${email}`)
    }
    const match = await bcrypt.compare(password, user.password)

    if (!match) {
        throw new Error(`Unable to login`)
    }
    console.log(`logonWithEmail ${user}`)
    return user;
}

exports.generateToken = async(user) => {
    const token = jwt.sign({id: user._id}, "gfkgfg", {expiresIn: '7d'})
    user.tokens.push(token)
    await user.save();
    return token;
}