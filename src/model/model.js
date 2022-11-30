const mongoose = require('mongoose')
const userSchema = new mongoose.Schema({
    title:{
        type: String,
        required: true
    },
    date1:{
        type: String
    },
    time1:{
        type: String
    },
    date2:{
        type: String
    },
    note:{
        type: String
    },
    time2:{
        type: String
    },
    book:{
        type: Number
    },
    bookend:{
        type: Number
    },
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "userRegister"
    }
})
const userModel = new mongoose.model("scheduleUser", userSchema)
module.exports = userModel