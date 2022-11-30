const express = require("express");
const productRouter = express.Router();
const { Product } = require("../model/product.model");


productRouter.route("/")
  .get(async (req, res) => {
    try {
      const products = await Product.find({});
      res.json({ success: true, products })
    } catch (error) {
      res.status(500).json({ success: false, message: "unable to retrieve the products" })
    }
  })


module.exports = productRouter;