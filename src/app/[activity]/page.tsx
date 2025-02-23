import Editor from "../Layouts/Editor";
import R_Sidebar from "../Layouts/R-Sidebar";

export default async function Record_Page(props: any) {
  return (
    <>
      {props.children}
      <Editor />
      <R_Sidebar />
    </>
  );
}
