export default class Icon_Square extends HTMLElement {
  constructor() {
    super();
    this.innerHTML = `
        <svg
        role="presentation"
        xmlns="http://www.w3.org/2000/svg"
        width="21"
        height="21"
        viewBox="0 0 21 21"
        fill="none"
      >
        <g clip-path="url(#clip0_914_377)">
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M3.63979 0H17.3604C19.3621 0 21.0002 1.65874 21.0002 3.68611V17.3137C21.0002 19.3413 19.3623 20.9998 17.3604 20.9998H3.63979C1.63773 21 0 19.3414 0 17.3139V3.68611C0 1.65874 1.63773 0 3.63979 0ZM3.71067 1.90381H17.2892C18.2916 1.90381 19.112 2.72207 19.112 3.72234V17.2768C19.112 18.2774 18.2916 19.0962 17.2892 19.0962H3.71067C2.70827 19.0962 1.88803 18.2776 1.88803 17.2768V3.72217C1.88786 2.72207 2.7081 1.90381 3.71067 1.90381Z"
            fill="black"
          />
        </g>
        <defs>
          <clipPath id="clip0_914_377">
            <rect width="21" height="21" fill="white" />
          </clipPath>
        </defs>
      </svg>
        `;
  }
}
customElements.define("", Icon_Square);


