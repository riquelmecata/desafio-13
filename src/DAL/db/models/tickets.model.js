import mongoose from "mongoose";
import { nanoid } from "nanoid";

const TicketSchema = new mongoose.Schema({
    code: {
        type: String,
        default: () => nanoid(),
        immutable: true,
        unique: true,
        required: true
    },
    purchase_datetime: {
        type: Date,
        default: Date.now,
        immutable: true,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    purchaser: {
        type: String,
        required: true
    }
});

export const TicketModel = mongoose.model("Ticket", TicketSchema)