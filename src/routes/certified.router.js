const express = require("express");
const certifiedRouter = express.Router();
const { Certified } = require("../model/certified.model");

certifiedRouter
  .route("/")
  .get(async (req, res) => {
    try {
      const  userId  = req.user;
      const certified = await Certified.findById(userId).populate("products._id");

      const certifiedItem = certified.products.map((item) => {
        return { ...item._id._doc };
      });

      res.json({ success: true, certified: certifiedItem, userId });
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

      const certified = await Certified.findById(userId);
      certified.products.push(product);
      const savedCertified = await certified.save();
      res.json({
        success: true,
        certified: savedCertified,
        message: "product added successfully to the certified",
      });
    } catch (error) {
      res
        .status(404)
        .json({
          success: false,
          message: "unable to add product to the certified",
        });
    }
  });

certifiedRouter.route("/:productId").delete(async (req, res) => {
  try {
    const { userId } = req.user;
    const { productId } = req.params;
    const certified = await Certified.findById(userId);
    let productToBeDeleted = certified.products.find(
      (product) => product._id.toString() === productId
    );

    certified.products.pop(productToBeDeleted);

    res.json({
      success: true,
      certified,
      message: "product successfully removed from certified",
    });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
});

module.exports = certifiedRouter;