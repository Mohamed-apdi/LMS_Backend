import express from "express"
import { protect } from "../Middleware/authMiddleware.js"
import { createReview } from "../Controller/reviewController.js"

const router = express.Router()

router.post("/create",protect,createReview)

export default router