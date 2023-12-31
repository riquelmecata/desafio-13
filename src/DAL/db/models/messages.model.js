import mongoose from "mongoose";

const MessagesSchema = new mongoose.Schema({
    user: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true
    },
})

export const MessagesModel = mongoose.model("Message", MessagesSchema)