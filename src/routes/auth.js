import { Router } from 'express';
import { check } from 'express-validator';
import { emailUserExist, existUserId, validateField, validateFile, validateJWT } from '../middlewares/index.js';
import { register, login, renewToken, updateUser, addImgUser } from '../controllers/auth.js';

export const routerAuth = Router();

routerAuth.post('/login', [
   check('email', 'The email is required').not().isEmpty(),
   check('email', 'The email is not valid').optional().trim().isEmail(),
   check('password', 'The password is required').not().isEmpty(),
   validateField
], login)

routerAuth.post('/register', [
   check('name', 'The name is required').not().isEmpty(),
   check('name', 'The name must be a String').optional().trim().isString(),
   check('name', 'The name must be at least 3 characters').optional().isLength({min: 3}),
   check('name', 'The Name must not have more than 20 characters').optional().isLength({max: 20}),
   check('email', 'The email is required').not().isEmpty(),
   check('email', 'The email is not valid').optional().trim().isEmail(),
   check('email').custom(emailUserExist),
   check('password', 'The password is required').not().isEmpty(),
   check('password', 'The password must be at least 6 characters').optional().isLength({min: 6}),
   check('password', 'The password must not have more than 20 characters').optional().isLength({max: 20}),
   validateField
], register)

routerAuth.put('/update/:uid', [
   validateJWT,
   check('uid', 'Not a valid mongo ID').isMongoId(),
   check('uid').custom(existUserId),
   check('name', 'The name is required').optional().not().isEmpty(),
   check('name', 'The name must be a String').optional().trim().isString(),
   check('name', 'The name must be at least 3 characters').optional().isLength({min: 3}),
   check('name', 'The Name must not have more than 20 characters').optional().isLength({max: 20}),
   check('email', 'The email is required').optional().not().isEmpty(),
   check('email', 'The email is not valid').optional().trim().isEmail(),
   check('email').optional().custom(emailUserExist),
   validateField
], updateUser)

routerAuth.post('/update/img/:uid', [
   validateJWT,
   validateFile,
   check('uid', 'Not a valid mongo ID').isMongoId(),
   check('uid').custom(existUserId),
   validateField
], addImgUser)

routerAuth.get('/renew', validateJWT, renewToken)
