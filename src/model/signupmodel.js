const mongoose = require('mongoose')
const signupUserSchema = new mongoose.Schema({
    fname:{
        type: String,
        required: true
    },
    lname:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    mobile:{
        type: String,
        required: true
    },
    address:{
        type: String,
        required: true
    },
    vatTaxNumber:{
        type: String,
        required: true
    },
    introduction:{
        type: String,
        required: true
    },
    registered:{
        type: Boolean
    },
    vatImage:{
        data: Buffer,
        contentType: String
    },
    profImage:{
        data: Buffer,
        contentType: String
    }
})
const userSignupModel = new mongoose.model("userSignup", signupUserSchema)
module.exports = userSignupModel