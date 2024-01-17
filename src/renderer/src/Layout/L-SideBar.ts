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
            <deal-item />
        </div>
    </div>
    `;
  }
  connectedCallback() {
    sidebar_resize(this, "left");
    ActivityBar.subscribeToActivity(this.updateLabel.bind(this));
  }
  updateLabel() {
    this.querySelector(".tab-title span").textContent =
      ActivityBar.ActiveActivity.name;
  }
}
customElements.define("l-sidebar", L_SideBar);
