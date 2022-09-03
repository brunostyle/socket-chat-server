import { User, Message } from '../models/index.js'

export const userConnected = async ( uid ) => {
    const user = await User.findById(uid);
    user.online = true;
    await user.save();
    return user;
}

export const userDisconnected = async ( uid ) => {
    const user = await User.findById(uid);
    user.online = false;
    await user.save();
    return user;
}

export const getUsers = async () => {
    try {
        const users = await User
            .find()
            .sort('-online')
        return users;
    } catch (error) {
        console.log(error);
    }
}

export const saveMessage = async (payload) => {
    try {
        const message = new Message(payload)
        await message.save();
        return message;
    } catch (error) {
        console.log(error);
    }
}