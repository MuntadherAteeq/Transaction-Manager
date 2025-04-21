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
    <>
      {(users ?? []).length > 0 ? (
        <AccountTable users={users} />
      ) : (
        <div className="py-12 flex flex-col items-center justify-center text-center space-y-4">
          <div className="bg-muted p-4 rounded-full">
            <Inbox className="h-12 w-12 text-primary" />
          </div>
          <div className="space-y-2">
            <h3 className="text-xl font-semibold">No Records</h3>
            <p className="text-muted-foreground max-w-sm mx-auto">
              You haven't added any Records to your collection. Add your first
              Record to get started.
            </p>
          </div>
          <AddNewRecord />
        </div>
      )}
      {/* </CardContent> */}
      {/* </Card> */}
    </>
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
