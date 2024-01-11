import express from 'express';
import { Categories } from '../../database/schemas/categorySchema.mjs';
const categoriesRouter = express.Router();

categoriesRouter.get('/categories',async(req , res) => {
    const allCategories = await Categories.find();
    res.send(allCategories)
})

export default categoriesRouter;