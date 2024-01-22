const express = require("express");
const Orders = require("../../database/schemas/orderSchema.js");

const ordersRouter = express.Router();

ordersRouter.post("/user/myorders" , async (req, res) => {
    const {_id} = req.body;
    const userOrders = await Orders.find({"userInfo.userId":_id}).exec();
    if(!userOrders.length) return res.sendStatus(204);
    return res.status(200).send(userOrders);
})

ordersRouter.post("/order", async (req, res) => {
  const data = req.body;
  if (!data) return res.sendStatus(400);
  (
    await Orders.create({
      addedProducts: data.addedProducts,
      ordersCount: data.ordersCount,
      totalPrice: data.totalPrice,
      checkout: data.checkout,
      userInfo:{
        firstName:data.userInfo.firstName,
        lastName:data.userInfo.lastName,
        email:data.userInfo.email,
        userId:data.userInfo._id,
      }
    })
  )
    .save()
    .then(() => res.status(201).send("Order successfully submitted "))
    .catch((err) => res.status(409).send(err));
});

module.exports = ordersRouter;
