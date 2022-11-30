const express = require("express");
const packagesRouter = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const { User } = require("../model/user.model");

packagesRouter.route("/packages").post(async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (user) {
      const validatePassword = await bcrypt.compare(password, user.password);
      console.log({ validatePassword });
      if (validatePassword) {
        const token = jwt.sign({ userId: user._id }, secret, {
          expiresIn: "24h",
        });
        return res.status(200).json({
          success: true,
          message: "user successfully logged in",
          user,
          token,
        });
      }
      return res
        .status(400)
        .json({ success: false, message: "Invalid password" });
    }
    return res.status(401).json({
      success: false,
      message: "Unathorized access, user does not exist!",
    });
  } catch (error) {
    res.status(500).json({ success: false, errorMessage: error.message });
  }
});

module.exports = packagesRouter;