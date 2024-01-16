export default class IconAdd extends HTMLElement {
  constructor() {
    super();
    this.innerHTML = `
<svg xmlns="http://www.w3.org/2000/svg" width="53" height="53" viewBox="0 0 53 53" fill="none">
  <rect width="53" height="53" rx="17" fill="#0072A5" />
  <path fill-rule="evenodd" clip-rule="evenodd"
    d="M25.9155 16C24.9987 16 24.2555 16.7433 24.2555 17.6602V25.404L16.6599 25.404C15.7432 25.404 15 26.1473 15 27.0642C15 27.9811 15.7432 28.7244 16.6599 28.7244L24.2555 28.7244V36.4681C24.2555 37.3851 24.9987 38.1284 25.9155 38.1284C26.8322 38.1284 27.5754 37.3851 27.5754 36.4681V28.7244L35.1709 28.7244C36.0877 28.7244 36.8309 27.9811 36.8309 27.0642C36.8309 26.1473 36.0877 25.404 35.1709 25.404L27.5754 25.404V17.6602C27.5754 16.7433 26.8322 16 25.9155 16Z"
    fill="#1C1C1C" />
</svg>
`;
  }
}
customElements.define("icon-add", IconAdd);
