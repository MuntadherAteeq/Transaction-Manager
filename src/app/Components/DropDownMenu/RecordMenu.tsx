"use client"
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuShortcut,
  ContextMenuTrigger,
  ContextMenuSeparator,
} from "@/components/ui/context-menu"
import { CircleCheck, Settings, ShareIcon, Trash2 } from "lucide-react"

export function Record_DropdownMenu({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ContextMenu>
      <ContextMenuTrigger>{children}</ContextMenuTrigger>
      <ContextMenuContent className="w-64 bg-background ">
        <ContextMenuItem>
          Done
          <ContextMenuShortcut>
            <CircleCheck className="p-1" />
          </ContextMenuShortcut>
        </ContextMenuItem>
        <ContextMenuItem>
          Export
          <ContextMenuShortcut>
            <ShareIcon className="p-1" />
          </ContextMenuShortcut>
        </ContextMenuItem>
        <ContextMenuSeparator />
        <ContextMenuItem>
          Edit
          <ContextMenuShortcut>
            <Settings className="p-1" />
          </ContextMenuShortcut>
        </ContextMenuItem>
        <ContextMenuSeparator />
        <ContextMenuItem className="hover:!bg-destructive w-full h-full">
          Delete
          <ContextMenuShortcut>
            <Trash2 className="p-1 hover:!text-foreground" />
          </ContextMenuShortcut>
        </ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  )
}
