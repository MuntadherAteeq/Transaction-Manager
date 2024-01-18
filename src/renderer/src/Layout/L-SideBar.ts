import DealItem from "../Components/Deal-Item";
import database from "../Database/Database";
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
    database.getDealsMap().then((deals) => {
      for (let deal of deals) {
        let deal_item = new DealItem(deal[1]);
        this.querySelector(".content").appendChild(deal_item);
      }
    });
  }
  updateLabel() {
    this.querySelector(".tab-title span").textContent =
      ActivityBar.ActiveActivity.name;
  }
}
customElements.define("l-sidebar", L_SideBar);
