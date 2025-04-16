import { createAuthClient } from "better-auth/react";
import { redirect } from "next/navigation";
export const authClient = createAuthClient({
  /** The base URL of the server (optional if you're using the same domain) */
  baseURL: process.env.BETTER_AUTH_URL || "http://localhost:3000",
});

export const SignOut = async () => {
  await authClient.signOut();
  redirect("/Auth");
};
