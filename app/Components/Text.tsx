interface TextProps extends React.HTMLAttributes<HTMLParagraphElement> {
  one_line?: boolean
}

export default function Text(props: TextProps) {
  if (props.one_line) {
    return <p {...props} className="ellipsis"></p>
  } else {
    return <p {...props}></p>
  }
}
