import { ulid } from "ulid";

export default class Transaction {
  private _id: string;

  constructor(
    public amount: number,
    public date: Date,
    public description: string,
    id?: string,
  ) {
    this._id = id || ulid();
    this.amount = amount || undefined;
    this.date = date || new Date();
    this.description = description || "";
  }
  get id() {
    return this._id;
  }
}
