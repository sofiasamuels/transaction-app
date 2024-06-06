import mongoose from 'mongoose';
import { Status, Transaction } from '../types/transaction';
import { TransactionModel } from '../types/schemas/transactionSchema';
import { PersonService } from './person.service';

export class TransactionService {
  
    static async  getTransactionsByDate(startDate: Date, endDate: Date) {
        console.log (new Date(startDate));
   return await TransactionModel.find({
    //date: { $gte: new Date(startDate) } 
   $and: [
      { date: { $gte: new Date(startDate) } },
      { date: { $lte: new Date(endDate) } },
      { status: { $ne: 'PENDING' } },
    ],
  }).select('id date comments').then(res => res).catch(err => {throw err});
  //.populate({path:'sender'}).populate({path: 'recipient'})
  }
  static async  updateTransaction(transaction: Transaction) {
    return TransactionModel.updateOne({id: transaction.id}, {comments: transaction.comments}).then(result => {
        return result;
    }).catch(err =>{ throw err});
  }
  static async  saveTransaction(transaction: Transaction) {
    let sender  = await PersonService.savePerson(transaction.sender);
    let recipient = await PersonService.savePerson(transaction.recipient);
    let transToSave: any = {

    }
    Object.keys(transaction).forEach(element => {
        transToSave[element] = (transaction as any)[element];
        if(element === 'date'){
            transToSave[element] = new Date(transaction[element]);
        }
        if(element === 'sender'){
            transToSave[element] = sender._id
        }
        if(element === 'recipient'){
            transToSave[element] = recipient._id;
        }
    });
    return await TransactionModel.create(transToSave).then(result => {
        return result;
    }).catch(err =>{ throw err});
  }
}
