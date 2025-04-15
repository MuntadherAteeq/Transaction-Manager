"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import avatar from "@/Assets/images/Avatar.png";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Calendar,
  Home,
  Mail,
  MapPin,
  Phone,
  Search,
  User,
} from "lucide-react";

export const RecordItem = (props: {
  activity?: "Archive" | "History";
  className?: string;
  record?: Record;
  [key: string]: any;
}) => {
  return (
    <div
      {...props}
      className="flex rounded-xl flex-row min-h-[80px] select-none relative animate-show-down  hover:outline-1 hover:bg-primary/5"
    >
      <div className="flex justify-center items-center m-2.5">
        <RecordDrawer className="w-full h-full ">
          <Avatar draggable="false" className=" w-[50px] h-[50px] ">
            <AvatarImage src={avatar.src} alt="Avatar" />
            <AvatarFallback>MU</AvatarFallback>
          </Avatar>
        </RecordDrawer>
      </div>
      <div className="overflow-hidden relative flex-1 flex justify-evenly py-0 px-2.5 flex-col text-right before:content-[''] before:absolute before:bottom-0 before:block before:w-[90%] before:h-px before:bg-text before:opacity-10">
        <div className="top">
          <div className="text-left whitespace-nowrap overflow-hidden text-ellipsis">
            {props.record?.name || "Untitled Record"}
          </div>
        </div>
        <div className="flex flex-row justify-between">
          <div className="opacity-70">{`${
            props.record?.date || new Date().toLocaleDateString()
          }`}</div>
        </div>
      </div>
    </div>
  );
};

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

import React from "react";
import { Record } from "@prisma/client";
export function CreateRecordDialog(props: any) {
  const [open, setOpen] = React.useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{props.children}</DialogTrigger>
      <DialogContent className="flex max-h-[80vh] flex-col sm:max-w-[425px]">
        <DialogHeader className="flex-shrink-0 px-2">
          <DialogTitle>Create New Record</DialogTitle>
          <DialogDescription>
            This dialog has a fixed header and footer with scrollable content.
          </DialogDescription>
        </DialogHeader>
        <div className="flex-1 overflow-y-auto px-2 ">
          <div className="space-y-5">
            <Label htmlFor="title">Title</Label>
            <Input id="title" placeholder="Enter title" />
            <Label htmlFor="date">Date</Label>
            <Input id="date" type="date" />
            <Label htmlFor="phone">Phone</Label>
            <Input id="phone" type="tel" placeholder="Enter phone number" />
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" placeholder="Enter email" />
            <Label htmlFor="address">Address</Label>
            <Input id="address" type="text" placeholder="Enter address" />
            <Label htmlFor="notes">Notes</Label>
            <Textarea id="notes" placeholder="Enter notes" />
          </div>
        </div>
        <DialogFooter className="flex-shrink-0 border-t pt-4">
          <Button variant="outline" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button onClick={() => setOpen(false)}>Continue</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export const RecordInfo = (props: any) => {
  return (
    <>
      <DrawerHeader className="px-6 pt-6">
        <div className="flex max-sm:flex-col items-center gap-2 text-left text-sm">
          <Avatar className="h-14 w-14 rounded-full">
            <AvatarImage src={avatar.src} alt={"avatar"} />
            <AvatarFallback className="rounded-lg">CN</AvatarFallback>
          </Avatar>
          <div className="grid flex-1 text-left text-sm leading-tight">
            <DrawerTitle className="truncate font-semibold text-2xl ps-4">
              {props.record?.name || "Untitled Record "}
            </DrawerTitle>
            {/* <span className="truncate text-xs ps-4 text-foreground/75">
                {props.record?.email || "example@example.com"}
              </span> */}
          </div>
        </div>
      </DrawerHeader>
      <div className="space-y-4 overflow-auto  p-6">
        {/* Name */}
        <div className="flex items-center justify-between gap-4 border p-2 rounded-lg">
          <div className="flex items-center gap-2">
            <User className="w-4 h-4 text-muted-foreground" />
            <span className="text-sm text-muted-foreground ">Name</span>
          </div>
          <span className="text-lg px-1 truncate">Untitled Record</span>
        </div>
        {/* Phone */}
        <div className="flex items-center justify-between gap-4 border p-2 rounded-lg">
          <div className="flex items-center gap-2">
            <Phone className="w-4 h-4 text-muted-foreground" />
            <span className="text-sm text-muted-foreground ">Phone</span>
          </div>
          <a href="tel:+97312345678" className="text-lg px-1 truncate">
            <span>{"+973" + "-"}</span>
            <span>12345678</span>
          </a>
        </div>
        {/* Email */}
        <div className="flex items-center justify-between gap-4 border p-2 rounded-lg">
          <div className="flex items-center gap-2">
            <Mail className="w-4 h-4 text-muted-foreground" />
            <span className="text-sm text-muted-foreground ">Email</span>
          </div>
          <a className="truncate" href="mailto:name@email.com">
            mun.ateeq@email.com
          </a>
        </div>

        {/* Date */}
        <div className="flex items-center justify-between gap-4 border p-2 rounded-lg">
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-muted-foreground" />
            <span className="text-sm text-muted-foreground ">Date</span>
          </div>
          <span className="text-lg px-1 ">
            {new Date().toLocaleDateString()}
          </span>
        </div>
        {/* Address */}
        <div className="flex items-center justify-between gap-4 border p-2 rounded-lg">
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-muted-foreground" />
            <span className="text-sm text-muted-foreground ">Address</span>
          </div>
          <span className="text-lg px-1 ">123 Main St, City, Country</span>
        </div>
      </div>
    </>
  );
};

import {
  Drawer,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";

export const RecordDrawer = (props: any) => {
  return (
    <Drawer direction="right">
      <DrawerTrigger>{props.children}</DrawerTrigger>
      <DrawerContent>
        <RecordInfo />
        <DrawerFooter>
          <Button>Edit</Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};
