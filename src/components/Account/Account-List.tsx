import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Search } from "lucide-react";
import Link from "next/link";

import { Inbox } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { getAccounts } from "./accounts.actions";
import { CreateRecordDialog, RecordListItem } from "../Record/Records";

export async function AccountList(props: { Activity: string }) {
  const accounts = await getAccounts();
  return (
    <>
      <div className="top-12 bg-sidebar w-full h-12 px-1 py-2 flex gap-2 flex-row items-center border-b-1 shadow-md shadow-black/10 ">
        <AddNewRecord />
        <div className="relative w-full">
          <Input
            type="text"
            placeholder="Search integrations..."
            className="w-full h-10 pl-12  bg-transparent"
          />
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
        </div>
      </div>
      <Card className="shadow-md rounded-none h-full">
        <CardContent>
          {(accounts ?? []).length > 0 ? (
            // <DataTable data={data} />
            <h1>Hello world</h1>
          ) : (
            <div className="py-12 flex flex-col items-center justify-center text-center space-y-4">
              <div className="bg-muted p-4 rounded-full">
                <Inbox className="h-12 w-12 text-primary" />
              </div>
              <div className="space-y-2">
                <h3 className="text-xl font-semibold">No Records</h3>
                <p className="text-muted-foreground max-w-sm mx-auto">
                  You haven't added any Records to your collection. Add your
                  first Record to get started.
                </p>
              </div>
              <AddNewRecord />
            </div>
          )}
        </CardContent>
      </Card>
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
