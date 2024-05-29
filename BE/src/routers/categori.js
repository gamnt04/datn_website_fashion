import { Router } from "express";
import { create, get, getById, remove, statistical, update } from "../controllers/catogory";

const router = Router()

router.get('/category', get)
router.get('/category/:id', getById)
router.post('/category', create)
router.delete('/category/:id', remove)
router.put('/category/:id', update)
router.get('/category/statistical', statistical)

export default router