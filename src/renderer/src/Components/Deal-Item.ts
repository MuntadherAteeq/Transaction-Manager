import avatar from "../../../../resources/Avatar.png";

export default class DealItem extends HTMLElement {
  constructor() {
    super();
    this.innerHTML = `
        <div class="avatar-container">
            <img id="avatar" alt="avatar" draggable="false"/>
        </div>
        <div class="info-container">
            <div class="top">
                <div class="name">Muntadher Ahmed Ateeq</div>
            </div>
            <div class="bottom">
                <div class="date">2023</div>
                <div class="total positive">+30.000</div>
            </div>
        </div>
    `;
  }
  connectedCallback() {
    const avatarImg = this.querySelector("#avatar") as HTMLImageElement;
    avatarImg.src = avatar;
  }
}
customElements.define("deal-item", DealItem);
