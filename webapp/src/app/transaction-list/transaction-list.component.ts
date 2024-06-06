import { Component } from '@angular/core';
import { Transaction, TransactionService } from '../transaction.service';
import { MatDialog } from '@angular/material/dialog';
import { TransactionDetailComponent } from '../transaction-detail/transaction-detail.component';
import { Observable, of } from 'rxjs';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-transaction-list',
  templateUrl: './transaction-list.component.html',
  styleUrl: './transaction-list.component.scss'
})
export class TransactionListComponent {
  range = new FormGroup({
    start: new FormControl<Date | null>(null),
    end: new FormControl<Date | null>(null),
  });
  transactions: Observable<Transaction[]> = of([]);
  displayedColumns: string[] = ['id', 'date', 'comments', 'action'];

  
  constructor(private transactionService: TransactionService, public dialog: MatDialog){
   
    transactionService.transactionsSubject.subscribe(t => {
      if(this.range.value.start && this.range.value.end) this.transactions = this.transactionService.getTransactions(this.range?.value?.start, this.range.value.end);
    });
    this.range.valueChanges.subscribe(val => {
      if(this.range.value.start && this.range.value.end) this.transactions = this.transactionService.getTransactions(this.range?.value?.start, this.range.value.end);
    })
  }
  viewTransaction(transaction: Transaction){
    this.dialog.open(TransactionDetailComponent,{data: transaction})
  }

}
