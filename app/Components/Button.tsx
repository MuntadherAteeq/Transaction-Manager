
interface ButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
  inline?: boolean
  bordered?: boolean
  bobble?: boolean
}
export default function Button(props: ButtonProps) {
  if (props.inline) {
    return <button className="inline-button" {...props}></button>
  } else {
    return <button {...props}>{props.children}</button>
  }
}
