import jwt from "jsonwebtoken";
import asyncHandler from 'express-async-handler'
import User from "../Model/UserModel.js";

const protect = asyncHandler(async (req, res, next) => {
    let token 
    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
       
        try {
            token = req.headers.authorization.split(' ')[1]
           const decoded = jwt.verify(token, process.env.JWT_SECRET)
            req.user =await User.findById(decoded.id).select("-password")
            next()
       } catch (error) {
            res.status(400)
            throw new Error("unauthorised")
       }
    }
    if (!token) {
        res.status(401)
        throw new Error("unathorised")
    }
})
export { protect}