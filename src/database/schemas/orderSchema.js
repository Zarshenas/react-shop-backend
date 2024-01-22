const mongoose = require("mongoose");
const { Schema } = mongoose;

const orderSchema = new Schema({
  addedProducts: [
    {
      id: { type: Schema.Types.Number },
      price: { type: Schema.Types.Number },
      quantity: { type: Schema.Types.Number },
      title: { type: Schema.Types.String },
    },
  ],
  checkout: { type: Schema.Types.Boolean },
  ordersCount: { type: Schema.Types.Number },
  totalPrice: { type: Schema.Types.Number },
  userInfo: {
    firstName: { type: Schema.Types.String },
    lastName: { type: Schema.Types.String },
    email: { type: Schema.Types.String},
    userId: { type: Schema.Types.ObjectId},
  },
});

const Orders = mongoose.model("Orders", orderSchema);
module.exports = Orders;
