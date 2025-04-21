import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Search } from "lucide-react";

import { Inbox } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { getAccounts } from "./accounts.actions";
import { CreateRecordDialog, RecordListItem } from "../Record/Records";
import AccountTable from "./Account-Table";

export async function AccountList(props: { Activity: string }) {
  const users = await getAccounts();
  return (
    <div className="w-full h-full p-2">
      <AccountTable users={users} />
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
