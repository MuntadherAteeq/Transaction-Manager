import Image from "next/image"
import avatar from "../Assets/Images/Avatar.png"
export default function Avatar(
  props: React.ComponentProps<"img"> & { width?: number; height?: number }
) {
  return (
    <>
      <Image src={avatar} alt="avatar" {...props} />
    </>
  )
}
