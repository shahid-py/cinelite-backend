const express = require("express");
const {registerUser, getInvite, getUsers, setPassword, verifyUser, loginUser, updateUser, getUser, calendarUser, viewCalendar, calendarDelete, updateCalendar, getChats, getChatbyId, getAnotherUsers, accessChat, getInvoice, createInvoice, authenticateUser} = require('../controllers/userController')
const {auth} = require('../middleware/auth')
const router = express.Router();
router.route("/chat").get(getChats).post(accessChat);
router.route("/chat/:id").get(getChatbyId);
router.route("/authenticate").get(authenticateUser);
router.route("/register").post(registerUser);
router.route("/admInvite").post(getInvite);
router.route("/admlogin").get(getUsers);
router.route("/pass").post(setPassword);
router.route("/admverify").post(verifyUser);
router.route("/userlogin").post(loginUser);
router.route('/update').post(updateUser);
// router.route('/getUser').get(auth, getUser);
router.route('/getAnotherUsers').get(getAnotherUsers);
router.route('/schedule').post(calendarUser);
router.route('/getCalendar').post(viewCalendar);
// router.route('/getCalendar').post(updateCalendar);
router.route('/getCalendar/:id').delete(calendarDelete);
router.route('/create').get(createInvoice);
router.route('/getInvoice').get(getInvoice);
module.exports = router;