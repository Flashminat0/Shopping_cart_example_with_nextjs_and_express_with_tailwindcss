import express from "express";

const router = express.Router();

import {CreateProduct} from "../controllers/ShoppingCart";
import {loadAllProducts , getProductFromId} from "../controllers/products";

router.post("/create-product", CreateProduct);
router.get("/load-product", loadAllProducts);
router.get("/load-product-from-id", getProductFromId);


module.exports = router;
