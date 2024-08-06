import Record_List_item from "../Components/Record-List-Item"
import L_Sidebar from "../Layout/L-Sidebar"

export default async function Archive(props: any) {
  const res = await fetch("http://localhost:3000/api/archive-records", {
    cache: "no-cache",
  })
  const records = await res.json()
  return (
    <>
      <L_Sidebar>
        <ul>
          {records.map((record: any) => (
            <Record_List_item
              key={record.id}
              name={record.title}
              date={record.createdAt}
              total={record.total}
            />
          ))}
        </ul>
      </L_Sidebar>
      {props.children}
    </>
  )
}
