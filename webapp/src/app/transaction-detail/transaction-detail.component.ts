import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Transaction, TransactionService } from '../transaction.service';

@Component({
  selector: 'app-transaction-detail',
  templateUrl: './transaction-detail.component.html',
  styleUrl: './transaction-detail.component.scss'
})
export class TransactionDetailComponent {
  transaction: Transaction;
  error = '';
  constructor(
    public dialogRef: MatDialogRef<TransactionDetailComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Transaction,
    private transactionService: TransactionService
  ) {
    this.transaction = Object.assign({},data);
  }
  save() {
    this.transactionService.updateTransaction(this.transaction).subscribe(res => {
      this.dialogRef.close();
    }, err =>{
      this.error = 'Error saving the changes'
    });
    
  }
}
