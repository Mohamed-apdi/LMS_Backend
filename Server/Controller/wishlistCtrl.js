import asyncHandler from "express-async-handler";
import Wishlist from "../Model/WishlistModel.js";


// create a new Wishlist
export const addToWishlist  = asyncHandler(async (req, res) => {
    const { userId, courseId } = req.body;

  try {
    const wishlist = await Wishlist.findOne({ user: userId });

    if (wishlist) {
        if (wishlist.courses.includes(courseId)) {
          return res.status(400).json({ message: "Course already in wishlist" });
        }
      wishlist.courses.push(courseId);
      await wishlist.save();
      res.status(200).json(wishlist);
    } else {
      const newWishlist = new Wishlist({
        user: userId,
        courses: [courseId]
      });

      const createdWishlist = await newWishlist.save();
      res.status(201).json(createdWishlist);
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


// Get wishlist for a user
export const getWishlist = asyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    const wishlists = await Wishlist.findOne({user: id}).populate('courses');
    if (!wishlists) {
      res.status(404).json({ message: 'Wishlist not found' });
    } else {
      res.status(200).json(wishlists);
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
  });

  // remove wishlist
  export const removeWishlist = asyncHandler(async (req, res) => {
    const { userId, courseId } = req.body;

    try {
      const wishlist = await Wishlist.findOne({user: userId});

      if(wishlist){
        wishlist.courses = wishlist.courses.filter(id => id.toString() !== courseId);
        await wishlist.save();
        res.status(200).json(wishlist);
      }else{
        res.status(404).json({ message: 'Wishlist not found' });
      }

    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  })