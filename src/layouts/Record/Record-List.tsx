"use client";
import { Button } from "@/components/ui/button";
import { CreateRecordDialog, RecordItem } from "./Records";
import { Input } from "@/components/ui/input";
import { Plus, Search } from "lucide-react";

export function RecordList(props: { activity: string }) {
  return (
    <>
      <div className="top-12 bg-sidebar w-full h-12 p-2 flex gap-2 flex-row items-center border-b-1 shadow-md shadow-black/10 ">
        <div className="relative w-full">
          <Input
            type="text"
            placeholder="Search integrations..."
            className="w-full h-10 pl-10 pr-4"
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
        </div>
      </div>
      <div className="flex flex-1 flex-col gap-2 p-4 ">
        {Array.from({ length: 15 }, (_, index) => (
          <Link href={`/${props.activity}/${index}`} key={index}>
            <RecordItem key={index} />
          </Link>
        ))}
      </div>
    </>
  );
}

import { Skeleton } from "@/components/ui/skeleton";
import Link from "next/link";

export function RecordSkeleton() {
  return (
    <div className="flex items-center space-x-4 m-2.5">
      <Skeleton className="bg-foreground/15 h-12 w-12 rounded-full" />
      <div className="space-y-2">
        <Skeleton className=" bg-foreground/15 h-4 w-[250px]" />
        <Skeleton className=" bg-foreground/15 h-4 w-[200px]" />
      </div>
    </div>
  );
}

export function AddNewRecordBTN(props: any) {
  return (
    <CreateRecordDialog>
      <Button
        variant={"default"}
        className="rounded-sm  text-sm font-semibold "
      >
        <Plus className="sm:hidden size-5" />
        <span className="max-sm:hidden">New Record</span>
      </Button>
    </CreateRecordDialog>
  );
}
