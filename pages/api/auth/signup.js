import connectToDb from "@/configs/db"
import userValidator from "@/validators/user"
import userModel from '@/models/user'
import { generateToken, hashPassword, isExistUser } from "@/utils/auth"
import { serialize } from "cookie"


const handler = async (req, res) => {
    connectToDb();
    if (req.method !== 'POST') {
        res.status(422).json({ message: "UnHandled request !!" })
    }
    // Validate request body
    const isValidUser = userValidator(req.body);
    if (isValidUser !== true) {
        return res.status(422).json(isValidUser)
    }

    // Checking is exist user
    const { name, email, password } = req.body;
    const chackingIsExistUser = await isExistUser(email);
    if (chackingIsExistUser) {
        return res.status(429).json({ message: "This Email already exist !!!" });
    }

    // Create token
    const token = generateToken({ email: email });

    // Hash password
    const hashedPassword = await hashPassword(password);

    // Create user
    try {
        userModel.create({ name, email, password: hashedPassword });
        return res.status(201).setHeader('Set-Cookie', serialize('token', token, {
            path: "/",
            httpOnly: true,
            maxAge: 60 * 60 * 24 * 7 // 7day
        })).json({ message: "User created successfully!" })
    } catch (error) {
        console.log('Cannot create user => ', error);
        return res.status(500).res({ message: "Unknow server error" })
    }


}

export default handler