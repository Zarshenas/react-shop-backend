const express = require("express");
const signupRouter = express.Router();
const Users = require("../../database/schemas/userSchema.js");
const { hashPassword } = require("../../utils/helper.js");
const createSecretToken = require("../../utils/secretToken.js");

signupRouter.post("/auth/signup", async (req, res) => {
  let { firstName, lastName, email, password } = req.body;
  if (!firstName || !lastName || !email || !password) {
    res.sendStatus(400);
    return;
  }
  const existUser = await Users.findOne({
    email,
  });
  if (existUser) {
    res.sendStatus(409);
    return;
  } else {
    password = hashPassword(password);
    const user = await Users.create({ firstName, lastName, email, password });

    const token = createSecretToken(user._id);
    res.cookie("token", token, {
      withCredentials: true,
      httpOnly: false,
    });

    res.sendStatus(201);
  }
});

module.exports = { signupRouter };
