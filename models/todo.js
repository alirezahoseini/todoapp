import mongoose from "mongoose";

const schema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    isComplated: {
        type: Boolean,
        required: true
    },
    user:{
        type: mongoose.Types.ObjectId,
        ref: "User",
        required: true
    }
});

const model = mongoose.models.Todo || mongoose.model('Todo', schema);

export default model