import { ulid } from "ulid";
import type Transaction from "./Transaction";

export default class Deal {
  public _id: string;
  public _rev: string;
  public name?: string;
  public total?: number;
  public date?: Date;
  public transactions?: Transaction[];
  public subscriptions: Function[] = [];

  constructor(deal?: any) {
    this.name = deal?.name || "untitled";
    this._id = deal?._id || ulid();
    this.date =
      typeof deal?.date === "string" ? new Date(deal.date) : new Date();
    this.transactions = deal?.transactions || [];
    this.total = deal?.total || 0;
    this._rev = deal?._rev || "";
  }

  subscribeToDeal(callback: Function): Function {
    this.subscriptions.push(callback);
    return () => {
      let index = this.subscriptions.indexOf(callback);
      if (index > -1) {
        this.subscriptions.splice(index, 1);
      }
    };
  }
  notify(): void {
    for (let callback of this.subscriptions) {
      callback();
    }
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
  setName(name: string): void {
    this.name = name;
    this.notify();
  }
  setDate(date: Date): void {
    this.date = date;
    this.notify();
  }
  setTotal(total: number): void {
    this.total = total;
    this.notify();
  }
  setTransactions(transactions: Transaction[]): void {
    this.transactions = transactions;
    this.notify();
  }
  toJSON() {
    return {
      _id: this._id,
      _rev: this._rev,
      name: this.name,
      date: this.date,
      total: this.total,
      transactions: this.transactions,
    };
  }
}
