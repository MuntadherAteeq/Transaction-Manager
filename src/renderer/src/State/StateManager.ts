import Icon_Box from "../Assets/Icon-Box";
import Icon_History from "../Assets/Icon-History";
import Icon_Wallet from "../Assets/Icon-Wallet";
import database from "../Database/Database";
import { Activities } from "../Layout/ActicityBar";
import Deal from "../Model/Deal";

export class $State {

  private deals: Map<string, Deal>;
  private ActiveDealListeners: Function[] = [];
  private _ActiveDeal: Deal | null = null;
  constructor() {
    this.load();
  }

  updateDeals(Deal: Deal) {
    this.deals.set(Deal.id, Deal);
    database.updateDeal(Deal);
  }
  getDeals() {
    return this.deals;
  }
  setActiveDeal(Deal: Deal) {
    this._ActiveDeal = Deal;
  }
  createNewDeal() {
    const deal = database.createNewDeal();
    this.deals.set(deal.id, deal);
    this._ActiveDeal = deal;
    this.notifyActiveDealChanged();
  }
  notifyActiveDealChanged() {
    this.ActiveDealListeners.forEach((listener) => listener());
  }
  load() {
    this.deals = database.getDeals();
  }
  subscribeToActiveDeal(listener: Function) {
    this.ActiveDealListeners.push(listener);
  }
  get ActiveDeal() {
    return this._ActiveDeal;
  }
  set ActiveDeal(Deal: Deal | null) {
    this._ActiveDeal = Deal;
    this.notifyActiveDealChanged();
  }

}



const State = new $State();
export default State;
