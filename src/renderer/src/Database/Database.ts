import Deal from "../Model/Deal";

class Database {
  db: PouchDB.Database<any>;
  constructor() {
    this.db = new PouchDB("test");
  }
  create_New_Deal() {
    const deal = new Deal();
    this.db.put(deal.toJSON());
    return deal;
  }

  async getAll() {
    const deals: Deal[] = [];
    const docs = await this.db.allDocs({ include_docs: true });
    docs.rows.forEach((row) => {
      deals.push(row.doc);
    });
    console.log(deals)
    return deals;
  }

  clear() {
    this.db.allDocs({ include_docs: true }).then((docs) => {
      docs.rows.forEach((row) => {
        this.db.remove(row.doc);
      });
    });
  }
  destroy() {
    this.db.destroy();
  }
}
const database = new Database();
export default database;
