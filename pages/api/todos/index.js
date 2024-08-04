import { verifyToken } from "@/utils/auth";
import todoValidator from '@/validators/todo'
import todosModel from '@/models/todo'
import userModel from '@/models/user'
const { default: connectToDb } = require("@/configs/db")


const handler = async (req, res) => {
    if(req.method !== 'POST' && req.method !== "GET"){
        res.status(404).json('Unhandled request !!')
    }
    connectToDb();
    const { title, user, isComplated } = req.body;
    const { token } = req.cookies;
    if (!token) {
        return res.status(423).json({ message: 'Your not login !!' });
    }
    const checkingToken = await verifyToken(token);
    if (token === false) {
        return res.status(423).json({ message: 'Your not login !!' });
    }

    if (req.method === 'POST') {
        const checkingValues = todoValidator({ title, user, isComplated })
        if (checkingValues !== true) {
            return res.status(422).json(checkingValues)
        }

        try {
            const tokenPayload = await verifyToken(token);
            const user = await userModel.findOne({ email: tokenPayload.email })
            const todo = await todosModel.create({ title, user: user.id, isComplated: false });
            res.status(201).json({message: 'Create new todo successfully :)'});


        } catch (error) {
            console.log('Cannot create new todo => ', error);
            return res.status(500).json({ message: "Unknow server error" })
        }

    }
    if (req.method === 'GET') {
        try {
            const tokenPayload = await verifyToken(token);
            const user = await userModel.findOne({ email: tokenPayload.email })
            const todos = await todosModel.find({user: user._id}, '-__v -user');
            res.status(200).json(todos);


        } catch (error) {
            console.log('Cannot create new todo => ', error);
            return res.status(500).json({ message: "Unknow server error" })
        }
    }
}

export default handler