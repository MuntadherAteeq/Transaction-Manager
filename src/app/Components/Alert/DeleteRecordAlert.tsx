"use client"

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import { deleteRecord } from "./Record.actions"
import type { Record } from "@prisma/client"
import { usePathname, useRouter } from "next/navigation"
import { mutate } from "swr"

export function DeleteRecordAlert({
  record,
  children,
}: {
  record: Record
  children: React.ReactNode
}) {
  const path = usePathname()
  const route = useRouter()
  async function handleDeleteRecord() {
    const activity = path.split("/")[1]
    await deleteRecord(record.id)
    await mutate(`/API/records?activity=${activity}`)
    route.push(`/${activity}`)
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>{children}</AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction>
            <Button variant="destructive" onClick={handleDeleteRecord}>
              Delete
            </Button>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
