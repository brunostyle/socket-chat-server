import { Router } from 'express';
import { check } from 'express-validator';
import { emailUserExist, validateField, validateJWT } from '../middlewares/index.js';
import { register, login, renewToken} from '../controllers/auth.js';

export const routerAuth = Router();

routerAuth.post('/login', [
   check('email', 'El email es requerida').not().isEmpty(),
   check('email', 'El email no es valido').optional().trim().isEmail(),
   check('password', 'La contraseña es requerida').not().isEmpty(),
   validateField
], login)

routerAuth.post('/register', [
   check('name', 'El nombre es requerido').not().isEmpty(),
   check('name', 'El nombre debe ser un String').optional().trim().isString(),
   check('email', 'El email es requerida').not().isEmpty(),
   check('email', 'El email no es valido').optional().isEmail(),
   check('email').custom(emailUserExist),
   check('password', 'La contraseña es requerida').not().isEmpty(),
   check('password', 'La contraseña debe tener al menos 6 caracteres').optional().isLength({min: 6}),
   check('password', 'La contraseña no debe tener mas de 20 caracteres').optional().isLength({max: 20}),
   validateField
], register)

// import { User } from '../models/User.js';
// routerAuth.get('/getUsers/:uid', async (req, res) => {
//    const uid = req.params.uid;
//    try {
//       const users = await User
//           .find()
//           .where('_id').ne(uid)
//           .sort('-online')
//       res.json(users)
//   } catch (error) {
//       console.log(error);
//   }
// })

routerAuth.get('/renew', validateJWT, renewToken)
