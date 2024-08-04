import { serialize } from "cookie";

const handler = async (req, res) => {
    if (req.method !== 'GET') {
        return res.status(404).json({ message: "Unhandled request !!" })
    }

    try {
        return res.setHeader("Set-Cookie", serialize("token", "", {
            path: "/",
            maxAge: 0
        })).json({ message: "Logout successfull :))" })
    } catch (error) {
        console.log('Cannot Run logout => ', error);
        return res.status(500).json({ message: "Unknow server error" })
    }
}


export default handler