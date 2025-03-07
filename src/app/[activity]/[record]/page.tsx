import { PrismaClient } from "@prisma/client";
import Editor from "../../Layouts/Editor";
import CreateTableButton from "../../Components/CreateTableButton";
import R_Sidebar from "../../Layouts/R-Sidebar";
import Profile from "../../Components/Record/Profile";
import TableList from "../../Layouts/TableList";
import { redirect } from "next/navigation";
import { getUser } from "@/app/Library/lucia";
import React from "react";

let prisma: PrismaClient;

if (process.env.NODE_ENV === "production") {
  prisma = new PrismaClient();
} else {
  if (!global.prisma) {
    global.prisma = new PrismaClient();
  }
  prisma = global.prisma;
}

export default async function Record_Page({ params }: { params: any }) {
  const session = await getUser();
  if (session === null) redirect("/Auth");
  const activity = params.activity;

  const record = await prisma.record.findFirst({
    where: { id: Number.parseInt(params.record) },
  });
  return (
    <>
      <Editor>
        {activity !== "History" ? (
          <CreateTableButton recordId={record?.id} activity={activity} />
        ) : null}
        <TableList />
      </Editor>
      <R_Sidebar>{record && <Profile recordData={record} />}</R_Sidebar>
    </>
  );
}
