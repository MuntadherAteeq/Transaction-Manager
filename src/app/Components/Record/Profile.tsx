"use client";
import { Record_Property } from "./Record-Property";
import Phone_Icon from "../../Assets/Icons/Phone";
import Email_Icon from "../../Assets/Icons/Email";
import { useEffect, useState } from "react";
import { Trash_Icon } from "../../Assets/Icons/Trash";
import Done_Icon from "../../Assets/Icons/Done";
import { Settings_Icon } from "../../Assets/Icons/Settings";
import Export_Icon from "../../Assets/Icons/Export";
import Avatar from "../Avatar";
import { HomeIcon } from "@radix-ui/react-icons";
import { Button } from "@/components/ui/button";
import { AlignJustify, Check, X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useForm } from "react-hook-form";
import {
  deleteRecord,
  editRecord,
  markRecordAsFinished,
} from "./Record.actions";
import { mutate } from "swr";
import React from "react";
import { usePathname, useRouter } from "next/navigation";
import { Record } from "@prisma/client";
import { Alert } from "../Alert";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Textarea } from "@/components/ui/textarea";

const recordSchema = z.object({
  name: z.string().min(1, "Name is required"),
  phone: z.string().optional(),
  email: z.string().email("Invalid email address").optional(),
  address: z.string().optional(),
  category: z.string().optional(),
});

const types = {
  phone: { type: "tel", icon: <Phone_Icon /> },
  email: { type: "email", icon: <Email_Icon /> },
  address: { type: "text", icon: <HomeIcon /> },
  category: { type: "text", icon: <AlignJustify /> },
};

export default function Profile({ recordData }: { recordData: Record }) {
  const [record, setRecord] = useState(recordData);
  const [editable, setEditable] = useState(false);
  const path = usePathname();
  const route = useRouter();

  const { toast } = useToast();
  const { register, handleSubmit } = useForm({
    resolver: zodResolver(recordSchema),
  });

  const recordProperties = Object.entries(record)
    .filter(([key]) => key in types)
    .map(([key, value]) => ({
      key,
      value,
      ...types[key as keyof typeof types],
    }));

  useEffect(() => {
    return () => {
      setEditable(false);
    };
  }, []);

  const handleEdit: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();
    setEditable(!editable);
  };
  //  eslint-disable-next-line
  const onSubmit = async (data: any) => {
    const newRecord = { ...record, ...data };
    const res = await editRecord(newRecord);
    if (res.error) {
      toast({
        variant: "destructive",
        title: "Failed to edit record",
        description: `${res.error}`,
      });
    } else {
      await mutate(`/API/records?activity=${record.category}`);
      setRecord(newRecord);
      setEditable(false);
    }
  };

  return (
    <form className="h-full" onSubmit={handleSubmit(onSubmit)}>
      <div className="Profile">
        <div className="top overflow-y-auto overflow-x-hidden app-scrollbar ">
          <div className="header">
            <Avatar />
            {editable ? (
              <>
                <Textarea
                  className="border-none text-2xl p-0 m-0"
                  autoComplete="off"
                  readOnly={!editable}
                  defaultValue={record.name ?? ""}
                  {...register("name")}
                />
              </>
            ) : (
              <p className="flex-1 text-2xl">{record.name}</p>
            )}
          </div>

          {recordProperties.map((property) => (
            <Record_Property
              key={property.key}
              title={property.key}
              type={property.type}
              icon={property.icon}
              value={property.value}
              readOnly={!editable}
              register={register(property.key)}
            />
          ))}
        </div>
        <div id="options">
          {editable ? (
            <>
              <span></span>
              <span></span>
              <Button>
                <Option icon={<Check />}>Done</Option>
              </Button>
              <Button onClick={handleEdit}>
                <Option icon={<X />}>Cancel</Option>
              </Button>
            </>
          ) : (
            <>
              <Button
                onClick={async (e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  const res = await markRecordAsFinished(record);
                  if (res.status === 200) {
                    route.push("/Archive");
                    await mutate(`/API/records?activity=${record.category}`);
                  } else
                    toast({
                      variant: "destructive",
                      title: "Failed to mark as finished",
                      description: `${res.error}`,
                    });
                }}
              >
                <Option icon={<Done_Icon />}>Finish</Option>
              </Button>
              <Button onClick={handleEdit}>
                <Option icon={<Settings_Icon />}>Edit</Option>
              </Button>
              <Button
                onClick={() => {
                  toast({
                    variant: "destructive",
                    title: "Coming Soon",
                    description:
                      "This feature is under development and will be available soon.",
                  });
                }}
              >
                <Option icon={<Export_Icon />}>Export</Option>
              </Button>
              <Alert
                title="Are You Absolutely Sure?"
                description="This action will remove all tables of this records and will remove all transactions as well , I
                recommend you to make a back up before deleting this record"
                callback={async function () {
                  const activity = path?.split("/")[1];
                  await deleteRecord(record.id);
                  await mutate(`/API/records?activity=${activity}`);
                  route.push(`/${activity}`);
                }}
                action={
                  <Button className="bg-red-800 hover:!bg-red-700">
                    Delete
                  </Button>
                }
              >
                <Button>
                  <Option icon={<Trash_Icon />}>Delete</Option>
                </Button>
              </Alert>
            </>
          )}
        </div>
      </div>
    </form>
  );
}

export function Option({
  children,
  icon,
}: {
  color?: string;
  children?: React.ReactNode;
  icon?: React.ReactNode;
}) {
  return (
    <>
      <span className="icon">{icon}</span>
      <span>{children}</span>
    </>
  );
}
