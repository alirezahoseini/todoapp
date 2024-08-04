import connectToDb from "@/configs/db";
import { serialize } from "cookie";
import todosModel from '@/models/todo'
import mongoose from "mongoose";


const handler = async (req, res) => {
    connectToDb();
    const todoId = req.query.id
    const { token } = req.cookies;
    if (!token) {
        return res.status(423).json({ message: 'Your not login !!' });
    }
    if (token === false) {
        return res.setHeader("Set-Cookie", serialize("token", "", {
            path: "/",
            maxAge: 0
        })).status(423).json({ message: 'Your not login !!' });
    }

    const isValidId = mongoose.isValidObjectId(todoId);
    if (!isValidId) {
        return res.status(404).json({ message: 'Todo notfound !!' });
    }

    switch (req.method) {
        case "PUT":
            const { isComplated } = JSON.parse(req.body);
            if (typeof isComplated !== "boolean") {
                return res.status(422).json({ message: 'isComplated only Boolean !!' });
            }
            if (isComplated === undefined) {
                return res.status(422).json({ message: "Plase send isComplated !! " })
            }
            try {
                const todo = await todosModel.findOneAndUpdate({ _id: todoId }, { isComplated });
                return res.status(200).json({ message: 'Todo updated :))' });
            } catch (error) {
                console.log('Cannot update todo => ', error);
                return res.status(500).json({ message: "Unknow server error" })
            }
        case "DELETE":
            try {
                const todo = await todosModel.findOneAndDelete({ _id: todoId });
                return res.status(200).json({ message: 'Todo removed :))' });
            } catch (error) {
                console.log('Cannot Remove todo => ', error);
                return res.status(500).json({ message: "Unknow server error" })
            }

        default:
            res.status(400).json('Not supported !!')
            break;
    }
}

export default handler