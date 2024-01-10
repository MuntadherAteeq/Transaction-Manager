import { ulid } from "ulid";
import type Transaction from "./Transaction";

export default class Deal {
  _id: string;

  constructor(
    public name: string,
    public total: number,
    public date?: Date,
    id?: string,
    public transactions?: Transaction[],
  ) {
    this._id = id || ulid();
    this.date = date || new Date();
    this.transactions = transactions || [];
  }

  addTransaction(transaction: Transaction): void {
    this.transactions.push(transaction);
    this.total += transaction.amount;
  }

  removeTransaction(transaction: Transaction): void {
    let index = this.transactions.indexOf(transaction);
    if (index > -1) {
      this.transactions.splice(index, 1);
      this.total - transaction.amount;
    }
  }

  getTotalAmount(): number {
    let sum = 0;
    for (let transaction of this.transactions) {
      sum += transaction.amount;
    }
    return sum;
  }
}
