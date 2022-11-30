const mongoose = require("mongoose");
const { Schema } = mongoose;

const WatchlistSchema = new Schema(
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

const Watchlist = mongoose.model("Watchlist", WatchlistSchema);

module.exports = { Watchlist };