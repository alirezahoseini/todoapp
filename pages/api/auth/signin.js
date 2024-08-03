import connectToDb from "@/configs/db"
import {signinValidator} from "@/validators/user"
import userModel from '@/models/user'
import { generateToken, hashPassword, isExistUser, verifyPassword } from "@/utils/auth"
import { serialize } from "cookie"


const handler = async (req, res) => {
    connectToDb();
    if (req.method !== 'POST') {
        res.status(422).json({ message: "UnHandled request !!" })
    }
    // Validate request body
    const isValidUser = signinValidator(req.body);
    if (isValidUser !== true) {
        return res.status(422).json(isValidUser)
    }

    const { email, password } = req.body;
    // Find user 
    const user = await userModel.findOne({email: email})
    if(user == null){
        return res.status(404).json({message: "User not found!!"})
    }
    


    // Verify password
    const isValidPassword = await verifyPassword({password , hashedPassword: user.password});
    if(isValidPassword !== true){
        return res.status(429).json({message: "Email or password is wrong !!"})
    }

    // Create token
    const token = generateToken({ email: email });
    
    try {
        return res.status(200).setHeader('Set-Cookie', serialize('token', token, {
            path: "/",
            httpOnly: true,
            maxAge: 60 * 60 * 24 * 7 // 7day
        })).json({ message: "User Login successfully!" })
    } catch (error) {
        console.log('Cannot login user => ', error);
        return res.status(500).res({ message: "Unknow server error" })
    }


}

export default handler