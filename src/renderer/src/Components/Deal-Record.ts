export default class Deal_Record extends HTMLElement {
  constructor() {
    super();
    this.innerHTML = `
        <div class="record-container">
            <div class="header">
                <div class="logo">Logo</div>
                <div class="name">Name</div>
            </div>
            <div class="prop-list">
                <deal-prop lapel="Beget" />
                <deal-prop lapel="Date" />
                <deal-prop lapel="Tags" />
                <deal-prop lapel="Email" />
                <deal-prop lapel="Phone" />
            </div>
        </div>
        `;
  }
}
customElements.define("deal-record", Deal_Record);
