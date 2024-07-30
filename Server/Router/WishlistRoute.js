import express from "express";
import { protect } from "../Middleware/authMiddleware.js";
import { 
    addToWishlist,
    getWishlist,
    removeWishlist,
} from "../Controller/wishlistCtrl.js";

export const wishlistRouet = express.Router();


// post requests
wishlistRouet.post("/", protect, addToWishlist);

// get requests
wishlistRouet.get("/:id", protect, getWishlist);

// delete requests
wishlistRouet.delete('/remove', protect, removeWishlist);