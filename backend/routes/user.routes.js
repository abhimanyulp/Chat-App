const express = require("express");
const userRouter = express.Router();
const { UserModel } = require("../model/user.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
require("dotenv").config();

const sgMail = require("@sendgrid/mail")
sgMail.setApiKey(process.env.API_KEY)

// registeration
userRouter.post("/register", async (req, res) => {
    const { email, pass, username } = req.body;
    try {
        bcrypt.hash(pass, 5, async (err, hash) => {
            // Store hash in your password DB.
            const user = new UserModel({ email, pass: hash, username });
            await user.save()
            res.status(200).send({ "msg": "Registeration has been done!" });
        });

    } catch (err) {
        res.status(400).send({ "msg": err.message })
    }
})


//login
userRouter.post("/login", async (req, res) => {
    const { email, pass } = req.body
    try {
        const user = await UserModel.findOne({ email })

        if (user) {

            bcrypt.compare(pass, user.pass, (err, result) => {
                if (result) {
                    res.status(200).send({ "msg": "Login Successful", "email": user.email, "username": user.username, "token": jwt.sign({ "userID": user._id }, "masai") })
                } else {
                    res.status(400).send({ "msg": "Wrong Credentials" })
                }
            });
        }

    } catch (err) {
        res.status(400).send({ "msg": err.message })
    }
})


// OTP request
userRouter.post("/otp", async (req, res) => {
    const { email, otp } = req.body;
    try {
        const message = {
            to : email,
            from : "lp.abhimanyu@gmail.com",
            subject : "OTP Confimation!",
            text : `Your OTP is ${otp}` 
        }
        
        console.log(req.body)
        await sgMail
            .send(message)
            .then((result)=>{
                console.log("successfull")
                // console.log(result)
            })
            .catch((err)=>{
                console.log("error sending mail")
                // console.log(err)
            })

        res.status(200).send({ "msg": "OTP sent to the Email!" });

    } catch (err) {
        res.status(400).send({ "msg": err.message })
    }
})


//Update User's Password
userRouter.patch("/update/:userEmail", async (req,res)=>{
    const {userEmail} = req.params;
    const pass = req.body.pass;
    try{

        bcrypt.hash(pass, 5, async (err, hash) => {
            // Store hash in your password DB.
            await UserModel.findOneAndUpdate({email:userEmail}, {pass:hash})
            res.status(200).send({ "msg": "User Password been updated!" });
        });


    }catch(err){
        res.status(400).send({"msg":err.message})
    }
})


module.exports = { userRouter }