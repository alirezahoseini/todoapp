import { verifyToken } from "@/utils/auth";
import userModel from '@/models/user'

const handler = async (req, res) => {
    if (req.method !== 'GET') {
        return res.status(404).json({ message: "Unhandled request !!" })
    }

    const { token } = req.cookies

    if (!token) {
        return res.status(422).json({ message: 'You are not login!!' });
    }

    const payloadToken = verifyToken(token);

    if (payloadToken === false) {
        return res.status(423).json({ message: 'You token is not valid!!' });
    }

    try {
        const user = await userModel.findOne({ email: payloadToken.email }, '-password -__v')
        return res.json(user)
    } catch (error) {
        console.log('Cannot find user => ', error);
        return res.status(500).res({ message: "Unknow server error" })
    }
}


export default handler