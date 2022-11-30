const mongoose = require("mongoose");
const { Schema } = mongoose;

const HistorySchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User"
    },
    products: [
      {
        Date: {
          type: String
        },
        Time: {
          type: String
        },
        Model: {
          type: String
        },

        Description: {
          type: String
        }
      },
    ],
  },
  {
    timestamps: true,
  }
);

const History = mongoose.model("History", HistorySchema);

module.exports = { History };