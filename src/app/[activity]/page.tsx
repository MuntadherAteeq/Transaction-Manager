import { ReactNode } from "react";
import Editor from "../Layouts/Editor";
import R_Sidebar from "../Layouts/R-Sidebar";

export default function Editor_Page({ children }: { children: ReactNode }) {
  return (
    <>
      {children}
      <Editor />
      <R_Sidebar />
    </>
  );
}
