import express from 'express'
import {
  checkout,
  verify,
  userOrder,
  allOrders,
} from "../Controllers/Payment.controllers.js";
import {Authenticated} from "../Middlewares/Auth.middlewares.js"

const router = express.Router();

// checkout
router.post('/checkout',checkout);

// verify-payment & save to db
router.post('/verify-payment',verify)

// user order
router.get("/userorder",Authenticated, userOrder);

// All order's
router.get("/orders", allOrders);




export default router