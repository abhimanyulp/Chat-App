const mongoose = require("mongoose");


//user schema
const userSchema = mongoose.Schema({
    email: String,
    pass: String,
    username: String
},{
    versionKey:false
})

const UserModel = mongoose.model("user",userSchema);

module.exports = {UserModel};