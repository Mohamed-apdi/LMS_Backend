import Cart from "../Model/CartModel.js";
import asyncHandler from "express-async-handler";
import Course from "../Model/CourseModel.js"
import { validateMongoDbId } from "../Utils/mongoDbId.js";

// create cart object
export const addToCart = asyncHandler(async (req, res) => {

    const { userId, courseId } = req.body;
    
    try {
        validateMongoDbId(courseId);
        const course = await Course.findById(courseId);
        if (!course) {
        res.status(404).json({ message: 'Course not found' });
        return;
        }

        let cart = await Cart.findOne({ user: userId });

    if (cart) {
      const existingCourse = cart.courses.find(item => item.course.toString() === courseId);

      if (existingCourse) {
        res.status(400).json({ message: 'Course already in cart' });
        return;
      }

      cart.courses.push({ course: courseId, price: course.price });
      cart.totalPrice += course.price;
      await cart.save();
    } else {
      cart = new Cart({
        user: userId,
        courses: [{ course: courseId, price: course.price }],
        totalPrice: course.price
      });

      await cart.save();
    }
    res.status(200).json(cart);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// get cart items
export const getCarts = asyncHandler( async (req,res) => {
    const { userId } = req.params;

    try {
        const cart = await Cart.findOne({ user: userId }).populate('courses');;

        if(cart){
            res.status(200).json(cart);
        }else{
            res.status(404).json({ message: "Cart not found" });
        }
    } catch (error) {
        res.status(500).json({error: error.message});
    }
})