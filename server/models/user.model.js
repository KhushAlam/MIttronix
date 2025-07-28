import mongoose from "mongoose";

const userShcema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    contactNumber: {
        type: Number,
        required: true,
        maxLength: 10,
        unique: true,
    },
    password: {
        type: String,
    }
});

export default mongoose.model('User', userShcema);