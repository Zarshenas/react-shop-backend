const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const productRouter = require("./src/routes/products/products.js");
const categoriesRouter = require("./src/routes/categories/categories.js");
const { signupRouter } = require("./src/routes/signup/signin.js");
const { loginRouter } = require("./src/routes/login/login.js");
const mongoose = require("mongoose");
require("dotenv/config");
const Users = require("./src/database/schemas/userSchema.js");
const jwt = require("jsonwebtoken");

const app = express();

app.use(
  cors({
    origin: true,
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());

app.use(productRouter);
app.use(categoriesRouter);
app.use(signupRouter);
app.use(loginRouter);

mongoose
  .connect(process.env.DB_URI)
  .then(() => console.log(`Connected to DB`))
  .catch((err) => console.log(err));

app.post("/", (req, res) => {
  const token = req.cookies.token;
  if (!token) {
    return res.json({ status: false });
  }
  jwt.verify(token, process.env.TOKEN_KEY, async (err, data) => {
    if (err) {
      return res.json({ status: false });
    } else {
      const user = await Users.findById(data.id);
      if (user) return res.json({ status: true, firstName: user.firstName });
      else return res.json({ status: false });
    }
  });
});

app.listen(process.env.PORT, () =>
  console.log(`listening on port : ${process.env.PORT}!`)
);
