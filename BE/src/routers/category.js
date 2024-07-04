import { Router } from "express";
import { create_category, get_category, getById_category, remove_category, statistical_category } from "../controllers/Categories/category";

const Routes_categories = Router()

Routes_categories.get('/category', get_category)
Routes_categories.get('/category/:id', getById_category)
Routes_categories.post('/category', create_category)
Routes_categories.delete('/category/:id', remove_category)
// router.put('/category/:id', update)
Routes_categories.get('/category/statistical', statistical_category)

export default Routes_categories