import mongoose, { Schema }  from "mongoose";

const transactionSchema = new Schema({
    amount: Number,
    discription: String,
    date: {type: Date, default: new Date()},
    createdAt: {type: Date, default: Date.now},
    catagory: {
        label: {type: String, required:true}, icon: String,
    },
    user_id: mongoose.Types.ObjectId
});

export default (new mongoose.model('Transaction',transactionSchema));