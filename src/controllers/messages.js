import { Message } from '../models/index.js'

export const getMessages = async (req, res) => {
   const myID = req.userAuth._id;
   const from = req.params.from;
   try {
      const last30 = await Message.find({
         $or: [
            { from: from, to: myID },
            { from: myID, to: from }
         ]
      }).sort({ createdAt: 'asc' })
      res.json({myID, from, messages: last30});
   } catch (error) {
      console.log(error);
   }
}
