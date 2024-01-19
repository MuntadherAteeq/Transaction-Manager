import DealItem from "../Components/Deal-Item";
import database from "../Database/Database";
import Deal from "../Model/Deal";
import $State from "../State/StateManager";
import sidebar_resize from "../Tools/sidebar-resizer";
import ActivityBar from "./ActivityBar";

export default class L_SideBar extends HTMLElement {
  private label = ActivityBar.ActiveActivity.name;
  constructor() {
    super();
    this.innerHTML = `
    <div class="l-sidebar">
        <div class="tab-title">
            <span>${this.label}</span>
        </div>
        <div class="content">
            
        </div>
    </div>
    `;
  }
  connectedCallback() {
    sidebar_resize(this, "left");
    ActivityBar.subscribeToActivity(this.updateLabel.bind(this));
    $State.subscribeToDeals(this.renderList.bind(this));
  }
  updateLabel() {
    this.querySelector(".tab-title span").textContent =
      ActivityBar.ActiveActivity.name;
  }

  renderList() {
    const content = this.querySelector(".content");
    content.innerHTML = "";
    $State.deals.forEach((deal) => {
      const dealItem = new DealItem(deal);
      content.appendChild(dealItem);
    });
  }
}
customElements.define("l-sidebar", L_SideBar);
