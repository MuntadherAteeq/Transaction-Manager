import Icon_Box from "../Assets/Icon-Box";
import Icon_Wallet from "../Assets/Icon-Wallet";
import Icon_History from "../Assets/Icon-History";
import Icon_Settings from "../Assets/Icon-Settings";

export default class ActivityBar extends HTMLElement {
  private ActiveActivity: Activity = Activities.inbox;
  private ActiveActivityListeners: Function[] = [];
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
    this.ActiveActivity.icon.querySelector("svg").classList.toggle("active");
    const top = this.querySelector(".top");
    for (const activity in Activities) {
      top.appendChild(Activities[activity].icon);
      Activities[activity].icon.addEventListener("click", () => {
        this.setActivity((Activities) => Activities[activity]);
      });
    }
  }
  setActivity(callback: (activities: typeof Activities) => Activity) {
    if (this.ActiveActivity !== callback(Activities)) {
      this.ActiveActivity.icon.querySelector("svg").classList.toggle("active");
      this.ActiveActivity = callback(Activities);
      this.ActiveActivity.icon.querySelector("svg").classList.toggle("active");
      this.notifyActivityChanged();
    }
  }
  notifyActivityChanged() {
    this.ActiveActivityListeners.forEach((listener) => listener());
  }
  subscribeToActivity(listener: Function) {
    this.ActiveActivityListeners.push(listener);
  }
}
customElements.define("activity-bar", ActivityBar);

type Activity = {
  name: string;
  icon: HTMLElement;
};
export const Activities = {
  inbox: {
    name: "Inbox",
    icon: new Icon_Box(),
  },
  wallet: {
    name: "Wallet",
    icon: new Icon_Wallet(),
  },
  history: {
    name: "History",
    icon: new Icon_History(),
  },
};
