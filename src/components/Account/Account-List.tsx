import { Button } from "@/components/ui/button";
import { Plus, Search } from "lucide-react";

import { getAccounts } from "./accounts.actions";
import { CreateRecordDialog, RecordListItem } from "../Record/Records";
import AccountTable from "./Account-Table";

export async function AccountList(props: { Activity: string }) {
  const accounts = await getAccounts();
  return (
    <div className="w-full h-full">
      <AccountTable accounts={accounts} />
    </div>
  );
}

export function AddNewRecord(props: any) {
  return (
    <CreateRecordDialog>
      <Button
        variant={"default"}
        className="rounded-sm  text-sm font-semibold "
      >
        <Plus className=" size-5" />
        <span className="max-sm:hidden">New Record</span>
      </Button>
    </CreateRecordDialog>
  );
}
