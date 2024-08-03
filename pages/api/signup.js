import connectToDb from "@/configs/db"


const handler = (req, res) => {
    connectToDb();
    
    res.json('ok')
}

export default handler