import avatar from "../../../../resources/Avatar.png";
import type Deal from "../Model/Deal";
import $State from "../State/StateManager";

export default class DealItem extends HTMLElement {
  public deal?: Deal;
  constructor(deal?: Deal) {
    super();
    this.deal = deal;
    this.innerHTML = `
        <div class="avatar-container">
            <img id="avatar" alt="avatar" draggable="false"/>
        </div>
        <div class="info-container">
            <div class="top">
                <div class="name">${deal.name}</div>
            </div>
            <div class="bottom">
                <div class="date">${deal.date.getFullYear()}</div>
                <div class="total">${deal.total}</div>
            </div>
        </div>
    `;
  }
  connectedCallback() {
    const avatarImg = this.querySelector("#avatar") as HTMLImageElement;
    avatarImg.src = avatar;
    this.deal?.subscribeToDeal(this.update.bind(this));

    this.addEventListener("click", () => {
      $State.removeDeal(this.deal);
    });
  }
  setTitle(title: string) {
    this.querySelector(".name").textContent = title;
  }
  setTotal(total: number) {
    const div = this.querySelector(".total");
    div.textContent = total.toString();
    if (total < 0) {
      div.classList.remove("positive");
      div.classList.add("negative");
    } else {
      div.classList.remove("negative");
      div.classList.add("positive");
    }
  }
  setDate(date: Date) {
    this.querySelector(".date").textContent = date.getFullYear().toString();
  }
  update() {
    this.setTitle(this.deal?.name);
    this.setTotal(this.deal?.total);
    this.setDate(this.deal?.date);
  }
}
customElements.define("deal-item", DealItem);
