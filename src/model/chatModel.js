const mongoose = require('mongoose')
const chatSchema = new mongoose.Schema({
    message: {
        type: String,
        // ref: "User"
    },
    sender:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "userRegister"
    },
    to:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "userRegister"
    },
    type:{
        type: String,
    },
    email: {
        type: String,
    },
    time: {
        type: String,
    }
},
{ timestamps: true})
const Chat = mongoose.model('Chat', chatSchema);
module.exports = Chat;