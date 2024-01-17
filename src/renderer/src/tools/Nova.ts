export function html(strings: string | TemplateStringsArray, ...values: any[]) {
  let html = "";
  const map = new Map<string, any>();
  for (let i = 0; i < strings.length; i++) {
    html += strings[i];
    const renderHTMLElement = (HtmlElement: HTMLElement) => {
      const id = uid();
      const element = HtmlElement;
      element.setAttribute(id, "");
      map.set(id, element);
      element.removeAttribute(id);
      return element.outerHTML || "";
    };

    const renderArrayHTMLElement = (list: [HTMLElement]) => {
      let elements = "";
      if (Array.isArray(list)) {
        list.forEach((element: HTMLElement) => {
          if (element instanceof HTMLElement) {
            elements += renderHTMLElement(element);
          }
        });
      }
      return elements;
    };

    if (typeof values[i] == "number") {
      html += values[i];
    }

    if (values[i] instanceof HTMLElement) {
      html += renderHTMLElement(values[i] as HTMLElement);
    }

    if (Array.isArray(values[i])) {
      html += renderArrayHTMLElement(values[i]);
    }
  }
  let temp = new DOMParser().parseFromString(html, "text/html").body
    .firstElementChild as HTMLElement;
  for (let [key, value] of map) {
    let element = findElementByAttribute(temp, key);
    element && replace(element, value);
  }
  console.log(temp);
  return temp;
}

export function uid() {
  return Date.now().toString(36) + Math.random().toString(36).substring(2);
}

function findElementByAttribute(
  element: HTMLElement,
  key: string,
): HTMLElement | undefined {
  if (element.hasAttribute(key)) {
    return element;
  }

  // Recursively search child elements:
  const children = element.children;
  for (let i = 0; i < children.length; i++) {
    const foundElement = findElementByAttribute(
      children[i] as HTMLElement,
      key,
    );
    if (foundElement) {
      return foundElement;
    }
  }
}

function replace(oldElement: HTMLElement, newElement: HTMLElement) {
  const parent = oldElement.parentElement;
  if (parent) {
    parent.replaceChild(newElement, oldElement);
  }
}

export class NovaElement extends HTMLElement {
  private destroy: () => void = () => {};
  private eventListeners: Map<
    HTMLElement,
    {
      event: keyof HTMLElementEventMap;
      callback: EventListenerOrEventListenerObject;
    }[]
  > = new Map();
  on(
    element: HTMLElement,
    event: keyof HTMLElementEventMap,
    callback: EventListenerOrEventListenerObject,
  ) {
    const listeners = this.eventListeners.get(element) || [];
    listeners.push({ event, callback });
    this.eventListeners.set(element, listeners);
    if (element instanceof HTMLElement) {
      element.addEventListener(event, callback as EventListener);
    }
  }
  onMount(): () => void {
    return this.destroy;
  }

  connectedCallback() {
    this.destroy = this.onMount();
  }

  disconnectedCallback() {
    this.destroy();
    this.eventListeners.forEach((listeners, element) => {
      if (element instanceof HTMLElement) {
        listeners.forEach(({ event, callback }) => {
          element.removeEventListener(event, callback as EventListener);
        });
      }
    });
  }
}

export const events = new Map<
  HTMLElement,
  Array<{
    type: string;
    listener: EventListenerOrEventListenerObject;
    options?: boolean | AddEventListenerOptions | undefined;
  }>
>();

class Nova extends Array<HTMLElement | Nova> {
  ready(callback: () => void): Nova {
    const isReady = this.some(
      // @ts-ignore
      (e) => e.readyState !== null && e.readyState !== "loading",
    );
    if (isReady) {
      callback();
    } else {
      this.on("DOMContentLoaded", callback);
    }
    return this;
  }

  // @ts-ignore
  on(): Nova;
  on<K extends keyof HTMLElementEventMap>(
    type: K,
    listener: (this: HTMLElement, ev: HTMLElementEventMap[K]) => any,
    options?: boolean | AddEventListenerOptions | undefined,
  ): Nova;
  on(
    type: string,
    listener: EventListenerOrEventListenerObject,
    options?: boolean | AddEventListenerOptions | undefined,
  ): Nova;
  on(
    type: keyof HTMLElementEventMap | string,
    listener: EventListenerOrEventListenerObject,
    options?: boolean | AddEventListenerOptions | undefined,
  ): Nova {
    if (type === undefined && listener === undefined && options === undefined) {
      this.forEach((element) => {
        if (element instanceof Nova) {
          element.on();
        } else {
          events.get(element)?.forEach(({ type, listener, options }) => {
            element.addEventListener(type, listener, options);
          });
        }
      });
      return this;
    }

    this.forEach((element) => {
      if (element instanceof Nova) {
        element.on(type, listener, options);
      } else {
        element.addEventListener(type, listener, options);
        if (events.has(element)) {
          events.get(element)?.push({ type, listener, options });
        } else {
          events.set(element, [{ type, listener, options }]);
        }
      }
    });
    return this;
  }
  // TODO: add off all events based on type
  // @ts-ignore
  off(): Nova;
  off<K extends keyof HTMLElementEventMap>(
    type: K,
    listener: (this: HTMLElement, ev: HTMLElementEventMap[K]) => any,
    options?: boolean | EventListenerOptions | undefined,
  ): Nova;
  off(
    type: string,
    listener: EventListenerOrEventListenerObject,
    options?: boolean | EventListenerOptions | undefined,
  ): Nova;
  off(
    type: keyof HTMLElementEventMap | string,
    listener: EventListenerOrEventListenerObject,
    options?: boolean | EventListenerOptions | undefined,
  ): Nova {
    if (type === undefined && listener === undefined && options === undefined) {
      this.forEach((element) => {
        if (element instanceof Nova) {
          element.off();
        } else {
          events.get(element)?.forEach(({ type, listener, options }) => {
            if (events.has(element)) {
              element.removeEventListener(type, listener, options);
            }
          });
          if (events.get(element)?.length === 0) {
            events.delete(element);
          }
        }
      });
      return this;
    } else {
      this.forEach((element) => {
        if (element instanceof Nova) {
          element.off(type, listener, options);
        } else {
          element.removeEventListener(type, listener, options);
          events.delete(element);
        }
      });
      return this;
    }
  }

  text(value: string): Nova {
    this.forEach((element) => {
      if (element instanceof Nova) {
        element.text(value);
      } else {
        element.textContent = value;
      }
    });
    return this;
  }

  append(...elements: (Nova | HTMLElement)[]): Nova {
    elements.forEach((element: Nova | HTMLElement) => {
      if (element instanceof Nova) {
        this.append(...element);
      } else {
        this.forEach((el) => {
          (el as HTMLElement).appendChild(element);
        });
      }
    });
    return this;
  }

  remove(): Nova {
    this.forEach((element) => {
      if (element instanceof Nova) {
        element.off();
        element.remove();
      } else {
        events.get(element)?.forEach(({ type, listener, options }) => {
          element.removeEventListener(type, listener, options);
        });
        element.remove();
      }
    });
    return this;
  }

  get(selector: string): Nova {
    const elements = new Nova();
    this.forEach((element) => {
      if (element instanceof Nova) {
        elements.push(...element.get(selector));
      } else {
        elements.push(...(element.querySelectorAll(selector) as any));
      }
    });
    return elements;
  }
  toggleClass(className: string): Nova {
    this.forEach((element) => {
      if (element instanceof Nova) {
        element.toggleClass(className);
      } else {
        element.classList.toggle(className);
      }
    });
    return this;
  }
  // TODO: add ReplaceWith method
  // TODO: add Switch method
  // TODO: add Next method
  // TODO: add Prev method
  // TODO: add Add Class method
  // TODO: add Remove Class method
  // TODO: add Toggle Class method
  // TODO: add Has Class method
  // TODO: add Add Attribute method
  // TODO: add Remove Attribute method
  // TODO: add Has Attribute method
  // TODO: add Get Attribute method
  // TODO: add Set Attribute method
  // TODO: add css method
}

// export function $(selector: string | Element | Element[]): Nova {
//   if (typeof selector === "string" || selector instanceof String) {
//     return new Nova(...(find(selector as string) as unknown as HTMLElement[]))
//   } else if (selector instanceof HTMLElement) {
//     return new Nova(selector as HTMLElement)
//   } else if (Array.isArray(selector)) {
//     return new Nova(...(selector as HTMLElement[]))
//   }
//   return new Nova()
// }

function $<K extends keyof HTMLElementTagNameMap>(selectors: K): Nova;
function $<K extends keyof SVGElementTagNameMap>(selectors: K): Nova;
function $<K extends keyof MathMLElementTagNameMap>(selectors: K): Nova;
function $<K extends keyof HTMLElementDeprecatedTagNameMap>(selectors: K): Nova;
function $<E extends Element = Element>(selectors: string): Nova;
function $(selector: string | Element | Element[]): Nova;
function $(selector: unknown): Nova {
  if (typeof selector === "string" || selector instanceof String) {
    try {
      return new Nova(
        ...(document.querySelectorAll(
          selector as string,
        ) as unknown as HTMLElement[]),
      );
    } catch (e) {
      if (/^\s*<[\s\S]*>\s*$/.test(selector as string)) {
        return new Nova(
          new DOMParser().parseFromString(selector as string, "text/html").body
            .firstElementChild as HTMLElement,
        );
      } else {
        throw new Error("Invalid selector");
      }
    }
  } else if (selector instanceof HTMLElement) {
    return new Nova(selector as HTMLElement);
  } else if (
    Array.isArray(selector) &&
    selector.every((el) => el instanceof HTMLElement)
  ) {
    return new Nova(...(selector as HTMLElement[]));
  }
  return new Nova();
}

$.html = html;

export default $;
