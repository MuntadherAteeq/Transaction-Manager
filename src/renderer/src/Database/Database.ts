import Deal from "../Model/Deal";

class Database {
  constructor() {}
  createNewDeal() {
    const deal = new Deal();

    return deal;
  }
  getDeals() {
    const map = new Map<string, Deal>();
    return map;
  }
  getDealById() {}
  updateDeal(deal: Deal) {}
  deleteDeal() {}
}
const database = new Database();
export default database;
