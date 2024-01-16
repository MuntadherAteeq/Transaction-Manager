import sidebar_resize from "../Tools/sidebar-resizer";

export default class R_SideBar extends HTMLElement {
  constructor() {
    super();
    this.innerHTML = `
          <div class="tab-title">
              <span>Record</span>
          </div>
          <deal-information />
      `;
  }
  connectedCallback() {
    sidebar_resize(this, "left");
  }
}
customElements.define("r-sidebar", R_SideBar);
