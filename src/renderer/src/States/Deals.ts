import { derived, writable } from "svelte/store";

// Define the type for activity names
type ActivityNames = "inbox" | "history" | "wallet";

// Create an object to store the state of the activities
let tabs: Record<ActivityNames, boolean> = {
  inbox: true,
  history: false,
  wallet: false,
};

// Create the Svelte store
export const activityStore = writable<typeof tabs>(tabs);

// Set the active tab
export function setActive(activity: ActivityNames) {
  activityStore.update((prev) => {
    const updatedTabs = { ...prev };
    for (const key in updatedTabs) {
      updatedTabs[key] = key === activity;
    }
    return updatedTabs;
  });
}

// getActive will return String of the active Activity
export const getActive = derived(activityStore, ($activityStore) => {
  for (const key in $activityStore) {
    if ($activityStore[key]) {
      return key;
    }
  }
  return null; 
});
