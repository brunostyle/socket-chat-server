import jwt from 'jsonwebtoken';

const exp = { expiresIn: '6h' }

export const generateJWT = async (uid) => {
    try {
        const token = await jwt.sign({ uid }, process.env.SECRET_WORD, exp)
        return token;
    } catch (error) {
        console.log(error);
        throw new Error('No se pudo generar el token'); 
    }
}
