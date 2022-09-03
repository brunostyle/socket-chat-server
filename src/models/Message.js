import mongo from 'mongoose';
const { Schema, model } = mongo;

const messageSchema = new Schema({
   from: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true
   },
   to: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true
   },
   message: {
      type: String,
      required: true,
   },
}, {
   versionKey: false,
   timestamps: true
})

export const Message = model('Message', messageSchema);