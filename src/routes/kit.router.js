const express = require("express");
const kitRouter = express.Router();
const { Kit } = require("../model/kit.model");


kitRouter
  .route("/")
  .get(async (req, res) => {
    try {
      const userId = req.user;
      console.log(req.user, userId);
      const getKit = await Kit.findOne({ user: userId }).populate("user");
      res.send(getKit);
    } 
    catch (error) {
      res
        .status(404)
        .json({ success: false, message: "unable to retrieve kit" });
    }
  })

  .post(async (req, res) => {
    try {
      const { userId } = req.user;
      let { product } = req.body;
      const existingKit = await Kit.findOne({ user: userId });
      console.log(existingKit);
      let newProduct = {
        Company: product.typeOfBrand,
        Model: product.name,
        Imageexist: product.image,

      }
      if (existingKit) {
        existingKit.products.push(newProduct);
        await existingKit.save();
        res.json({
          success: true,
          kit: existingKit,
          message: "product added successfully to the kit",
        });
      } else {
        const newKit = new Kit({
          user: userId,
        })
        newKit.products.push(newProduct);
        await newKit.save();
        res.json({
          success: true,
          kit: newKit,
          message: "product added successfully to the kit",
        });
      }
    } catch (error) {
      res
        .status(404)
        .json({
          success: false,
          message: "unable to add product to the kit",
        });
    }
  });

kitRouter.route("/updateKit").post(async (req, res) => {
  const { userId } = req.user;
  console.log(req.body._id);
  await Kit.findOneAndUpdate(
    { user: userId },
    {
      $set: {
        "products.$[el].Description": "Helllo",
        "products.$[el].Serial": req.body.Serial,
        "products.$[el].Description": req.body.Desc,
        "products.$[el].CPrice": req.body.CP,
        "products.$[el].SPrice": req.body.price,
        "products.$[el].Build": req.body.year,
        "products.$[el].Images": req.body.Images,
        "products.$[el].Daily": req.body.day,
        "products.$[el].Weekly": req.body.week,
        "products.$[el].Monthly": req.body.month,
        "products.$[el].Condition": req.body.condition,
        "products.$[el].Status": "Available",
        "products.$[el].SellStatus": "No"

      }
    },
    {
      arrayFilters: [{ "el._id": req.body._id }],
      new: true
    }
  )
}
)
kitRouter.route("/sellKit").post(async (req, res) => {
  const { userId } = req.user;
  console.log(req.body._id);
  await Kit.findOneAndUpdate(
    { user: userId },
    {
      $set: {

        "products.$[el].SellStatus": "Selling"
      }
    },
    {
      arrayFilters: [{ "el._id": req.body._id }],
      new: true
    }
  )
}
)

kitRouter.route("/:productId").delete(async (req, res) => {
  try {
    const { userId } = req.user;
    const { productId } = req.params;
    await Kit.updateOne(
      { user: userId },
      { $pull: { products: { _id: productId } } }
    )


    res.json({
      success: true,

      message: "product successfully removed from kit",
    });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
});

module.exports = kitRouter;