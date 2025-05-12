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
import {
  SidebarGroup,
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
  account: Account | null;
}

export default function App(props: AppProps) {
  return (
    <SidebarProvider>
      <AppSidebar account={props.account} />
      <SidebarInset>
        <header className="flex sticky z-10 top-0 bg-sidebar h-12 shrink-0 items-center gap-2 border-b px-4 flex-nowrap">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 h-4" />
          <NavPath />
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
  account: Account | null;
}

export function AppSidebar({ ...props }: AppSidebarProps) {
  return (
    <Sidebar collapsible="icon" type="Drawer" {...props}>
      <SidebarHeader>
        <TeamSwitcher />
      </SidebarHeader>
      <SidebarContent>
        <NavMain role={props.account?.role} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser account={props.account} />
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
              Al Door Garage
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
import { Account } from "@prisma/client";
import { Activities } from "@/lib/Activities";
import { cn } from "@/lib/utils";

export function NavUser({ account }: { account: Account | null }) {
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
                <AvatarImage
                  src={account?.image ?? undefined}
                  alt={account?.name}
                />
                <AvatarFallback>{account?.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-semibold">{account?.name}</span>
                <span className="truncate text-xs">{account?.email}</span>
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
                    src={account?.image ?? undefined}
                    alt={account?.name}
                    covered
                  />
                  <AvatarFallback>{account?.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">
                    {account?.name}
                  </span>
                  <span className="truncate text-xs">{account?.email}</span>
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
            {/* <DropdownMenuSeparator />
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
            </DropdownMenuGroup> */}
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

export function NavMain(props: { role: string | undefined }) {
  const path = usePathname();
  const isActive = (Activity: string) => {
    const url = path.split("/").slice(0, 3).join("/");
    return url === Activity;
  };
  return (
    <SidebarGroup>
      {/* <SidebarMenuButton disabled></SidebarMenuButton> */}
      <SidebarMenu>
        {Activities(props.role).map(({ title, url, icon }) => (
          <SidebarMenuItem key={title}>
            <Link href={url} className="flex justify-center items-center">
              <SidebarMenuButton
                isActive={isActive(url)}
                tooltip={title}
                size={"lg"}
              >
                <i
                  className={cn(
                    "size-7 shrink-0",
                    icon,
                    !isActive(url) && "text-muted-foreground"
                  )}
                />

                <span className={cn(!isActive(url) && "text-muted-foreground")}>
                  {title}
                </span>
              </SidebarMenuButton>
            </Link>
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  );
}
