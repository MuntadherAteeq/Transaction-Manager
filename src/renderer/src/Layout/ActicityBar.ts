export default class ActivityBar extends HTMLElement {
  constructor() {
    super();
    this.innerHTML = `
    <div class="activity-bar">
        <div class="top">
            <icon-box />
            <icon-history />
            <icon-wallet />
        </div>
        <div class="bottom">
            <icon-settings />
        </div>
    </div>
    `;
  }
}
customElements.define("activity-bar", ActivityBar);
