import Icon_Box from "../Assets/Icon-Box";
import Icon_Wallet from "../Assets/Icon-Wallet";
import Icon_History from "../Assets/Icon-History";
import Icon_Settings from "../Assets/Icon-Settings";

type Activity = {
  name: string;
  icon: HTMLElement;
};
export const Activities = {
  inbox: {
    name: "Inbox",
    icon: new Icon_Box(),
  },
  history: {
    name: "History",
    icon: new Icon_History(),
  },
  wallet: {
    name: "Wallet",
    icon: new Icon_Wallet(),
  },
};

export default class ActivityBar extends HTMLElement {
  static ActiveActivity: Activity = Activities.inbox;
  static ActiveActivityListeners: Function[] = [];
  constructor() {
    super();
    this.innerHTML = `
        <div class="top"></div>
        <div class="bottom">
            <icon-settings />
        </div>
    `;
  }
  connectedCallback() {
    ActivityBar.ActiveActivity.icon
      .querySelector("svg")
      .classList.toggle("active");
    const top = this.querySelector(".top");
    for (const activity in Activities) {
      top.appendChild(Activities[activity].icon);
      Activities[activity].icon.addEventListener("click", () => {
        this.setActivity((Activities) => Activities[activity]);
      });
    }
  }
  setActivity(callback: (activities: typeof Activities) => Activity) {
    if (ActivityBar.ActiveActivity !== callback(Activities)) {
      ActivityBar.ActiveActivity.icon
        .querySelector("svg")
        .classList.toggle("active");
      ActivityBar.ActiveActivity = callback(Activities);
      ActivityBar.ActiveActivity.icon
        .querySelector("svg")
        .classList.toggle("active");
      this.notifyActivityChanged();
    }
  }
  notifyActivityChanged() {
    ActivityBar.ActiveActivityListeners.forEach((listener) => listener());
  }
  static subscribeToActivity(listener: Function) {
    ActivityBar.ActiveActivityListeners.push(listener);
  }
}
customElements.define("activity-bar", ActivityBar);
