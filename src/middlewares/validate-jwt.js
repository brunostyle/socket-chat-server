import jwt from "jsonwebtoken";
import { User } from '../models/index.js'

export const validateJWT = async (req, res, next) => {
    const token = req.header('access-token');
    if (!token) return res.status(400).json(['No has enviado el token de acceso']);
    try {
        const { uid } = jwt.verify(token, process.env.SECRET_WORD);
        const user = await User.findById(uid);
        if (!user) res.status(400).json(['El usuario no existe en la base de datos']);
        req.userAuth = user;
        next();
    } catch (error) {
        res.status(400).json(['Token no valido']);
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