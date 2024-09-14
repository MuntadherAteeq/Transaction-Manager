import Image from "next/image"
import avatar from "../Assets/Images/Avatar.png"

export function Tab() {
  return (
    <>
      <div className="Tab">
        <Image src={avatar} alt="avatar" />
        <p>Lorem, ipsum dolor.</p>
        <button className="inline-button">X</button>
      </div>
    </>
  )
}
