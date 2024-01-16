import "./style.scss";
import TitleBar from "./Layout/TitleBar";
import ActivityBar from "./Layout/ActicityBar";
import L_SideBar from "./Layout/L-SideBar";
import R_SideBar from "./Layout/R-SideBar";
import DealItem from "./Components/Deal-Item";
import Transaction_Item from "./Components/Transaction-Item";
import DealRecord from "./Components/Deal-Record";
import Editor from "./Layout/Editor";
import database from "./Database/Database";
import type Deal from "./Model/Deal";

export default class App extends HTMLElement {
  constructor() {
    super();
    this.innerHTML = `
      <title-bar></title-bar>
      <div class="app-container">
        <activity-bar> </activity-bar>
        <l-sidebar></l-sidebar>
        <main-editor></main-editor>
        <r-sidebar></r-sidebar>
      </div>
    `;
  }
  connectedCallback() {}
}
customElements.define("transaction-manager", App);


