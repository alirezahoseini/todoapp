

const isExistEmail = async (email) => {
    connectToDb();
    const result = await userModel.findOne({email: email});
    if(result){
        return true
    }else {
        return false
    }
    
}
export default isExistEmail