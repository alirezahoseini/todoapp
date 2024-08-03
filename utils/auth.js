import jwt from 'jsonwebtoken'
import { hash, compare } from 'bcryptjs';
import userModel from '@/models/user'
const { default: connectToDb } = require("@/configs/db");

const hashPassword = async (password) => {
    const hashedPassword = await hash(password, 12);
    return hashedPassword
}
const generateToken = (payload) => {
    try {
        const token = jwt.sign(payload, process.env.privateKey, {
            expiresIn: "7d"
        });
        return token
    } catch (error) {
        console.log('Cannot create token!!', error);
        return false
    }
}
const isExistUser = async (email) => {
    connectToDb();
    const result = await userModel.findOne({ email: email });
    if (result) {
        return true
    } else {
        return false
    }
}
const verifyPassword = ({password, hashedPassword}) => {
    const isValid = compare(password, hashedPassword);
    return isValid
}

export { generateToken, hashPassword, isExistUser, verifyPassword }