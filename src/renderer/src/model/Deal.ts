import { ulid } from "ulid";
import type Transaction from "./Transaction";

export default class Deal {
  public _id: string;
  public _rev: string;
  public subscriptions: Function[];
  public name?: string;
  public total?: number;
  public date?: Date;
  public transactions?: Transaction[];

  constructor(deal?: any) {
    this.name = deal?.name || "untitled";
    this._id = deal?.id || ulid();
    this.date = deal?.date || new Date();
    this.transactions = deal?.transactions || [];
    this.subscriptions = [];
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
}
