import { Bell, CreditCard, User, Lock, Palette } from "lucide-react";

export const settingsNavItems = [
  {
    title: "Profile",
    href: "/App/Settings/Profile",
    icon: User,
  },
  {
    title: "Account",
    href: "/App/Settings/Account",
    icon: CreditCard,
  },
  {
    title: "Notifications",
    href: "/App/Settings/Notifications",
    icon: Bell,
  },
  {
    title: "Security",
    href: "/App/Settings/Security",
    icon: Lock,
  },
  {
    title: "Appearance",
    href: "/App/Settings/Appearance",
    icon: Palette,
  },
];
