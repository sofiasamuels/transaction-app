import { Person } from "./person";

export class Transaction {
    id!: number;
    date!: Date;
    comments!: string;
    sender!: Person;
    recipient!: Person;
    amount: number=0;
    currencyCd: string = '';
    status: string = '';
  }
  export enum Status {
    PENDING,COMPLETED, INPROGRESS,
    REJECTED
  }