import SignInTab from "@/components/SignInTab"
import SignUpTab from "@/components/SignUpTab"
import { TabSwitcher } from "@/components/TabSwitcher"
import { getUser } from "../Library/lucia"
import { redirect } from "next/navigation"

export default async function Auth() {
  ;(await getUser()) ? redirect("/") : null
  return (
    <div className="relative flex w-full h-screen bg-background justify-center items-center wallpaper">
      <div className="max-w-3xl z-10">
        <TabSwitcher TabOne={<SignInTab />} TabTow={<SignUpTab />} />
      </div>
    </div>
  )
}
