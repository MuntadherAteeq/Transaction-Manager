export default class TitleBar extends HTMLElement {
  private template = `
    <div class="options">
      <logo-blue/>
      <button>New</button>
    </div>
    <button class="search"><icon-search />Search</button>
    <div class="actions">
      <icon-minus />
      <icon-square />
      <icon-x />
    </div>
    `;
  constructor() {
    super();
  }
  connectedCallback() {
    this.innerHTML = this.template;
  }
}
customElements.define("title-bar", TitleBar);
