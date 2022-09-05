import jwt from "jsonwebtoken";
import { User } from '../models/index.js'

export const validateJWT = async (req, res, next) => {
    const token = req.header('access-token');
    if (!token) return res.status(400).json(['You have not sent the access token']);
    try {
        const { uid } = jwt.verify(token, process.env.SECRET_WORD);
        const user = await User.findById(uid);
        if (!user) res.status(400).json(['The user does not exist in the database']);
        req.userAuth = user;
        next();
    } catch (error) {
        res.status(400).json(['Invalid token']);
    }
}

export const verifyJWT = ( token = '' ) => {
    try {
        const { uid } = jwt.verify(token, process.env.SECRET_WORD);
        return [ true, uid ];
    } catch (error) {
        return [ false, null ];
    }
}