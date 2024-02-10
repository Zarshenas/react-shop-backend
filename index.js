const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const productRouter = require("./src/routes/products/products.js");
const categoriesRouter = require("./src/routes/categories/categories.js");
const { signupRouter } = require("./src/routes/user/signin.js");
const { loginRouter } = require("./src/routes/user/login.js");
const ordersRouter = require("./src/routes/orders/orders.js");
const { userUpdateRouter } = require("./src/routes/user/updateUser.js");
const mongoose = require("mongoose");
require("dotenv/config");
const Users = require("./src/database/schemas/userSchema.js");
const jwt = require("jsonwebtoken");
const { cartRouter } = require("./src/routes/cart/cart.js");

const app = express();

app.use(
  cors({
    origin:"https://react-shop-front-siza.liara.run",
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());

app.use(productRouter);
app.use(categoriesRouter);
app.use(signupRouter);
app.use(loginRouter);
app.use(userUpdateRouter);
app.use(cartRouter);
app.use(ordersRouter);

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
      if (user)
        return res.json({
          status: true,
          userInfo: {
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            _id: user._id,
          },
        });
      else return res.json({ status: false });
    }
  });
});

app.listen(process.env.PORT, () =>
  console.log(`listening on port : ${process.env.PORT}!`)
);
