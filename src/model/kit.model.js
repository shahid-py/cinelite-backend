const mongoose = require("mongoose");
const { Schema } = mongoose;

const KitSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User"
    },
    products: [
      {
        Imageexist: {
          type: String
        },
        Company: {
          type: String
        },
        Model: {
          type: String
        },
        Serial: {
          type: Number
        },
        Description: {
          type: String
        },
        CPrice: {
          type: String
        },
        SPrice: {
          type: String
        },
        Build: {
          type: Number
        },
        Images: [{
          type: String
        }],
        Daily: {
          type: String
        },
        Weekly: {
          type: String
        },
        Monthly: {
          type: String
        },
        Condition: {
          type: String
        },
        Status: {
          type: String,
          default: "Incomplete"
        },
        SellStatus: {
          type: String,
          default: "No"
        }
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Kit = mongoose.model("Kit", KitSchema);

module.exports = { Kit };