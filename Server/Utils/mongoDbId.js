import mongoose from "mongoose";

export const validateMongoDbId = (id) => {
    return mongoose.Types.ObjectId.isValid(id);
}