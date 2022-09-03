import { validationResult } from 'express-validator';

export const validateField = (req, res, next) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        const err = errors.errors.map(err => err.msg)
        return res.status(400).json(err);
    }
    next();
}
