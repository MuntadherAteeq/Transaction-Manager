export default class Transaction_Item extends HTMLElement {
  constructor() {
    super();
    this.innerHTML = `
        <div class="transaction positive">
          <div id="Tran">
            <div id="top-bar">
              <div id="price">
                <span class="price">30.000</span>
                <span class="currency">BD</span>
              </div>
            </div>
            <!-- TODO: make tran content as textarea  -->
            <!-- <textarea on:input={handleChange} id="content" value={text} /> -->
            <div id="content">{text}</div>
            <div id="time">10:26 AM</div>
          </div>
        </div>
        `;
  }
}
customElements.define("transaction-item", Transaction_Item);
