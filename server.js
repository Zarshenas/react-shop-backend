const express = require( "express");
const cors = require( "cors");
const productRouter = require( "./src/routes/products/products.js");
const categoriesRouter = require( "./src/routes/categories/categories.js");
const mongoose = require( "mongoose");
require("dotenv/config");

const app = express();

app.use(cors());
app.use(express.json());

app.use(productRouter);
app.use(categoriesRouter);

mongoose
  .connect(process.env.DB_URI)
  .then(() => console.log(`Connected to DB`))
  .catch((err) => console.log(err));

app.get('/' , (req , res) => {
  res.send("Hi");
})
app.listen(process.env.PORT, () =>
  console.log(`listening on port : ${process.env.PORT}!`)
);
