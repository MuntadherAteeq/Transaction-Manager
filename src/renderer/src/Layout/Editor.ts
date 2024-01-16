export default class Editor extends HTMLElement {
  constructor() {
    super();
    this.innerHTML = `
        <div class="editor">
        <div class="trans-container">
          <transaction-item></transaction-item>

        </div>
      </div>
    `;
  }
  connectedCallback() {}
}
customElements.define("main-editor", Editor);
