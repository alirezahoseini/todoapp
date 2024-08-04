import { verifyToken } from "@/utils/auth";
import userModel from '@/models/user'
import connectToDb from "@/configs/db";

const handler = async (req, res) => {
    connectToDb()
    if (req.method !== 'GET') {
        return res.status(404).json({ message: "Unhandled request !!" })
    }

    const { token } = req.cookies

    if (!token) {
        return res.status(422).json({ message: 'You are not login!!' });
    }

    const payloadToken = verifyToken(token);

    if (payloadToken === false) {
        return res.setHeader("Set-Cookie", serialize("token", "", {
            path: "/",
            maxAge: 0
        })).status(423).json({ message: 'You token is not valid!!' });
    }

    try {
        const user = await userModel.findOne({ email: payloadToken.email }, '-password -__v')
        return res.json(user)
    } catch (error) {
        console.log('Cannot find user => ', error);
        return res.status(500).json({ message: "Unknow server error" })
    }
}


export default handler