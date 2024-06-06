import { Transaction } from '../transaction';
import mongoose, { Schema } from 'mongoose';

const TransactionSchema = new mongoose.Schema<Transaction>({
    id: {type: Number, required: true},
    date:  {type: Date, required: true},
    comments:  {type: String, required: false},
    sender: { type: Schema.Types.ObjectId, ref: 'Person'},
    recipient:{ type: Schema.Types.ObjectId, ref: 'Person'},
    // senderId:  {type: Number, required: true},
    // recipientId:  {type: Number, required: true},
    amount:  {type: Number, get: (v: number) =>Number((v/100).toFixed(2)), set: (v:number) => v*100, required: true},
    currencyCd: {type: String, required: true},
    status:  {type: String, enum: ['COMPLETED', 'INPROGRESS', 'PENDING', 'REJECTED'], default: 'PENDING', required: false}
});

export const TransactionModel = mongoose.model<Transaction>('Transaction', TransactionSchema);

