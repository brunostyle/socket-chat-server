import { Router } from 'express';
import { check } from 'express-validator';
import { validateField, validateJWT } from '../middlewares/index.js';
import { getMessages } from '../controllers/messages.js';

export const routerMessages = Router();

routerMessages.get('/:from', [
   validateJWT,
   check('from', 'El ID no es valido').isMongoId(),
   validateField
], getMessages)