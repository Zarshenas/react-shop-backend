const express = require("express");

const cartRouter = express.Router();

const User = require("../../database/schemas/userSchema");
const Cart = require("../../database/schemas/cartSchema");

cartRouter.post("/user/cart", async (req, res) => {
  const { _id } = req.body;
  const usercart = await Cart.findOne({ userId: _id });
  if (!usercart) return res.status(404).send("cart is empty");
  return res.status(200).send(usercart);
});

cartRouter.post("/user/updatecart", async (req, res) => {
  const { cartState, _id } = req.body;
  const user = await User.findById(_id);
  if (!user) return res.status(401).send("User does not exist");
  const cart = await Cart.findOne({ userId: _id });
  if (!cart) {
    (
      await Cart.create({
        userId: _id,
        checkout: cartState.checkout,
        ordersCount: cartState.ordersCount,
        totalPrice: cartState.totalPrice,
        addedProducts: cartState.addedProducts,
      })
    )
      .save()
      .then(() => res.status(201).send("cart added"))
      .catch((error) => console.log(error));
  } else {
    Cart.findOneAndUpdate({
      userId: _id,
      checkout: cartState.checkout,
      ordersCount: cartState.ordersCount,
      totalPrice: cartState.totalPrice,
      addedProducts: [...cartState.addedProducts],
    })
      .then(() => res.status(202).send("cart updated"))
      .catch((error) => console.log(error));
  }
});

module.exports = { cartRouter };
