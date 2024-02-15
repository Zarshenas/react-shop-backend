const express = require("express");
const cors = require("cors");

const cartRouter = express.Router();

const Users = require("../../database/schemas/userSchema");
const Cart = require("../../database/schemas/cartSchema");

const jwt = require("jsonwebtoken");

cartRouter.get("/user/cart", async (req, res) => {
  const { token } = req.cookies;
  if (!token) return res.status(401).send("Not authorized");
  const userId = jwt.decode(token).id;
  const usercart = await Cart.findOne({ userId: userId });
  if (!usercart) return res.status(404).send("cart is empty");
  return res.status(200).send(usercart);
});

cartRouter.post("/user/updatecart", async (req, res) => {
  const { cartState } = req.body;
  const { token } = req.cookies;
  if (!token) return res.send("Not authorized");
  const userId = jwt.decode(token).id;
  const user = await Users.findById(userId).exec();
  if (!user) return res.status(401).send("User does not exist");
  const cart = await Cart.findOne({ userId: userId });
  if (!cart) {
    (
      await Cart.create({
        userId: userId,
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
      userId: userId,
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
