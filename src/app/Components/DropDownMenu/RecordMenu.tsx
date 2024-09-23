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
        <ContextMenuItem inset>
          Done
          <ContextMenuShortcut>
            <CircleCheck className="p-1" />
          </ContextMenuShortcut>
        </ContextMenuItem>
        <ContextMenuItem inset>
          Export
          <ContextMenuShortcut>
            <ShareIcon className="p-1" />
          </ContextMenuShortcut>
        </ContextMenuItem>
        <ContextMenuSeparator />
        <ContextMenuItem inset>
          Edit
          <ContextMenuShortcut>
            <Settings className="p-1" />
          </ContextMenuShortcut>
        </ContextMenuItem>
        <ContextMenuSeparator />
        <ContextMenuItem inset className="hover:!bg-destructive">
          Delete
          <ContextMenuShortcut>
            <Trash2 className="p-1 hover:!text-foreground" />
          </ContextMenuShortcut>
        </ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  )
}
