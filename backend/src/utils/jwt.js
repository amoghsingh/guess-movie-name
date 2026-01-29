const jwt = require('jsonwebtoken');

const generateAccesstoken = (userId) => {
    return jwt.sign({userId},process.env.ACCESS_TOKEN_SECRET,{expiresIn:process.env.ACCESS_TOKEN_EXPIRES_IN});
}

const generateRefreshtoken = (userId) => {
    return jwt.sign({userId},process.env.REFRESH_TOKEN_SECRET,{expiresIn:process.env.REFRESH_TOKEN_EXPIRES_IN})
}

module.exports = {generateAccesstoken, generateRefreshtoken}