const express = require("express");
const watchlistRouter = express.Router();
const { Watchlist } = require("../model/watchlist.model");

watchlistRouter
  .route("/")
  .get(async (req, res) => {
    try {
      const  userId  = req.user;
      const watchlist = await Watchlist.findById(userId).populate("products._id");

      const watchlistItem = watchlist.products.map((item) => {
        return { ...item._id._doc };
      });

      res.json({ success: true, watchlist: watchlistItem, userId });
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

      const watchlist = await Watchlist.findById(userId);
      watchlist.products.push(product);
      const savedWatchlist = await watchlist.save();
      res.json({
        success: true,
        watchlist: savedWatchlist,
        message: "product added successfully to the watchlist",
      });
    } catch (error) {
      res
        .status(404)
        .json({
          success: false,
          message: "unable to add product to the watchlist",
        });
    }
  });

watchlistRouter.route("/:productId").delete(async (req, res) => {
  try {
    const { userId } = req.user;
    const { productId } = req.params;
    const watchlist = await Watchlist.findById(userId);
    let productToBeDeleted = watchlist.products.find(
      (product) => product._id.toString() === productId
    );

    watchlist.products.pop(productToBeDeleted);

    res.json({
      success: true,
      watchlist,
      message: "product successfully removed from watchlist",
    });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
});

module.exports = watchlistRouter;