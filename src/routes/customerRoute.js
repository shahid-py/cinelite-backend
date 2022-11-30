const express = require("express");
const { addCustomers, getCustomers } = require("../controllers/customerControllers");
const router = express.Router();
router.route('/').post(addCustomers);
router.route('/get').get(getCustomers);
module.exports = router;