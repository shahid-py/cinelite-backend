const express = require("express");
const { Chat } = require("../model/chatModel");
const { getAllChats } = require('../controllers/messageControllers')
// const {auth} = require('../middleware/auth')
const router = express.Router();
// router.get("/getChats", async(req, res)=>{
//     // Chat.find().populate("sender").exec((err, chats)=>{
//     //     if(err){return res.send(err)}
//     //     res.send(chats)
//     // })
//     // let chats = await Chat.find();
//     res.send("chats");
// })
router.route('/').get(getAllChats);
module.exports = router;