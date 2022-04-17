import express from "express";

const router = express.Router();

import {addToCart, createUser, getUserShoppingCart} from "../controllers/user";

router.post("/create-user", createUser);
router.post("/add-product-shopping-cart-user", addToCart);
router.get("/get-user-shopping-cart", getUserShoppingCart);

module.exports = router;
