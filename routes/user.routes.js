const express = require("express")
const bcrypt = require("bcrypt")
const UserModel  = require("../models/User.model")
const jwt = require("jsonwebtoken")
const userController = express.Router();


userController.post("/register",  (req, res) => {
    const {email, password} = req.body;
    bcrypt.hash(password, 6, async function(err, hash){
        if(err){
            res.send("Please try again")
        }
        const user = new UserModel({
            email,
            password: hash
        })
        await user.save();
    })
    res.send("signup sucessfull")
})

userController.post("/login", async (req, res) => {
    const {email, password} = req.body;
    const user = await UserModel.findOne({email})
    const {_id}=user
    
    if(!user){
        return res.send("Invalid Credentials")
    }
    const hash = user.password;
    const userId = user._id
    bcrypt.compare(password, hash, function(err, result){
       if(result){
        var token = jwt.sign({email, userId}, "secret")
       return res.send({"message": "Login sucess", "token": token,"id":_id})
       }
       else{
        return res.send("Invalid input")
       }
    })
   
})



module.exports = userController