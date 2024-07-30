import Cart from "../Model/CartModel.js";
import asyncHandler from "express-async-handler";



// create cart object
export const addToCart = asyncHandler(async (req, res) => {
    const { userId, courseId, price } = req.body;

    try {
        const cart = await Cart.findOne({user: userId});

        if(cart){
            cart.courses.push(courseId);
            cart.totalPrice += price;
            await cart.save();
            res.status(200).json(cart);
        }else{
            const newCart = new Cart({
                user: userId,
                courses: [courseId],
                totalPrice: price
            });
            const createdCart = await newCart.save();
            res.status(201).json(createdCart);
        }
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