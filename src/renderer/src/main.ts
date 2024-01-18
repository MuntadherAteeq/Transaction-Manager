declare global {
  interface Window {
    $: JQueryStatic;
  }
}
import "./style.scss";
import "./jQuery.scss";
import TitleBar from "./Layout/TitleBar";
import ActivityBar from "./Layout/ActivityBar";
import L_SideBar from "./Layout/L-SideBar";
import R_SideBar from "./Layout/R-SideBar";
import DealItem from "./Components/Deal-Item";
import Transaction_Item from "./Components/Transaction-Item";
import DealRecord from "./Components/Deal-Record";
import Editor from "./Layout/Editor";
import database from "./Database/Database";
import Deal from "./Model/Deal";
import Database from "./Database/Database";

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
  connectedCallback() {
    const db = Database;
  }
}
customElements.define("transaction-manager", App);
