import Enrollment from "../Model/EnrollmentModel.js";
import asyncHandler from "express-async-handler";


// Enroll a user in a course

export const enrollInCourse = asyncHandler(async (req, res) => {
    const { userId, courseId } = req.body;

    try {
        const existingEnrollment = await Enrollment.findOne({user: userId, course: courseId});

        if(existingEnrollment){
            res.status(400).json({message: "User is already enrolled this course"})
        }

        const enrollment = new Enrollment({user: userId, course: courseId});

        await enrollment.save();

        res.status(201).json(enrollment);

    } catch (error) {
        res.status(500).json({message: error.message});
    }
});

// get all enrollments courses
export const getAllEnrollmentCourses = asyncHandler(async (req,res) => {
    try {
        const enrollments = await Enrollment.find({});
        res.status(200).json(enrollments);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
});

// get a enrollments course
export const getEnrollmentCourse = asyncHandler(async (req,res) => {
    const {id} = req.params;

    try {
        const enrollments = await Enrollment.findById(id);

        if(enrollments){
            res.status(200).json(enrollments);
        }else{
            res.status(404).json({message: 'Enrollment not found'});
        }
    } catch (error) {
        res.status(500).json({message: error.message});
    }
});

// update a enrollments course
export const updateEnrollmentCourse = asyncHandler( async (req,res) => {
    const {id} = req.params;

    try {
        const enrollmentsCourse = await Enrollment.findByIdAndUpdate(id, req.body);

        if(enrollmentsCourse){
            res.status(200).json(enrollmentsCourse);
        }else{
            res.status(404).json({message: 'Enrollment not found'});
        }

    } catch (error) {
        res.status(500).json({message: error.message});
    }
});

// delete enrollment course by id
export const deleteEnrollmentCourse = asyncHandler(async (req,res) => {
    const {id} = req.params;

    try {
        const enrollmentCourse = await Enrollment.findByIdAndDelete(id);

        if(enrollmentCourse){
            res.status(200).json({message: 'Enrollment deleted successfully'});
        }else{
            res.status(404).json({message: 'Enrollment not found'});
        }
    } catch (error) {
        res.status(500).json({message: error.message});
    }
});