import jwt from "jsonwebtoken";
import { User } from "../Models/User.models.js";

export const Authenticated = async (req, res, next) => {
    const token = req.header("Auth");

    if (!token) return res.json({ message: "Login first" });

    try {
        const decoded = jwt.verify(token, "!@#$%^&*()");// iske andr user m jake depend krta h kesa url generate krre h hm user wala ya user id wala uss hisaab s info deta h ye 
        const id = decoded.userId;
        let user = await User.findById(id);
        
        if (!user) return res.json({ message: "User does not exist" });

        req.user = user;
        next();
    } catch (error) {
        res.json({ message: error.message });
    }
};
