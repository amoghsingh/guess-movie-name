const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require('cors');
const path = require("path");


const authRoutes = require("./routes/auth.routes");

const app=express();

app.use("/images", express.static(path.join(__dirname, "public/images")));
app.use(cors()); // enables CORS for all origins
app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRoutes);
module.exports=app;