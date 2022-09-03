import { User } from '../models/index.js'

export const emailUserExist = async (email) => {
   const exist = await User.findOne({email});
   if(exist) throw new Error('El email ya existe');
}
