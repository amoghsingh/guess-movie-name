const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require("../models/user.model");
const {generateAccesstoken, generateRefreshtoken} = require('../utils/jwt');
const crypto = require("crypto");
const questions = require("../data/questions");

exports.register = async(req, res) => {
    const {email, password} = req.body;

    if(User.findByEmail(email)){
        return res.status(409).json({message:"User already exists"});
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const user = User.create({
        id:crypto.randomUUID(),
        email,
        password:hashedPassword
    });

    res.status(201).json({message:"User registered successfully"});
};

exports.login = async(req, res) => {
    const {email, password} = req.body;

    const user = User.findByEmail(email);
    if(!user){
        return res.status(401).json({message:"Invalid credentials"});
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if(!passwordMatch){
        return res.status(401).json({message:"Invalid Credentials"});
    }

    const accesstoken = generateAccesstoken(user.id);
    const refreshtoken = generateRefreshtoken(user.id);

    user.refreshToken = refreshtoken;
    User.update(user);

    res.cookie("refreshToken", refreshtoken, {
        httpOnly:true,
         secure: process.env.NODE_ENV === "production",
         sameSite:"strict",
         maxAge:7*24*60*60*1000
    });
    res.json({accesstoken});
};

exports.refresh = (req, res) => {
    const token = req.cookies.refreshToken;

    if(!token){
        return res.status(401).json({message:"No refresh token"});
    }

    const user = User.findByRefreshToken(token);
    if(!user){
        return res.status(401).json({message:"Invalid refresh token"});
    }

    try{
        jwt.verify(token, process.env.REFRESH_TOKEN_SECRET);

        const newAccesstoken = generateAccesstoken(user.id);
        const newRefreshtoken = generateRefreshtoken(user.id);

        user.refreshToken = newRefreshtoken;
        User.update(user);

        res.cookie("refreshToken", newRefreshtoken, {
             httpOnly:true,
         secure: process.env.NODE_ENV === "production",
         samesite:"strict",
         maxAge:7*24*60*60*1000
        });
        res.json({accesstoken:newAccesstoken});
    }
    catch(error){
        return res.status(403).json({message:"Expired refresh token"});
    }
}

exports.logout = (req, res) => {
    const token = req.cookies.refreshToken;
    if(token){
        const user = User.findByRefreshToken(token);
        if(user){
            user.refreshToken = null;
            User.update(user);
        }
    }
    res.clearCookie("refreshToken");
    res.sendStatus(204);
};

exports.quiz = async(req, res) => {
    const baseUrl = `${req.protocol}://${req.get("host")}`;
    const quizWithPosters = questions.map(q => ({...q, poster:`${baseUrl}/images/${q.poster}`}))
    res.status(200).json(quizWithPosters);
}