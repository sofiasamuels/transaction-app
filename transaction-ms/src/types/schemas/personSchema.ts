import { Person } from '../person';
import mongoose from 'mongoose';



const personSchema = new mongoose.Schema<Person>({
    firstName: { type: String, required: true},
    lastName: { type: String, required: true},
    dateOfBirth: { type: Date, required: false},
    email: { type: String, required: false},
    accountNumber: { type: Number, required: false},
    bank: { type: String, required: false},
    IDNumber: {type: Number, required:false}
});
export const PersonModel = mongoose.model<Person>('Person', personSchema);
