const express = require("express");
const logoutRouter = express.Router();

logoutRouter.get("/auth/logout", async (req, res) => {
  res.clearCookie("token");
  res.end();
});

module.exports = { logoutRouter };
