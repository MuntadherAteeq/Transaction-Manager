interface DataTableProps extends React.HTMLAttributes<HTMLDivElement> {}
export default function Editor(props: DataTableProps) {
  return (
    <div {...props} className="Editor">
      <div className="Tab-Container">
        <div className="Tabs">{/* TODO : Add Tab Functionality */}</div>
      </div>
      <div className="Table-List">{props.children}</div>
    </div>
  )
}
