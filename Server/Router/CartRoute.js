import express from 'express';
import { addToCart, getCarts } from '../Controller/cartCtrl.js';
import { protect} from "../Middleware/authMiddleware.js"
export const cartRouter = express.Router();

// post requests
cartRouter.post("/", protect, addToCart);

// get routes
cartRouter.get("/:userId", protect, getCarts);
