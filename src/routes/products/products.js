const express = require( "express");
const Product = require('../../database/schemas/productSchema.js')

const productRouter = express.Router();

productRouter.get('/products',async(req , res) => {
    const allProducts = await Product.find();
    res.send(allProducts)
})

module.exports = productRouter;