import express from 'express';
import { Product } from '../../database/schemas/productSchema.mjs';

const productRouter = express.Router();

productRouter.get('/products',async(req , res) => {
    const allProducts = await Product.find();
    res.send(allProducts)
})

export default productRouter;