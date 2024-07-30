import express from "express";
import { checkAdmin, protect } from "../Middleware/authMiddleware.js";
import { 
    createCourse, 
    deleteCourse, 
    getAllCourse, 
    getCourse,
    updateCourse
} from "../Controller/CourseCtrl.js";

export const courseRouter = express.Router();

courseRouter.post("/", protect, checkAdmin, createCourse);

// get requests
courseRouter.get("/", protect, getAllCourse);
courseRouter.get("/:id", protect, getCourse);

// put requests
courseRouter.put("/:id", protect,checkAdmin, updateCourse);

// delete requests
courseRouter.delete("/:id", protect, checkAdmin, deleteCourse);