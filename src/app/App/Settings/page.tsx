"use client";

import { useParams, usePathname } from "next/navigation";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { User, CreditCard, Bell, Lock, Palette } from "lucide-react";
import { AccountSettings } from "@/app/App/Settings/Account-settings";
import { AppearanceSettings } from "@/app/App/Settings/Appearance-settings";
import { NotificationSettings } from "@/app/App/Settings/Notification-settings";
import { ProfileSettings } from "@/app/App/Settings/Profile-settings";
import { SecuritySettings } from "@/app/App/Settings/Security-settings";

const settingsNavItems = [
  {
    title: "Profile",
    href: "/Settings/Profile",
    icon: User,
  },
  {
    title: "Account",
    href: "/Settings/Account",
    icon: CreditCard,
  },
  {
    title: "Notifications",
    href: "/Settings/Notifications",
    icon: Bell,
  },
  {
    title: "Security",
    href: "/Settings/Security",
    icon: Lock,
  },
  {
    title: "Appearance",
    href: "/Settings/Appearance",
    icon: Palette,
  },
];

export default function SettingsPage(props: any) {
  const pathname = usePathname();

  return (
    <div className="container mx-auto p-8  h-full">
      <h1 className="text-3xl font-bold mb-8">Settings</h1>
      <div className="flex flex-col md:flex-row gap-8 ">
        <div className="md:w-64 flex-shrink-0 ">
          <nav className="space-y-1">
            {settingsNavItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "flex items-center px-3 py-2 text-sm rounded-md group",
                    isActive
                      ? "bg-primary text-primary-foreground"
                      : "hover:bg-muted"
                  )}
                >
                  <item.icon
                    className={cn(
                      "mr-3 h-5 w-5",
                      isActive
                        ? "text-primary-foreground"
                        : "text-muted-foreground group-hover:text-foreground"
                    )}
                  />
                  <span>{item.title}</span>
                </Link>
              );
            })}
          </nav>
        </div>
        <div className="flex-1">
          <SettingsTab />
        </div>
      </div>
    </div>
  );
}

export function SettingsTab() {
  const pathname = useParams();
  switch (pathname.Activity) {
    case "Account":
      return <AccountSettings />;
    case "Notifications":
      return <NotificationSettings />;
    case "Security":
      return <SecuritySettings />;
    case "Appearance":
      return <AppearanceSettings />;
    case "Profile":
      return <ProfileSettings />;
    default:
      return <ProfileSettings />;
  }
}
