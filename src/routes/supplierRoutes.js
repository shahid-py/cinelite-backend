const express = require("express");
const { addSuppliers, getSuppliers } = require("../controllers/supplierControllers");
const router = express.Router();
router.route('/').post(addSuppliers);
router.route('/get').get(getSuppliers);
module.exports = router;