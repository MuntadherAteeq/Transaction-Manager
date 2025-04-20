import { redirect } from "next/navigation";

export default function Error(props: any) {
  redirect("/Auth");
}
