const express = require("express");
const { userModel } = require("../model/userModel");
const jwt = require("jsonwebtoken");
const userRoute = express.Router();



userRoute.post("/register", async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await userModel.findOne({ email });
        if (user) {
            return res.status(400).json({ msg: "user already exist" });
        }
        const newUser = new userModel({ ...req.body });
        await newUser.save();
        return res.status(200).json({ msg: "user registered" });
    } catch (err) {
        return res.status(400).json({ error: err.message });
    }
})

userRoute.post("/login", async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await userModel.findOne({ email });

        if (user && password == user.password) {
            const token = jwt.sign({ userID: user._id },"loginSecretKey");

            return res.status(200).json({ msg: "login successful", token });
        } else {
            return res.status(400).json({ msg: "wrong credentials" });
        }
    } catch (err) {

        return res.status(400).json({ error: err.messaage });

    }
})

module.exports = { userRoute };