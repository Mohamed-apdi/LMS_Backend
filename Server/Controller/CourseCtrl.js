
import Course from "../Model/CourseModel.js";
import User from "../Model/UserModel.js";
import asyncHandler from "express-async-handler";


// create a new Course
export const createCourse = asyncHandler(async (req,res) => {

    const { title, description, instructor, content, price, categories, videoUrl, thumbnail, tags } = req.body;

    try {
      const course = new Course({
        title,
        description,
        instructor,
        content,
        price,
        categories,
        videoUrl,
        thumbnail,
        tags
      });
  
      const createdCourse = await course.save();
      res.status(201).json(createdCourse);

    } catch (error) {
      res.status(500).json({ message: error.message });
    }
})

// get all courses
export const getAllCourse = asyncHandler(async (req, res) => {
    try {
        const courses = await Course.find({});
        res.status(200).json(courses);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
});


// get a course by id
export const getCourse = asyncHandler(async (req, res) => {
    const {id} = req.params;

    try {
        const course = await Course.findById(id);

        if(!course){
            res.status(404).json({message: 'Course not found'});
        }else{
            res.status(200).json({course});
        }
    } catch (error) {
        res.status(500).json({message: error});
    }
});


// update course
export const updateCourse = asyncHandler(async (req,res) => {
    const {id} = req.params;

    try {
        const course = await Course.findByIdAndUpdate(id,req.body);

        if(!course){
            res.status(404).json({message: 'Course not found'});
        }else{
            res.status(200).json({course});
        }
    } catch (error) {
        res.status(500).json({message:error.message});
    }
});

// delete course by id
export const deleteCourse = asyncHandler(async (req,res) => {
    const {id} = req.params;

    try {
        const course = await Course.findByIdAndDelete(id);

        if(!course){
            res.status(404).json({message: 'Course not found'});
        }else{
            res.status(200).json({message: 'Course deleted successfully'});
        }
    } catch (error) {
        res.status(500).json({message: error.message});
    }
})