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
  async getDeals() {
    const map = new Map<string, Deal>();
    await this.db
      .allDocs({ include_docs: true })
      .then((docs) => {
        docs.rows.forEach((row) => {
          map.set(row.doc._id, new Deal(row.doc));
        });
      })
      .catch((err) => console.log(err));
    return map;
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
