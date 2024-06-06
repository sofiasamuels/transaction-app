import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TransactionService {
 
  constructor(private http: HttpClient) {}
  public transactionsSubject = new Subject<string>();
  formatDate(date: Date){
    return ((date.getMonth() > 8) ? (date.getMonth() + 1) : ('0' + (date.getMonth() + 1))) + '/' + ((date.getDate() > 9) ? date.getDate() : ('0' + date.getDate())) + '/' + date.getFullYear()
  }
  getTransactions(startDate: Date, endDate: Date) : Observable<Transaction[]>{
   
    return this.http.get(`http://localhost:3000/transactions?startDate=${this.formatDate(startDate)}&endDate=${this.formatDate(endDate)}`) as Observable<Transaction[]>
    //return of(this.transactions);
  }
  updateTransaction(transaction: Transaction) {
    this.transactionsSubject.next('changes');
    return this.http.put('http://localhost:3000/transactions', transaction)
  }
}
export class Transaction {
  id!: number;
  date!: string;
  comments!: string;
}
