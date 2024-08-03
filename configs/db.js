import mongoose from "mongoose";

const connectToDb = async () => {

    try {
        if(mongoose.connections[0].readyState){
            console.log('DB connection ==> OK');
        } else {
            mongoose.connect('mongodb://localhost:27017/todo-app');
            console.log('Create connection Successfully :)');
        }
    } catch (error) {
        console.log('Cannot create DB connection !!! with error => ', error );
    }
}

export default connectToDb