export default function sidebar_resize(
  sidebar: HTMLElement,
  location: "left" | "right" = "right",
) {
  const resizer = document.createElement("hr");
  resizer.classList.add("handle");

  if (location === "right") {
    resizer.style.right = `-3px`;
  } else {
    resizer.style.left = `-3px`;
  }

  resizer.addEventListener("mousedown", (event) => {
    document.body.style.cursor = "e-resize";
    resizer.classList.add("active");
    document.addEventListener("mousemove", resize, false);
    document.addEventListener(
      "mouseup",
      () => {
        document.body.style.cursor = "unset";
        resizer.classList.remove("active");
        document.removeEventListener("mousemove", resize, false);
      },
      false,
    );
  });

  function resize(e: MouseEvent) {
    let size;
    if (location === "right") {
      size = e.x - 65;
    } else {
      size = -1 * (e.x - document.body.getBoundingClientRect().width);
    }
    if (size < 600) {
      sidebar.style.flexBasis = `${size}px`;
    }
  }
  sidebar.appendChild(resizer);
}
