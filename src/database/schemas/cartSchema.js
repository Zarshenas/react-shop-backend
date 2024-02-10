const mongoose = require("mongoose");
const { Schema } = mongoose;

const cartSchema = new Schema({
  addedProducts: [
    {
      id: { type:Schema.Types.Number},
      price: { type:Schema.Types.Number},
      quantity: { type:Schema.Types.Number},
      title: { type:Schema.Types.String},
    },
  ],
  checkout: { type: Schema.Types.Boolean },
  ordersCount: { type: Schema.Types.Number },
  totalPrice: { type: Schema.Types.Number },
  userId : {type:Schema.Types.ObjectId}
});

const Cart = mongoose.model("Cart", cartSchema);
module.exports = Cart;
