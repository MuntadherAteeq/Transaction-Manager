export default class Transaction_Table extends HTMLElement {
  constructor() {
    super();
    this.innerHTML = `
      <table>
        <tr id="header">
          <th>Description</th>
          <th>Date</th>
          <th>Tag</th>
          <th>Price</th>
        </tr>
        <tr>
          <td class="desc"><input type="text"  value="مصروفات"/></td>
          <td><input type="date"  value="2024-01-17" /></td>
          <td><input type="text"  value="بترول" /></td>
          <td><input type="number"  value="30.00" /></td>
        </tr>
      </table>
      <div id ="footer">
        <div id="label">Total </div>
        <div id="total">30.00 DB</div>
      </div>
      `;
  }
}
customElements.define("tran-table", Transaction_Table);
