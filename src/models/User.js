import mongo from 'mongoose';
import bcrypt from 'bcryptjs';
const { Schema, model } = mongo;

const userSchema = new Schema({
   name: {
      type: String,
      required: true
   },
   email: {
      type: String,
      required: true,
      uniquie: true
   },
   password: {
      type: String,
      required: true
   },
   online: {
      type: Boolean,
      default: false
   },
}, {
   versionKey: false
})

userSchema.statics.encryptPassword = (password) => {
   const salt = bcrypt.genSaltSync(10);
   return bcrypt.hashSync(password, salt);
}

userSchema.statics.comparePassword = (receivedPassword, password) => {
   return bcrypt.compareSync(receivedPassword, password);
}

userSchema.method('toJSON', function(){
   const { _id, password, ...object} = this.toObject();
   object.uid = _id;
   return object;
})

export const User = model('User', userSchema);