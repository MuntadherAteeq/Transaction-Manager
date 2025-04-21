"use client";

import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar";
import { useParams, usePathname } from "next/navigation";
import { NavPath } from "@/components/Nav-Path";
import Link from "next/link";
import { ThemeSwitcher } from "@/components/Theme-Provider";
import { CommandShortcut } from "@/components/ui/command";
import AppLogo from "@/Assets/Icons/Logo";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useRouter } from "next/navigation";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// const open = atom(true);
interface AppProps {
  children: React.ReactNode;
  user: User | null;
}

export default function App(props: AppProps) {
  return (
    <SidebarProvider>
      <AppSidebar user={props.user} />
      <SidebarInset>
        <header className="flex sticky z-10 top-0 bg-sidebar h-12 shrink-0 items-center gap-2 border-b px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 h-4" />
          <NavPath />
          {/* <div className="ml-auto ">
            <AddNewRecordBTN />
          </div> */}
        </header>
        {props.children}
      </SidebarInset>
    </SidebarProvider>
  );
}

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";

// This is sample data.

interface AppSidebarProps extends React.ComponentProps<typeof Sidebar> {
  user: User | null;
}

export function AppSidebar({ ...props }: AppSidebarProps) {
  return (
    <Sidebar collapsible="icon" type="Drawer" {...props}>
      <SidebarHeader>
        <TeamSwitcher />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={Activities} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={props.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}

export function TeamSwitcher() {
  const { isMobile } = useSidebar();

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <SidebarMenuButton
          size="lg"
          className="!opacity-100 data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
          disabled
        >
          <div className="flex aspect-square size-8 items-center justify-center rounded-lg  text-sidebar-primary-foreground">
            <AppLogo className="size-7" />
          </div>
          <div className="grid flex-1 text-left text-sm leading-tight">
            <span className="truncate font-semibold text-lg">
              Transaction Manager
            </span>
            <span className="truncate text-xs"></span>
          </div>
        </SidebarMenuButton>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}

import {
  Bell,
  ChevronsUpDown,
  LogOut,
  Moon,
  Settings,
  User2,
} from "lucide-react";
import { signOut } from "@/app/Auth/auth.actions";
import { AddNewRecordBTN } from "@/components/Record/Record-List";
import { User } from "@prisma/client";
import { Activities } from "@/lib/Activities";
import { cn } from "@/lib/utils";

export function NavUser({ user }: { user: User | null }) {
  const { isMobile } = useSidebar();

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <Avatar className="h-8 w-8">
                <AvatarImage src={user?.image ?? undefined} alt={user?.name} />
                <AvatarFallback>{user?.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-semibold">{user?.name}</span>
                <span className="truncate text-xs">{user?.email}</span>
              </div>
              <ChevronsUpDown className="ml-auto size-4" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
            side={isMobile ? "bottom" : "right"}
            align="end"
            sideOffset={4}
          >
            <DropdownMenuLabel className="p-0 font-normal">
              <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                <Avatar className="h-8 w-8 ">
                  <AvatarImage
                    src={user?.image ?? undefined}
                    alt={user?.name}
                    covered
                  />
                  <AvatarFallback>{user?.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">{user?.name}</span>
                  <span className="truncate text-xs">{user?.email}</span>
                </div>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem>
                <Moon />
                Dark Mode
                <CommandShortcut>
                  <ThemeSwitcher />
                </CommandShortcut>
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem>
                <Settings />
                Settings
              </DropdownMenuItem>
              <DropdownMenuItem>
                <User2 />
                Account
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Bell />
                Notifications
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />

            <DropdownMenuItem
              onClick={async () => {
                await signOut();
              }}
            >
              <LogOut />
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}

export function NavMain({
  items,
}: {
  items: {
    title: string;
    url: string;
    icon?: string;
    isActive?: boolean;
    items?: {
      title: string;
      url: string;
    }[];
  }[];
}) {
  // const [isOpen, setOpen] = useAtom(open);
  const isActive = (activity: string) => {
    const currentActivity = useParams().Activity;
    return currentActivity === activity;
  };
  return (
    <SidebarGroup>
      <SidebarMenuButton disabled></SidebarMenuButton>
      <SidebarMenu>
        {items.map((item) => (
          <SidebarMenuItem key={item.title}>
            <Link href={item.url} className="flex justify-center items-center">
              <SidebarMenuButton
                isActive={isActive(item.title)}
                tooltip={item.title}
                size={"lg"}
                className="flex items-center "
              >
                {/* item.icon is lucide-react icons  */}

                <i
                  className={cn(
                    "size-7 shrink-0",
                    item.icon,
                    !isActive(item.title) && "text-muted-foreground"
                  )}
                />

                <span
                  className={cn(
                    !isActive(item.title) && "text-muted-foreground"
                  )}
                >
                  {item.title}
                </span>
              </SidebarMenuButton>
            </Link>
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  );
}
