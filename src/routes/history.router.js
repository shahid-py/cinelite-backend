const express = require("express");
const historyRouter = express.Router();
const { History } = require("../model/history.model");

historyRouter
  .route("/")
  .get(async (req, res) => {
    try {
      const  userId  = req.user;
      const getHistory = await History.findOne({ user: userId }).populate("user");
      res.send(getHistory);
    } catch (error) {
      res
        .status(404)
        .json({ success: false, message: "unable to retrieve history" });
    }
  })

  .post(async (req, res) => {
    // try {
    //   const { userId } = req.user;
    //   let { product } = req.body;

    //   const history = await History.findById(userId);
    //   history.products.push(product);
    //   const savedHistory = await history.save();
    //   res.json({
    //     success: true,
    //     history: savedHistory,
    //     message: "product added successfully to the history",
    //   });
    // } catch (error) {
    //   res
    //     .status(404)
    //     .json({
    //       success: false,
    //       message: "unable to add product to the history",
    //     });
    // }
    try {
      const { userId } = req.user;
      let { product } = req.body;
      const existingHistory = await History.findOne({ user: userId });
      console.log(existingHistory);
      let newProduct = {

        Model: product.name,
        Description: product.description,
        Date: new Date().toLocaleDateString(),
        Time: new Date().toLocaleTimeString("en-US", {timeZone: "Asia/Calcutta"})
      }
      if (existingHistory) {
        existingHistory.products.push(newProduct);
        await existingHistory.save();
        res.json({
          success: true,
          history: existingHistory,
          message: "product added successfully to the History",
        });
      } else {
        const newHistory = new History({
          user: userId,
        })
        newHistory.products.push(newProduct);
        await newHistory.save();
        res.json({
          success: true,
          history: newHistory,
          message: "product added successfully to the history",
        });
      }
    } catch (error) {
      res
        .status(404)
        .json({
          success: false,
          message: "unable to add product to the history",
        });
    }
  });

historyRouter.route("/:productId").delete(async (req, res) => {
  try {
    const { userId } = req.user;
    const { productId } = req.params;
    const history = await History.findById(userId);
    let productToBeDeleted = history.products.find(
      (product) => product._id.toString() === productId
    );

    history.products.pop(productToBeDeleted);

    res.json({
      success: true,
      history,
      message: "product successfully removed from history",
    });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
});

module.exports = historyRouter;