import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        minlength: 5
    },
    description: {
        type: String,
        required: true,
        minlength: 3
    },
    status: {
        type: String,
        required: true,
    },
    useriD: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    fecha:{
        type: Date,
        default: Date.now
    },
    isDelete:{
        type: Boolean,
        default: false
    }
})

const Task = mongoose.model("Task", taskSchema);
export default Task;