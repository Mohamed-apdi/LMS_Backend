import jwt from "jsonwebtoken"
import { jwt_secret } from "./config.js";


export const generateToken = (id) => {
    return  jwt.sign({id}, jwt_secret, { expiresIn: '7d' });
}