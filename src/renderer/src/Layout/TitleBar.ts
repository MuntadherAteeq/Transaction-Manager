import database from "../Database/Database";
import $State from "../State/StateManager";

export default class TitleBar extends HTMLElement {
  private template = `
    <div class="options">
      <logo-blue/>
      <button id="new">New</button>
      <button id="clear">Clear</button>
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
    this.querySelector("#new").addEventListener("click", () => {
      $State.createNewDeal();
    });
    this.querySelector("#clear").addEventListener("click", () => {
      $State.clearDeals();
    });
  }
}
customElements.define("title-bar", TitleBar);
