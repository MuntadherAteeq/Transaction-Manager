import { getAccount } from "@/app/Auth/auth.actions";
import { JobCardForm } from "../Job-Card-Form";

export default async function NewJobCard(props: any) {
  const account = await getAccount();
  console.log("account", account);
  return <JobCardForm />;
}
