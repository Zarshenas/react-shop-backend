const express = require("express");
const userUpdateRouter = express.Router();
const Users = require("../../database/schemas/userSchema.js");
const { compareHashed , hashPassword } = require("../../utils/helper.js");
const jwt = require("jsonwebtoken")

userUpdateRouter.post("/user/update", async (req, res) => {
  const { firstName, lastName, email} = req.body;
  const {token } = req.cookies;
  const userId = jwt.decode(token).id;
  const oldUser = await Users.findById( userId );
  if(!oldUser) return res.sendStatus(404);
  if(oldUser.firstName ==firstName && oldUser.lastName ==lastName && oldUser.email ==email ) return res.sendStatus(400);
  oldUser.firstName = firstName;
  oldUser.lastName = lastName;
  oldUser.email = email;
  await oldUser.save().then(()=> res.status(204).send("User updated"));
});

userUpdateRouter.post("/user/update/password", async(req, res) => {
  const { currentPassword , newPassword } = req.body;
  const { token } = req.cookies;
  const userId = jwt.decode(token).id;
  const user = await Users.findById(userId);
  if(!user) return res.status(404).send("user not found please login again");
  if(!compareHashed(currentPassword, user.password)) return res.status(401).send("Current password is wrong");
  user.password = hashPassword(newPassword);
  await user.save().then(()=> res.status(204).send("Password updated"));
});

module.exports = { userUpdateRouter };
