import Transaction_Table from "../Components/Table";

export default class Editor extends HTMLElement {
  constructor() {
    super();
    this.innerHTML = `
        <div class="editor">
        <div class="trans-container">
          <tran-table></tran-table>
        </div>
      </div>
    `;
  }
  connectedCallback() {}
}
customElements.define("main-editor", Editor);
