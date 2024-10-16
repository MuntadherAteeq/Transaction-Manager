"use client";
import { Record_Property } from "./Record-Property";
import Phone_Icon from "../../Assets/Icons/Phone";
import Calender_Icon from "../../Assets/Icons/Calender";
import Email_Icon from "../../Assets/Icons/Email";
import Info_Icon from "../../Assets/Icons/info";
import { useEffect, useMemo, useState } from "react";
import { Trash_Icon } from "../../Assets/Icons/Trash";
import Done_Icon from "../../Assets/Icons/Done";
import { Settings_Icon } from "../../Assets/Icons/Settings";
import Export_Icon from "../../Assets/Icons/Export";
import Avatar from "../Avatar";
import { HomeIcon } from "@radix-ui/react-icons";
import { DeleteRecordAlert } from "./DeleteRecordAlert";
import { Button } from "@/components/ui/button";
import { AlignJustify, Check, DollarSign, X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useForm } from "react-hook-form";
import { editRecord, markRecordAsFinished } from "./Record.actions";
import { mutate } from "swr";
import React from "react";
import { useRouter } from "next/navigation";
import { Record } from "@prisma/client";
import { Input } from "@/components/ui/input";

export default function Profile({ recordData }: { recordData: Record }) {
  const [record, setRecord] = useState(recordData);
  const [editable, setEditable] = useState(false);
  const route = useRouter();
  const keys = useMemo(
    () => ["phone", "balance", "email", "desc", "address", "category"],
    []
  );
  

  useEffect(() => {
    setRecord(recordData);
    return () => {
      setEditable(false);
    };
  }, []);

  const iconMap: { [key: string]: JSX.Element } = {
    phone: <Phone_Icon />,
    date: <Calender_Icon />,
    email: <Email_Icon />,
    desc: <Info_Icon />,
    address: <HomeIcon />,
    category: <AlignJustify />,
    balance: <DollarSign />,
  };

  const GetIcon = (type: string): React.ReactNode => {
    return iconMap[type] || <></>;
  };

  const handleEdit: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();
    setEditable(!editable);
  };

  const recordEntries = useMemo(() => {
    return Object.entries(record).filter(([key]) => keys.includes(key));
  }, [keys, record]);

  const { toast } = useToast();
  const { register, handleSubmit } = useForm();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
    }
  };

  return (
    <form className="h-full" onSubmit={handleSubmit(onSubmit)}>
      <div className="Profile">
        <div className="top">
          <div className="header">
            <Avatar />
            {editable ? (
              <Input
                className="border-none text-2xl p-0 m-0"
                autoComplete="off"
                readOnly={!editable}
                defaultValue={record.name ?? ""}
                {...register("name")}
              />
            ) : (
              <p className="flex-1 text-2xl">{record.name}</p>
            )}
          </div>

          {recordEntries.map(([key, value]) => (
            <Record_Property
              icon={GetIcon(key)}
              key={key}
              title={key}
              type="text"
              readOnly={!editable}
              value={value}
              register={{ ...register(key) }}
            />
          ))}
        </div>
        <div id="options">
          {editable ? (
            <>
              <span></span>
              <span></span>
              <Button onClick={() => setEditable(!editable)}>
                <Option icon={<Check />}>Done</Option>
              </Button>
              <Button onClick={() => setEditable(!editable)}>
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
              <DeleteRecordAlert record={record}>
                <Button>
                  <Option icon={<Trash_Icon />}>Delete</Option>
                </Button>
              </DeleteRecordAlert>
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
