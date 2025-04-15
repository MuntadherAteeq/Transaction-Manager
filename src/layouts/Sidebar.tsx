"use client";

import * as React from "react";

import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Activities } from "./Activitybar";
import { open } from "./Activitybar";
import { useAtom } from "jotai";
import { usePathname } from "next/navigation";

export function Sidebar() {
  const [isOpen, setOpen] = useAtom(open);
  const currentActivity = usePathname().split("/")[1];

  return (
    <>
      <div className="max-sm:hidden">
        <Button
          variant={"ghost"}
          className="hover:bg-transparent hover:text-accent-foreground/90"
          onClick={() => setOpen(!isOpen)}
        >
          <i className="icon-[solar--hamburger-menu-linear] text-[18px] "></i>
        </Button>
      </div>
      <Drawer direction="left">
        <DrawerTrigger asChild>
          <Button
            variant={"ghost"}
            className="hover:bg-transparent hover:text-accent-foreground/90 min-sm:hidden"
          >
            <i className="icon-[solar--hamburger-menu-linear] text-[18px] "></i>
          </Button>
        </DrawerTrigger>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle className="text-2xl">{currentActivity}</DrawerTitle>
          </DrawerHeader>
          <Activities />
          <div className="mx-auto w-full max-w-sm"></div>
        </DrawerContent>
      </Drawer>
    </>
  );
}
