import express from "express";
import cors from "cors";
import productRouter from "./src/routes/products/products.mjs";
import categoriesRouter from "./src/routes/categories/categories.mjs";
import mongoose from "mongoose";
import "dotenv/config";

const app = express();

app.use(cors());
app.use(express.json());

app.use(productRouter);
app.use(categoriesRouter);

mongoose
  .connect(process.env.DB_URI)
  .then(() => console.log(`Connected to DB`))
  .catch((err) => console.log(err));

app.listen(process.env.PORT, () =>
  console.log(`listening on port : ${process.env.PORT}!`)
);
