import { SplashScreen } from "@/components/Splash-Screen";
import { requireAuth } from "./Auth/auth.actions";

export default async function Home_Page(props: any) {
  await requireAuth();
  return <>{props.children}</>;
}
