import sidebar_resize from "../Tools/sidebar-resizer";
import ActivityBar from "./ActivityBar";

export default class L_SideBar extends HTMLElement {
  private label = ActivityBar.ActiveActivity.name;
  constructor() {
    super();
    this.innerHTML = `
    <div class="l-sidebar">
        <div class="tab-title">
            <span>${ActivityBar.ActiveActivity.name}</span>
        </div>
        <div class="content">
            <deal-item />
        </div>
    </div>
    `;
  }
  connectedCallback() {
    sidebar_resize(this, "right");
    ActivityBar.subscribeToActivity(this.render.bind(this));
  }
  render() {
    this.querySelector(".tab-title span").textContent =
      ActivityBar.ActiveActivity.name;
  }
}
customElements.define("l-sidebar", L_SideBar);
