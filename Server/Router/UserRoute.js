import express from "express";
import { 
    createUser, 
    deleteUser, 
    getUser, 
    getUsers, 
    loginUser, 
    logoutUser, 
    updateUser 
} from "../Controller/UserCtrl.js";
import { checkAdmin, protect } from "../Middleware/authMiddleware.js";

export const authRoute = express.Router();

// post requests
authRoute.post("/create", createUser);
authRoute.post("/login", loginUser);
authRoute.post("/logout",protect, logoutUser);

// get requests
authRoute.get("/:id", protect, getUser);
authRoute.get("/", protect, checkAdmin, getUsers);

// put requests
authRoute.put("/:id", protect, checkAdmin, updateUser);


// delete requests
authRoute.delete("/:id", protect, checkAdmin, deleteUser);