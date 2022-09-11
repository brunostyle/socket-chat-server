import jwt from 'jsonwebtoken';

export const generateJWT = async (uid) => {
    try {
        const token = await jwt.sign({ uid }, process.env.SECRET_WORD)
        return token;
    } catch (error) {
        console.log(error);
        throw new Error('Failed to generate token'); 
    }
}
