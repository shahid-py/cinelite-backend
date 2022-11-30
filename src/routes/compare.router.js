const express = require("express");
const compareRouter = express.Router();
const { Compare } = require("../model/compare.model");

compareRouter
  .route("/")
  .get(async (req, res) => {
    try {
      const  userId  = req.user;
      const compare = await Compare.findById(userId).populate("products._id");

      const compareItem = compare.products.map((item) => {
        return { ...item._id._doc };
      });

      res.json({ success: true, compare: compareItem, userId });
    } catch (error) {
      res
        .status(404)
        .json({ success: false, message: "unable to retrieve wishlist" });
    }
  })

  .post(async (req, res) => {
    try {
      const { userId } = req.user;
      let { product } = req.body;

      const compare = await Compare.findById(userId);
      compare.products.push(product);
      const savedCompare = await compare.save();
      res.json({
        success: true,
        compare: savedCompare,
        message: "product added successfully to the compare",
      });
    } catch (error) {
      res
        .status(404)
        .json({
          success: false,
          message: "unable to add product to the compare",
        });
    }
  });

compareRouter.route("/:productId").delete(async (req, res) => {
  try {
    const { userId } = req.user;
    const { productId } = req.params;
    const compare = await Compare.findById(userId);
    let productToBeDeleted = compare.products.find(
      (product) => product._id.toString() === productId
    );

    compare.products.pop(productToBeDeleted);

    res.json({
      success: true,
      compare,
      message: "product successfully removed from compare",
    });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
});

module.exports = compareRouter;