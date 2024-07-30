import express from "express";
import { protect } from "../Middleware/authMiddleware.js";
import { 
    deleteEnrollmentCourse,
    enrollInCourse, 
    getAllEnrollmentCourses, 
    getEnrollmentCourse, 
    updateEnrollmentCourse
} from "../Controller/enrollmentCtrl.js";

export const enrollRoute =  express.Router();

// post requests
enrollRoute.post("/create", protect, enrollInCourse);


// get requests
enrollRoute.get("/", protect, getAllEnrollmentCourses);
enrollRoute.get("/:id", protect, getEnrollmentCourse);

// put requests
enrollRoute.put("/:id", protect, updateEnrollmentCourse);


// delete requests
enrollRoute.delete("/:id", protect, deleteEnrollmentCourse);