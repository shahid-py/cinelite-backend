const mongoose = require("mongoose");
const { Schema } = mongoose;
const CompareSchema = new Schema(
  {
    _id: Schema.Types.ObjectId,
    products: [
      {
        _id: {
          type: Schema.Types.ObjectId,
          ref: "Product",
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Compare = mongoose.model("Compare", CompareSchema);

module.exports = { Compare };