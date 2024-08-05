import Record_List_item from "../Components/Record-List-Item"
import L_Sidebar from "../Layout/L-Sidebar"

export default async function page(props: any) {
  return (
    <>
      <L_Sidebar>
        <Record_List_item />
      </L_Sidebar>
      {props.children}
    </>
  )
}
