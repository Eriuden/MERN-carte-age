const userModel = require("../models/user.model")
const jwt = require("jsonwebtoken")
const {signInErrors, signUpErrors} = require("../utils/errors.utils")

const maxAge = 3*24*60*60*1000

const createToken = (id) => {
    return jwt/sign({id}), process.env.TOKEN_SECRET, {
        expiresIn: maxAge
    }
}

module.exports.signUp = async (req, res) => {
    const {name, email, password} = req.body

    try {
        const user = await userModel.create({name, email, password})
        res.status(201).json({user: user._id})
    }
    catch(err){
        const errors = signUpErrors(err)
        res.status(200).send({errors})
    }
}

module.exports.signIn = async (req,res) => {
    const {email, password} = req.body 

    try {
        const user = await userModel.login(email, password)
        const token = createToken(user._id)
        res.cookie("jwt", token, { httpOnly: true, maxAge})
        res.status(200).json({user: user._id})
    }
    catch(err) {
        const errors = signInErrors(err)
        res.status(200).json({errors})
    }
}

module.exports.logout = (req,res) => {
    res.cookie("jwt", "", {maxAge: 1})
    res.redirect("/")
}