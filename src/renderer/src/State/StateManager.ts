import database from "../Database/Database";
import Deal from "../Model/Deal";

class State {
  public deals: Map<string, Deal>;
  public ActiveDealSubscribers: Function[] = [];
  public ActiveDeal: Deal | null = null;
  public ActivitySubscribers: Function[] = [];
  public DealsSubscribers: Function[] = [];
  constructor() {
    this.load();
    // hello world
  }

  public async load() {
    const deals = await database.getAll();
    this.deals = new Map();
    deals.forEach((deal) => {
      this.deals.set(deal._id, new Deal(deal));
    });
    this.notifyDealsSubscribers();
  }
  public notifyDealsSubscribers() {
    this.DealsSubscribers.forEach((subscriber) => {
      subscriber();
    });
  }
  createNewDeal() {
    const deal = database.create_New_Deal();
    this.deals.set(deal._id, deal);
    this.notifyDealsSubscribers();
    return deal;
  }
  removeDeal(deal: Deal) {
    this.deals.delete(deal._id);
    this.notifyDealsSubscribers();
  }
  public subscribeToDeals(subscriber: Function) {
    this.DealsSubscribers.push(subscriber);
  }
  clearDeals() {
    database.clear();
    this.deals.clear();
    this.notifyDealsSubscribers();
  }
}
const $State = new State();
export default $State;
