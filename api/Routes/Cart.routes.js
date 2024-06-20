import express from "express"
import { addToCart, clearCart, decreaseProductQty, removeProductFromCart, userCart } from "../Controllers/Cart.controllers.js";
import { Authenticated } from "../Middlewares/Auth.middlewares.js";

const router = express.Router();

// add to cart
router.post('/add',Authenticated,addToCart);

// get user cart
router.get('/user',Authenticated,userCart);

// remove item from cart
router.delete('/remove/:productId',Authenticated,removeProductFromCart)

// clear cart
router.delete('/clear',Authenticated,clearCart);

// decrease items qty
router.post("/--qty",Authenticated,decreaseProductQty);

export default router;