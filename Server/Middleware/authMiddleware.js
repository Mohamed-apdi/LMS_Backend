import jwt from "jsonwebtoken"
import User from "../Model/UserModel.js"
import { jwt_secret } from "../Config/config.js"
import asyncHandler from "express-async-handler"


// Middleware to verify JWT

export const protect = asyncHandler(async (req,res,next) => {
    let token;

    // Check if the authorization header starts with 'Bearer'
    if(req?.headers?.authorization?.startsWith("Bearer")){
        token = req.headers.authorization.split(" ")[1];

        try {
            if(token){
                // Verify the JWT token
                const decoded = jwt.verify(token, jwt_secret);
                 // Find the user by ID
                const user = await User.findById(decoded?.id);
                // Attach the user to the request object
                req.user = user;
                next();
            }
        } catch (error) {
            // Handle expired token
            throw new Error("Not authorized token expired. please login again");
        }
    }else{
        // Handle missing token
        throw new Error("there is no token attached to the header.")
    }
})

// Middleware to check for admin 
export const checkAdmin = asyncHandler(async (req, res, next) => {
        const { email } = req.user;

        // Find the user by email
        const user = await User.findOne({ email });
        if(user.role !== 'admin') {
            // Handle non-admin user
            throw new Error("Not authorized as an admin.")
        }else{
            next();
        }

})