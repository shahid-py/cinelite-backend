const mongoose = require("mongoose");
const { Schema } = mongoose;

const CertifiedSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User"
    },
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

const Certified = mongoose.model("Certified", CertifiedSchema);

module.exports = { Certified };