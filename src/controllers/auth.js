import { generateJWT } from '../helpers/index.js';
import { User } from '../models/index.js'

export const register = async (req, res) => {
   const { name, email, password } = req.body;
   try {
      const user = new User({ name, email, password: await User.encryptPassword(password) })
      const { _id } = await user.save();
      const token = await generateJWT(_id);
      res.json({ uid: _id, name, email, token})
   } catch (error) {
      console.log(error);
   }
}

export const login = async (req, res) => {
   const { email, password } = req.body;
   try {
      const userFound = await User.findOne({ email });
      if (!userFound) return res.status(400).json(['The email or password do not match']);

      const passwordMatch = await User.comparePassword(password, userFound.password);
      if (!passwordMatch) return res.status(400).json(['The email or password do not match']);

      const token = await generateJWT(userFound._id);
      res.json({ uid: userFound._id, name: userFound.name, email, token });
   } catch (error) {
      console.log(error);
   }
}

export const updateUser = async (req, res) => {
   const { uid } = req.params;
   const { _id, ...rest} = req.body;
   try {
       const userUpdate = await User.findByIdAndUpdate(uid, rest, { new: true });
       res.json(userUpdate);
   } catch (error) {
       console.log(error);
   }
}   

export const renewToken = async (req, res) => {
   const { _id, name, email } = req.userAuth;
   try {
      const token = await generateJWT(_id);
      res.json({ uid: _id, name, email, token })
   } catch (error) {
      console.log(error);
   }
}