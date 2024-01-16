import sidebar_resize from "../Tools/sidebar-resizer";

export default class L_SideBar extends HTMLElement {
  constructor() {
    super();
    this.innerHTML =`
    <div class="l-sidebar">
        <div class="tab-title">
            <span>Inbox</span>
        </div>
        <div class="content">
            <deal-item />
        </div>
    </div>
    `;
  }
  connectedCallback() {
    sidebar_resize(this, "right");
  }
}
customElements.define("l-sidebar", L_SideBar);
