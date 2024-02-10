const express = require("express");
const loginRouter = express.Router();
const Users = require("../../database/schemas/userSchema");
const { compareHashed } = require("../../utils/helper");
const createSecretToken = require("../../utils/secretToken");

loginRouter.post("/auth/login", async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) return res.sendStatus(404);
  const user = await Users.findOne({ email });
  if (!user) return res.status(404).send("User not found");
  if (!compareHashed(password, user.password))
    return res.status(401).send("Wrong password");
  const token = createSecretToken(user._id);
  res.cookie("token", token, {
    withCredentials: true,
    httpOnly: false,
  });
  res.sendStatus(200);
});

module.exports = { loginRouter };
