import Image from "next/image"

export default function Home(props: React.HTMLAttributes<HTMLButtonElement>) {
  return (
    <main>
      {props.children}
    </main>
  )
}
