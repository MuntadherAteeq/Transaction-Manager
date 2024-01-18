import Deal from "../Model/Deal";

class Database {
  db: PouchDB.Database<any>;
  constructor() {
    this.db = new PouchDB("test");
  }
  createNewDeal() {
    const deal = new Deal();
    this.db.put(deal);
    return deal;
  }
  async getDealsMap() {
    const deals = new Map();
    const docs = await this.db.allDocs({ include_docs: true });
    docs.rows.forEach((row) => {
      deals.set(row.doc._id, new Deal(row.doc));
    });
    return deals;
  }
  getDealById(id: string) {
    return new Deal(this.db.get(id));
  }
  updateDeal(deal: Deal) {
    this.db.put(deal);
  }
  deleteDeal(deal) {
    this.db.remove(deal);
  }
}
const database = new Database();
export default database;
