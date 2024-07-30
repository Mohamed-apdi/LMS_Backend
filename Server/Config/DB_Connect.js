import mongoose from "mongoose";
import { db_url } from "./config.js";

export const DB_Connect = async () => {
    
    try {
        await mongoose.connect(db_url,{writeConcern: {w: "majority"}});

        console.log("connected database success...");
    } catch (error) {
        console.log(error)
        process.exit(1);
    }
}