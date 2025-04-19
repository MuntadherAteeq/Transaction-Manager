"use client";

import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar";
import { redirect, usePathname } from "next/navigation";
import { NavPath } from "@/components/Nav-Path";
import Link from "next/link";
import { ThemeSwitcher } from "@/components/Theme-Provider";
import { CommandShortcut } from "@/components/ui/command";
import { atom, useAtom } from "jotai";
import { AddNewRecordBTN } from "./Record/Record-List";
import Logo_Icon from "@/Assets/Icons/Logo";
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

export default function Page(props: any) {
  const currentActivity = usePathname().split("/")[1];
  // const [isOpen, setOpen] = useAtom(open);

  // const handleSidebarChange = () => {
  //   setOpen((prev) => !prev);
  // };

  return (
    // <SidebarProvider open={isOpen}>
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex sticky z-10 top-0 bg-sidebar h-12 shrink-0 items-center gap-2 border-b px-4">
          {/* <SidebarTrigger className="-ml-1" onClick={handleSidebarChange} /> */}
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 h-4" />
          <NavPath />
          <div className="ml-auto ">
            <AddNewRecordBTN />
          </div>
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
const data = {
  user: {
    name: "Muntadher",
    email: "m@example.com",
    avatar: "",
  },
  navMain: [
    {
      title: "Archive",
      url: "/Archive",
      icon: "icon-[stash--folder-alt]",
      isActive: true,
    },
    {
      title: "History",
      url: "/History",
      icon: "icon-[bi--clock]",
    },
    {
      title: "Inventory",
      url: "/Inventory",
      icon: "icon-[solar--box-outline]",
    },
    {
      title: "Dashboard",
      url: "/Dashboard",
      icon: "icon-[solar--chart-square-linear]",
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
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
          className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
        >
          <div className="flex aspect-square size-8 items-center justify-center rounded-lg  text-sidebar-primary-foreground">
            <Logo_Icon className="size-7" />
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
  User,
} from "lucide-react";
import { signOut } from "@/app/Auth/auth.actions";

export function NavUser({
  user,
}: {
  user: {
    name: string;
    email: string;
    avatar: string;
  };
}) {
  const { isMobile } = useSidebar();
  const router = useRouter();

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <Avatar className="h-8 w-8 rounded-lg">
                <AvatarImage src={user.avatar} alt={user.name} />
                <AvatarFallback className="rounded-lg">CN</AvatarFallback>
              </Avatar>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-semibold">{user.name}</span>
                <span className="truncate text-xs">{user.email}</span>
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
                <Avatar className="h-8 w-8 rounded-lg">
                  <AvatarImage src={user.avatar} alt={user.name} />
                  <AvatarFallback className="rounded-lg">CN</AvatarFallback>
                </Avatar>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">{user.name}</span>
                  <span className="truncate text-xs">{user.email}</span>
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
                <User />
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
    const currentActivity = usePathname().split("/")[1];
    return currentActivity === activity;
  };
  return (
    <SidebarGroup>
      <SidebarGroupLabel>Activity</SidebarGroupLabel>
      <SidebarMenu>
        {items.map((item) => (
          <SidebarMenuItem key={item.title}>
            <Link href={item.url} className="flex justify-center items-center">
              <SidebarMenuButton
                // isActive={isActive(item.title) && isOpen}
                tooltip={item.title}
                size={"lg"}
                className="flex items-center "
              >
                <svg
                  className={`${item.icon} !size-7  ${
                    !isActive(item.title) && "text-muted-foreground"
                  }`}
                />
                <span
                  className={`${
                    !isActive(item.title) && "text-muted-foreground"
                  }`}
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
