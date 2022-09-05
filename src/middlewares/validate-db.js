import { User } from '../models/index.js'

export const emailUserExist = async (email) => {
   const exist = await User.findOne({email});
   if(exist) throw new Error('The email already exists');
}

export const existUserId = async (id) => {
   const exist = await User.findById(id);
   if(!exist) throw new Error('User does not exist');
}
