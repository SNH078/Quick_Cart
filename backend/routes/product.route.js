import express from "express";
import { getProduct,postProduct,deleteProduct,updateProduct } from "../controllers/product.controller.js";
const router = express.Router();


//---------------------------------------------------------
router.get('/',getProduct);
// -------------------------------------------------------
router.post('/',postProduct);
// -------------------------------------------------------
router.put('/:id',updateProduct);
// -------------------------------------------------------
router.delete("/:id",deleteProduct);


export default router;