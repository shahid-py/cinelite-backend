const Chat = require('../model/chatModel');
exports.getAllChats = async(req, res)=>{
     await Chat.find().populate("sender").populate("to").exec((err, chats)=>{
        if(err){return res.send(err)}
        res.send(chats)
    })
}