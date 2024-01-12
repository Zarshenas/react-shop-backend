const express = require( "express");
const Categories = require('../../database/schemas/categorySchema.js')
// import { Categories } from '../../database/schemas/categorySchema.js';
const categoriesRouter = express.Router();

categoriesRouter.get('/categories',async(req , res) => {
    const allCategories = await Categories.find();
    res.send(allCategories)
})

module.exports =  categoriesRouter;