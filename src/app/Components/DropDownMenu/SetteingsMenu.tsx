import { LogOut, MessageSquare, Settings, User } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import SignOutButton from "@/components/SignOutButton"

export function Settings_DropdownMenu({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          className="m-0 p-0 w-full h-full  border-0 outline-0 bg-transparent border-transparent outline-transparent focus:outline-transparent hover:bg-transparent"
          variant="outline"
        >
          {children}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 drop-shadow-md">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <User className="mr-2 h-4 w-4" />
            <span>Profile</span>
            <DropdownMenuShortcut></DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Settings className="mr-2 h-4 w-4" />
            <span>Settings</span>
            <DropdownMenuShortcut></DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <MessageSquare className="mr-2 h-4 w-4" />
          <span>Feedback</span>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <SignOutButton className="w-full">
          <DropdownMenuItem className="w-full flex justify-evenly text-rose-500 hover:!bg-rose-800 hover:text-foreground">
            <LogOut className="mr-2 h-4 w-4" />
            <span>Log out</span>
            <DropdownMenuShortcut></DropdownMenuShortcut>
          </DropdownMenuItem>
        </SignOutButton>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
