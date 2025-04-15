"use client";
import { ThemeSwitcher } from "@/components/Theme-Provider";
import { Sidebar } from "./Sidebar";
import { usePathname } from "next/navigation";

export const Toolbar = (props: any) => {
  const currentActivity = usePathname().split("/")[1];
  return (
    <div className="flex justify-between w-full h-[40px] bg-muted">
      <div className="flex items-center">
        <Sidebar />
        <span>{currentActivity}</span>
      </div>
      <div className="flex items-center px-4">
        <i className="icon-[tabler--search]"></i>
        <ThemeSwitcher />
      </div>
    </div>
  );
};
